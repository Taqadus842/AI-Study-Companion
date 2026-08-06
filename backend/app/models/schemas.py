from typing import List

from pydantic import BaseModel, EmailStr, Field


# -----------------------------
# Document
# -----------------------------

class DocumentResponse(BaseModel):
    id: str
    filename: str
    chunks: int
    status: str


class DocumentMetadata(BaseModel):
    id: str
    filename: str
    chunks: int
    status: str
    uploadedAt: str
    sizeLabel: str


# -----------------------------
# Study Plan
# -----------------------------

class StudyPlanRequest(BaseModel):
    topic: str = Field(
        ...,
        min_length=2,
        max_length=200,
    )


class RetrievedChunk(BaseModel):
    chunk_id: int
    document: str
    content: str
    score: float


class StudyDay(BaseModel):
    day: int
    title: str
    tasks: List[str]


class StudyPlanResponse(BaseModel):
    topic: str
    days: List[StudyDay]
    retrieved_chunks: List[RetrievedChunk]


# -----------------------------
# Dashboard
# -----------------------------

class ActivityItem(BaseModel):
    title: str
    time: str


class DashboardResponse(BaseModel):
    documents: int
    chunks: int
    embeddings: int
    studyPlans: int
    activity: List[ActivityItem]


# -----------------------------
# Profile
# -----------------------------

class Profile(BaseModel):
    name: str
    email: EmailStr