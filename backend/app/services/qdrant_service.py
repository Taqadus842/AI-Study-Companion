from typing import List
import uuid

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
)

from app.config import (
    QDRANT_URL,
    QDRANT_API_KEY,
    QDRANT_COLLECTION,
)


class QdrantService:

    def __init__(self):
        self.client = QdrantClient(
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY or None,
        )


    def create_collection(self, vector_size: int):

        collections = self.client.get_collections().collections

        exists = any(
            c.name == QDRANT_COLLECTION
            for c in collections
        )

        if not exists:
            self.client.create_collection(
                collection_name=QDRANT_COLLECTION,
                vectors_config=VectorParams(
                    size=vector_size,
                    distance=Distance.COSINE,
                ),
            )


    def store_chunks(
        self,
        chunks: List[str],
        vectors: List[List[float]],
        document_name: str,
    ):

        points = []

        for i, (chunk, vector) in enumerate(
            zip(chunks, vectors)
        ):

            points.append(
                PointStruct(
                    id=str(uuid.uuid4()),
                    vector=vector,
                    payload={
                        "text": chunk,
                        "document": document_name,
                        "chunk_index": i,
                    },
                )
            )
        if points:
            self.client.upsert(
                collection_name=QDRANT_COLLECTION,
                points=points,
                wait=True,
            )


    def search(
        self,
        query_vector: List[float],
        limit: int = 5,
    ):
        try:
            result = self.client.query_points(
                collection_name=QDRANT_COLLECTION,
                query=query_vector,
                limit=limit,
            )
            return result.points
        except Exception:
            return []

    def get_chunk_count(self) -> int:
        try:
            collection = self.client.get_collection(
                QDRANT_COLLECTION
            )
            return collection.points_count or 0
        except Exception:
            return 0