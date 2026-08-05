import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status
from config import settings
from schemas import EmbedRequest, EmbedResponse, RetrieveRequest, RetrieveResponse, RetrievalResultItem
from services.embedding_service import embedding_service
from services.qdrant_service import qdrant_service

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing Embedding & Retrieval Service...")
    # Pre-load embedding model and verify Qdrant connection
    try:
        embedding_service.model
        qdrant_service.ensure_collection_exists()
        logger.info("Startup complete: Embedding model and Qdrant collection ready.")
    except Exception as e:
        logger.warning(f"Startup check warning: {e}")
    yield
    logger.info("Shutting down Embedding & Retrieval Service...")

app = FastAPI(
    title="AI Study Companion - Embedding & Retrieval Service",
    description="Microservice to generate embeddings, store vectors in Qdrant, and perform Top-K semantic retrieval.",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/")
def read_root():
    return {
        "service": "AI Study Companion - Semantic Retrieval API",
        "model": settings.EMBEDDING_MODEL_NAME,
        "collection": settings.QDRANT_COLLECTION_NAME,
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    qdrant_ready = False
    try:
        qdrant_service.ensure_collection_exists()
        qdrant_ready = True
    except Exception:
        qdrant_ready = False

    return {
        "status": "healthy",
        "embedding_model": settings.EMBEDDING_MODEL_NAME,
        "qdrant_connected": qdrant_ready,
        "collection_name": settings.QDRANT_COLLECTION_NAME
    }

@app.post("/embed", response_model=EmbedResponse, status_code=status.HTTP_201_CREATED)
def generate_and_store_embeddings(request: EmbedRequest):
    """
    POST /embed
    Receive chunks, generate embeddings via SentenceTransformers (all-MiniLM-L6-v2),
    and store vector embeddings with metadata in Qdrant collection ('study_notes').
    """
    if not request.chunks:
        raise HTTPException(status_code=400, detail="The 'chunks' list cannot be empty.")

    try:
        chunks_data = [chunk.model_dump() for chunk in request.chunks]
        texts = [chunk.text for chunk in request.chunks]

        # 1. Generate embeddings (Vector length: 384)
        embeddings = embedding_service.generate_embeddings(texts)

        # 2. Store vectors and metadata in Qdrant
        stored_ids = qdrant_service.store_chunks(chunks_data, embeddings)

        return EmbedResponse(
            status="success",
            stored_count=len(stored_ids),
            message=f"Successfully generated embeddings and stored {len(stored_ids)} chunks in Qdrant collection '{settings.QDRANT_COLLECTION_NAME}'.",
            stored_ids=stored_ids
        )
    except Exception as e:
        logger.error(f"Error in /embed endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process and store embeddings: {str(e)}")

@app.post("/retrieve", response_model=RetrieveResponse)
def retrieve_chunks(request: RetrieveRequest):
    """
    POST /retrieve
    Accept user query, convert query into query embedding,
    perform similarity search in Qdrant, and return Top-K retrieved chunks with scores.
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty.")

    try:
        # 1. Generate Query Embedding
        query_vector = embedding_service.generate_embedding(request.query)

        # 2. Search Qdrant
        raw_results = qdrant_service.search(query_vector=query_vector, top_k=request.top_k)

        # 3. Format Top-K Results
        results = [
            RetrievalResultItem(
                score=res["score"],
                chunk=res["chunk"],
                chunk_id=res.get("chunk_id"),
                metadata=res.get("metadata", {})
            )
            for res in raw_results
        ]

        return RetrieveResponse(results=results)
    except Exception as e:
        logger.error(f"Error in /retrieve endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to execute semantic retrieval: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
