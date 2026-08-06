from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import profile
from app.routers.dashboard import router as dashboard_router
from app.routers.documents import router as documents_router
from app.routers.planner import router as planner_router
from app.routers.upload import router as upload_router


app = FastAPI(
    title="AI Study Companion API",
    description="Backend API for document upload, retrieval, embeddings, and AI study plan generation.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# API Routers
# -----------------------------

API_PREFIX = "/api"

app.include_router(
    upload_router,
    prefix=f"{API_PREFIX}/upload",
    tags=["Upload"],
)

app.include_router(
    planner_router,
    prefix=f"{API_PREFIX}/planner",
    tags=["Planner"],
)

app.include_router(
    dashboard_router,
    prefix=f"{API_PREFIX}/dashboard",
    tags=["Dashboard"],
)

app.include_router(
    documents_router,
    prefix=f"{API_PREFIX}/documents",
    tags=["Documents"],
)

app.include_router(
    profile.router,
    prefix=API_PREFIX,
    tags=["Profile"],
)

# -----------------------------
# Health Endpoints
# -----------------------------

@app.get("/", tags=["System"])
async def root():
    return {
        "message": "AI Study Companion API is running"
    }


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy"
    }