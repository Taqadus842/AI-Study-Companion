from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChunkInput(BaseModel):
    chunk_id: Optional[Any] = Field(None, description="Unique ID for the chunk (int or str)")
    text: str = Field(..., description="Text content of the document chunk")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional custom metadata")

class EmbedRequest(BaseModel):
    chunks: List[ChunkInput] = Field(..., description="List of document chunks to generate embeddings for and store")

class EmbedResponse(BaseModel):
    status: str = "success"
    stored_count: int
    message: str
    stored_ids: List[Any]

class RetrieveRequest(BaseModel):
    query: str = Field(..., description="User search query")
    top_k: int = Field(5, ge=1, le=100, description="Top K results to retrieve")

class RetrievalResultItem(BaseModel):
    score: float = Field(..., description="Similarity score (Cosine similarity)")
    chunk: str = Field(..., description="Text of the retrieved chunk")
    chunk_id: Optional[Any] = Field(None, description="Unique ID of the chunk")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Metadata attached to the chunk")

class RetrieveResponse(BaseModel):
    results: List[RetrievalResultItem]
