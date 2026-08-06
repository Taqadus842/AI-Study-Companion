import json
import os
import uuid
from datetime import datetime

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.config import UPLOAD_DIR
from app.models.schemas import DocumentResponse
from app.services.chunker import TextChunker
from app.services.embeddings import EmbeddingService
from app.services.pdf_reader import DocumentReader
from app.services.qdrant_service import QdrantService

router = APIRouter()

DOCUMENT_DB = "documents.json"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def load_documents():
    if not os.path.exists(DOCUMENT_DB):
        return []

    try:
        with open(DOCUMENT_DB, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []


def save_documents(documents):
    with open(DOCUMENT_DB, "w") as f:
        json.dump(documents, f, indent=4)


@router.post("/", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in [".pdf", ".txt"]:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and TXT files are supported.",
        )

    document_id = str(uuid.uuid4())
    filename = f"{document_id}{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    try:
        # Save uploaded file
        contents = await file.read()

        if not contents:
            raise HTTPException(
                status_code=400,
                detail="Uploaded file is empty.",
            )

        with open(file_path, "wb") as f:
            f.write(contents)

        # Read document
        reader = DocumentReader()
        text = reader.read(file_path)

        if not text or not text.strip():
            raise HTTPException(
                status_code=400,
                detail="No readable text found in the document.",
            )

        # Chunk text
        chunker = TextChunker()
        chunks = chunker.split(text)

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="Failed to generate text chunks.",
            )

        # Generate embeddings
        embedding_service = EmbeddingService()
        vectors = embedding_service.embed_document(chunks)

        if len(vectors) != len(chunks):
            raise HTTPException(
                status_code=500,
                detail="Embedding generation failed.",
            )

        # Store in Qdrant
        qdrant = QdrantService()
        qdrant.create_collection(vector_size=len(vectors[0]))
        qdrant.store_chunks(
            chunks=chunks,
            vectors=vectors,
            document_name=file.filename,
        )

        # Save metadata
        document = {
            "id": document_id,
            "filename": file.filename,
            "chunks": len(chunks),
            "status": "ready",
            "uploadedAt": datetime.utcnow().isoformat(),
            "sizeLabel": f"{len(contents) / 1024:.2f} KB",
        }

        documents = load_documents()
        documents.append(document)
        save_documents(documents)

        return DocumentResponse(
            id=document_id,
            filename=file.filename,
            chunks=len(chunks),
            status="ready",
        )

    except HTTPException:
        raise

    except Exception as e:
        print("Upload Error:", e)

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )