from pathlib import Path
from dotenv import load_dotenv
import os

BASE_DIR=Path(__file__).resolve().parent.parent
ENV_FILE=BASE_DIR/".env"

load_dotenv(ENV_FILE)

APP_NAME=os.getenv("APP_NAME","AI Study Companion")
DEBUG=os.getenv("DEBUG","False").lower()=="true"

GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")
LLM_MODEL=os.getenv("LLM_MODEL","gemini-2.5-flash")
EMBEDDING_MODEL=os.getenv("EMBEDDING_MODEL","models/gemini-text-embedding-001",)
QDRANT_URL=os.getenv("QDRANT_URL","http://localhost:6333",)
QDRANT_API_KEY=os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION=os.getenv("QDRANT_COLLECTION","study_notes")
UPLOAD_DIR=os.getenv("UPLOAD_DIR","uploads")
os.makedirs(UPLOAD_DIR,exist_ok=True)

CHUNK_SIZE=int(
    os.getenv("CHUNK_SIZE",500)
)
CHUNK_OVERLAP=int(
    os.getenv("CHUNK_OVERLAP",50)
)
TOP_K=int(
    os.getenv("TOP_K",5)
)