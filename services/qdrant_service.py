import uuid
import logging
from typing import List, Dict, Any, Union
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
from config import settings

logger = logging.getLogger(__name__)

class QdrantService:
    def __init__(self, url: str = None, collection_name: str = None, vector_size: int = None):
        self.url = url or settings.QDRANT_URL
        self.collection_name = collection_name or settings.QDRANT_COLLECTION_NAME
        self.vector_size = vector_size or settings.QDRANT_VECTOR_SIZE
        self.api_key = settings.QDRANT_API_KEY or None
        self._client = None

    def get_client(self) -> QdrantClient:
        if self._client is None:
            try:
                if self.api_key:
                    client = QdrantClient(url=self.url, api_key=self.api_key, timeout=5.0)
                else:
                    client = QdrantClient(url=self.url, timeout=5.0)
                # Verify connection by getting collections
                client.get_collections()
                self._client = client
                logger.info(f"Successfully connected to Qdrant Docker instance at {self.url}")
            except Exception as e:
                logger.warning(
                    f"Could not connect to Qdrant at {self.url} ({e}). "
                    f"Falling back to local in-memory Qdrant client for service continuity."
                )
                self._client = QdrantClient(":memory:")
        return self._client

    def ensure_collection_exists(self) -> bool:
        """Create the Qdrant collection if it does not exist with Cosine metric and size 384."""
        client = self.get_client()
        try:
            collections_res = client.get_collections()
            collection_names = [c.name for c in collections_res.collections]
            
            if self.collection_name not in collection_names:
                client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=self.vector_size,
                        distance=Distance.COSINE
                    )
                )
                logger.info(f"Created Qdrant collection '{self.collection_name}' (vector size={self.vector_size}, distance=COSINE)")
            return True
        except Exception as e:
            logger.error(f"Error ensuring Qdrant collection '{self.collection_name}' exists: {e}")
            raise e

    def _format_point_id(self, raw_id: Any, index: int) -> Union[int, str]:
        """Convert any user chunk_id into a valid Qdrant point ID (int or valid UUID string)."""
        if isinstance(raw_id, int):
            return raw_id
        if isinstance(raw_id, str):
            try:
                # Check if it's already a valid UUID
                val = uuid.UUID(raw_id)
                return str(val)
            except ValueError:
                # If numeric string, convert to int
                if raw_id.isdigit():
                    return int(raw_id)
                # Generate deterministic UUID5 from string
                return str(uuid.uuid5(uuid.NAMESPACE_DNS, raw_id))
        return index + 1

    def store_chunks(self, chunks: List[Dict[str, Any]], embeddings: List[List[float]]) -> List[Any]:
        """
        Store chunk embeddings and attached metadata into Qdrant collection.
        Metadata schema includes:
        {
          "chunk_id": 1,
          "text": "Artificial Intelligence is..."
        }
        """
        self.ensure_collection_exists()
        client = self.get_client()

        points = []
        stored_ids = []

        for idx, (chunk, vector) in enumerate(zip(chunks, embeddings)):
            raw_id = chunk.get("chunk_id")
            original_chunk_id = raw_id if raw_id is not None else idx + 1
            point_id = self._format_point_id(raw_id, idx)

            payload = {
                "chunk_id": original_chunk_id,
                "text": chunk.get("text", ""),
            }
            # Attach any extra custom metadata passed in request
            if chunk.get("metadata"):
                payload.update(chunk["metadata"])

            points.append(
                PointStruct(
                    id=point_id,
                    vector=vector,
                    payload=payload
                )
            )
            stored_ids.append(original_chunk_id)

        client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        logger.info(f"Upserted {len(points)} vectors into Qdrant collection '{self.collection_name}'")
        return stored_ids

    def search(self, query_vector: List[float], top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Perform Cosine similarity search for Top-K nearest chunks.
        """
        self.ensure_collection_exists()
        client = self.get_client()

        if hasattr(client, "query_points"):
            res = client.query_points(
                collection_name=self.collection_name,
                query=query_vector,
                limit=top_k
            )
            search_results = res.points
        else:
            search_results = client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=top_k
            )

        output = []
        for hit in search_results:
            hit_payload = hit.payload or {}
            chunk_id = hit_payload.get("chunk_id", hit.id)
            text_content = hit_payload.get("text", "")
            
            extra_metadata = {k: v for k, v in hit_payload.items() if k not in ["text", "chunk_id"]}

            output.append({
                "score": round(float(hit.score), 4),
                "chunk": text_content,
                "chunk_id": chunk_id,
                "metadata": extra_metadata
            })

        return output


# Global singleton instance
qdrant_service = QdrantService()
