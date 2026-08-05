import sys
import os

# Ensure venv site-packages and root directory are in sys.path
venv_site_packages = os.path.join(os.path.dirname(os.path.dirname(__file__)), "venv", "Lib", "site-packages")
if os.path.exists(venv_site_packages) and venv_site_packages not in sys.path:
    sys.path.insert(0, venv_site_packages)

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest
from fastapi.testclient import TestClient
from main import app
from services.embedding_service import embedding_service
from services.qdrant_service import qdrant_service

client = TestClient(app)

def test_embedding_model_setup():
    """Verify Task 1: Embedding model loads and returns 384-length float vector."""
    text = "Artificial Intelligence is transforming modern software engineering."
    vector = embedding_service.generate_embedding(text)
    
    assert isinstance(vector, list), "Embedding should be a list of floats"
    assert len(vector) == 384, f"Expected vector length 384, got {len(vector)}"
    assert all(isinstance(val, float) for val in vector), "Vector elements must be floats"

def test_batch_embeddings():
    """Verify batch embedding generation."""
    texts = [
        "Machine Learning is a subset of AI.",
        "Supervised learning algorithms build mathematical models."
    ]
    vectors = embedding_service.generate_embeddings(texts)
    assert len(vectors) == 2
    assert len(vectors[0]) == 384
    assert len(vectors[1]) == 384

def test_qdrant_setup_and_collection():
    """Verify Task 2 & Task 3: Qdrant client connection and collection creation."""
    success = qdrant_service.ensure_collection_exists()
    assert success is True

    qclient = qdrant_service.get_client()
    collections = qclient.get_collections().collections
    collection_names = [c.name for c in collections]
    assert qdrant_service.collection_name in collection_names

def test_store_and_retrieve_end_to_end():
    """Verify Task 4 & Task 5: Store chunks and retrieve top-K results."""
    chunks = [
        {"chunk_id": 1, "text": "Machine Learning algorithms build models based on sample data."},
        {"chunk_id": 2, "text": "Supervised learning relies on labeled datasets to train algorithms."},
        {"chunk_id": 3, "text": "Photosynthesis is the process used by plants to convert light into energy."}
    ]
    texts = [c["text"] for c in chunks]
    embeddings = embedding_service.generate_embeddings(texts)
    
    stored_ids = qdrant_service.store_chunks(chunks, embeddings)
    assert stored_ids == [1, 2, 3]

    # Search with query related to Machine Learning
    query_vector = embedding_service.generate_embedding("Machine Learning")
    results = qdrant_service.search(query_vector=query_vector, top_k=2)
    
    assert len(results) == 2
    assert "Machine Learning" in results[0]["chunk"] or "Supervised learning" in results[0]["chunk"]
    assert results[0]["score"] > 0.0

def test_api_embed_endpoint():
    """Test POST /embed endpoint."""
    payload = {
        "chunks": [
            {
                "chunk_id": 10,
                "text": "Deep Learning is a subset of Machine Learning based on artificial neural networks.",
                "metadata": {"source": "lecture_1.pdf"}
            }
        ]
    }
    response = client.post("/embed", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "success"
    assert data["stored_count"] == 1
    assert data["stored_ids"] == [10]

def test_api_retrieve_endpoint():
    """Test POST /retrieve endpoint matching exact handover spec."""
    payload = {
        "query": "Neural Networks",
        "top_k": 2
    }
    response = client.post("/retrieve", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert len(data["results"]) > 0
    item = data["results"][0]
    assert "score" in item
    assert "chunk" in item
    assert isinstance(item["score"], float)
    assert isinstance(item["chunk"], str)

def test_health_endpoint():
    """Test GET /health endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["embedding_model"] == "sentence-transformers/all-MiniLM-L6-v2"
    assert data["collection_name"] == "study_notes"

if __name__ == "__main__":
    print("Running test suite...")
    test_embedding_model_setup()
    print("1. Embedding model setup: PASSED (Vector length=384)")
    test_batch_embeddings()
    print("2. Batch embeddings: PASSED")
    test_qdrant_setup_and_collection()
    print("3. Qdrant setup & collection 'study_notes': PASSED")
    test_store_and_retrieve_end_to_end()
    print("4. Vector storage & Top-K search: PASSED")
    test_api_embed_endpoint()
    print("5. POST /embed API: PASSED")
    test_api_retrieve_endpoint()
    print("6. POST /retrieve API: PASSED")
    test_health_endpoint()
    print("7. GET /health API: PASSED")
    print("\nALL 7 TESTS COMPLETED SUCCESSFULLY!")
