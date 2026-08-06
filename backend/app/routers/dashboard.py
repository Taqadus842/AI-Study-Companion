from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_dashboard():
    return {
        "documents": 0,
        "chunks": 0,
        "embeddings": 0,
        "studyPlans": 0,
        "activity": []
    }