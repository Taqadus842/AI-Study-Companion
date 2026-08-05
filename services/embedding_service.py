import logging
from typing import List
from sentence_transformers import SentenceTransformer
from config import settings

logger = logging.getLogger(__name__)

class EmbeddingService:
    def __init__(self, model_name: str = None):
        self.model_name = model_name or settings.EMBEDDING_MODEL_NAME
        self._model = None

    @property
    def model(self) -> SentenceTransformer:
        if self._model is None:
            logger.info(f"Loading embedding model: {self.model_name}")
            self._model = SentenceTransformer(self.model_name)
            logger.info("Embedding model loaded successfully.")
        return self._model

    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate a 384-dimensional embedding vector for a single document chunk or query.
        Returns: List[float] of length 384.
        """
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.tolist()

    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generate 384-dimensional embedding vectors for a batch of document chunks.
        Returns: List[List[float]], each inner list of length 384.
        """
        if not texts:
            return []
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        return embeddings.tolist()

# Global singleton instance
embedding_service = EmbeddingService()
