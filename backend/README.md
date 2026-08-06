# AI Study Companion

A Retrieval-Augmented Generation (RAG) application built using:

- FastAPI
- Qdrant
- Gemini
- LangChain
- Next.js

---

# Features

- Upload PDF/TXT study notes
- Automatic text extraction
- Document chunking
- Embedding generation
- Store embeddings in Qdrant
- Semantic retrieval
- AI-generated study plans

---

# Project Structure

backend/

```
app/
    routers/
    services/
    models/
    main.py

uploads/

.env
requirements.txt
README.md
```

frontend/

```
Next.js
```

---

# Backend Setup

## Clone

```bash
git clone <repository-url>
cd backend
```

---

## Create Virtual Environment

Linux/macOS

```bash
python -m venv venv
source venv/bin/activate
```

Windows

```cmd
python -m venv venv
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Environment

Create a `.env`

```env
GEMINI_API_KEY=your_api_key
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=study_notes
```

---

# Running Qdrant

Using Docker

```bash
docker run -d \
-p 6333:6333 \
-p 6334:6334 \
-v $(pwd)/qdrant_storage:/qdrant/storage \
qdrant/qdrant
```

Check

```
http://localhost:6333/dashboard
```

---

# Run Backend

```bash
uvicorn app.main:app --reload
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# API Flow

```
Upload PDF
        │
        ▼
Extract Text
        │
        ▼
Chunk Document
        │
        ▼
Generate Embeddings
        │
        ▼
Store in Qdrant
        │
        ▼
User Query
        │
        ▼
Retrieve Relevant Chunks
        │
        ▼
Generate Study Plan
        │
        ▼
Return JSON
```

---

# Technologies

- FastAPI
- LangChain
- Google Gemini
- Qdrant
- PyPDF
- Next.js
- TypeScript

---

# Environment Variables

| Variable | Description |
|----------|-------------|
| GEMINI_API_KEY | Gemini API Key |
| QDRANT_URL | Qdrant Server URL |
| QDRANT_COLLECTION | Collection Name |
| EMBEDDING_MODEL | Embedding Model |
| LLM_MODEL | Gemini Model |

---

# Future Improvements

- Adaptive quizzes
- Progress tracking
- Flashcards
- User authentication
- Multiple document support
- Persistent databas
