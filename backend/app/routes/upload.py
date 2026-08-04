from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

from app.services.pdf_loader import extract_pdf_text
from app.services.text_loader import extract_text_file
from app.services.chunker import split_text_into_chunks

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    allowed_types = [".pdf", ".txt"]

    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and TXT files are allowed"
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if file_extension == ".pdf":
        text = extract_pdf_text(file_path)
    else:
        text = extract_text_file(file_path)

    chunks = split_text_into_chunks(text)

    return {
        "filename": file.filename,
        "status": "uploaded successfully",
        "total_chunks": len(chunks)
    }