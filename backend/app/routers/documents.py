import json
import os

from fastapi import APIRouter, HTTPException

from app.config import UPLOAD_DIR

router = APIRouter()

DOCUMENT_DB = "documents.json"


def load_documents():
    """Load document metadata from JSON file."""
    if not os.path.exists(DOCUMENT_DB):
        return []

    try:
        with open(DOCUMENT_DB, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []


def save_documents(documents):
    """Save document metadata to JSON file."""
    with open(DOCUMENT_DB, "w", encoding="utf-8") as f:
        json.dump(documents, f, indent=4)


@router.get("/")
async def get_documents():
    """Return all uploaded documents."""
    return load_documents()


@router.delete("/{document_id}")
async def delete_document(document_id: str):
    """Delete a document and its uploaded file."""

    documents = load_documents()

    document = next(
        (doc for doc in documents if doc["id"] == document_id),
        None,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    # Remove uploaded file
    filename = document["id"]
    for ext in [".pdf", ".txt"]:
        file_path = os.path.join(
            UPLOAD_DIR,
            filename + ext,
        )

        if os.path.exists(file_path):
            os.remove(file_path)

    # Remove metadata
    updated_documents = [
        doc
        for doc in documents
        if doc["id"] != document_id
    ]

    save_documents(updated_documents)

    return {
        "message": "Document deleted successfully",
        "id": document_id,
    }