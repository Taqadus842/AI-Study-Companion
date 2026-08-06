from fastapi import APIRouter, HTTPException

from app.config import TOP_K
from app.models.schemas import (
    RetrievedChunk,
    StudyDay,
    StudyPlanRequest,
    StudyPlanResponse,
)
from app.services.embeddings import EmbeddingService
from app.services.llm import LLMService
from app.services.qdrant_service import QdrantService

router = APIRouter()


@router.post(
    "/study-plan",
    response_model=StudyPlanResponse,
)
async def generate_study_plan(request: StudyPlanRequest):
    try:
        # -----------------------------
        # Generate query embedding
        # -----------------------------
        embedding_service = EmbeddingService()

        query_vector = embedding_service.embed_text(request.topic)

        if not query_vector:
            raise HTTPException(
                status_code=500,
                detail="Failed to generate query embedding.",
            )

        # -----------------------------
        # Search Qdrant
        # -----------------------------
        qdrant = QdrantService()

        results = qdrant.search(
            query_vector=query_vector,
            limit=TOP_K,
        )

        if not results:
            raise HTTPException(
                status_code=404,
                detail="No relevant study material found.",
            )

        # -----------------------------
        # Prepare context for the LLM
        # -----------------------------
        retrieved_context = [
            {
                "document": result.payload.get("document", "Unknown"),
                "content": result.payload.get("text", ""),
            }
            for result in results
        ]

        # -----------------------------
        # Generate study plan
        # -----------------------------
        llm = LLMService()

        plan = llm.generate_study_plan(
            topic=request.topic,
            retrieved_chunks=retrieved_context,
        )

        if not isinstance(plan, dict):
            raise HTTPException(
                status_code=500,
                detail="Invalid response from LLM.",
            )

        # -----------------------------
        # Build study days
        # -----------------------------
        days = []

        for index, item in enumerate(plan.get("days", []), start=1):
            days.append(
                StudyDay(
                    day=item.get("day", index),
                    title=item.get("title", f"Day {index}"),
                    tasks=item.get("tasks", []),
                )
            )

        # -----------------------------
        # Build retrieved chunks
        # -----------------------------
        retrieved_chunks = [
            RetrievedChunk(
                chunk_id=index,
                document=result.payload.get("document", "Unknown"),
                content=result.payload.get("text", ""),
                score=float(getattr(result, "score", 0.0)),
            )
            for index, result in enumerate(results, start=1)
        ]

        # -----------------------------
        # Return response
        # -----------------------------
        return StudyPlanResponse(
            topic=request.topic,
            days=days,
            retrieved_chunks=retrieved_chunks,
        )

    except HTTPException:
        raise

    except Exception as e:
        print("Study Plan Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )