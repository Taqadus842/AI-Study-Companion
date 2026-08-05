# AI Study Companion - Embedding & Semantic Retrieval Microservice

An enterprise-grade, modular Python microservice built with **FastAPI**, **Sentence Transformers**, and **Qdrant Vector Database** for document chunk embedding, vector storage, and Top-K semantic retrieval.

---

## 🚀 System Architecture & Pipeline

```
 Document Chunks (Hooriya)
          │
          ▼
   POST /embed API
          │
          ▼
 SentenceTransformers (all-MiniLM-L6-v2) ──► Generates 384-dim Vectors
          │
          ▼
 Qdrant Vector Store ──► Collection: `study_notes` (Cosine Similarity)
          ▲
          │ Top-K Semantic Search
          │
   POST /retrieve API ◄── User Query ("Machine Learning")
          │
          ▼
 Handover to Taqadus (LLM Study Plan Generator)
```

---

## 🛠️ Tech Stack & Model Specs

| Component | Specification / Technology |
|---|---|
| **Framework** | FastAPI + Uvicorn |
| **Embedding Model** | `sentence-transformers/all-MiniLM-L6-v2` |
| **Vector Dimension** | 384 |
| **Vector Database** | Qdrant |
| **Collection Name** | `study_notes` |
| **Distance Metric** | Cosine Similarity (`Distance.COSINE`) |
| **Testing** | Pytest + FastAPI TestClient |

---

## ⚙️ Installation & Quickstart

### 1. Environment Setup
Clone the repository and install dependencies:
```bash
git clone <repository_url>
cd AI-Study-Companion
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration (`.env`):
```env
EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION_NAME=study_notes
QDRANT_VECTOR_SIZE=384
```

### 3. Run Qdrant Vector Database (Docker)
Start a local Qdrant container:
```bash
docker run -d -p 6333:6333 -p 6334:6334 qdrant/qdrant
```
*Note: If Docker is not running, the service automatically falls back to an in-memory Qdrant client for local development and testing.*

### 4. Launch FastAPI Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
Interactive API docs are available at: `http://localhost:8000/docs`

---

## 📡 API Reference

### 1. Store & Embed Document Chunks
- **Endpoint**: `POST /embed`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "chunks": [
    {
      "chunk_id": 1,
      "text": "Artificial Intelligence is a branch of computer science focused on building smart machines.",
      "metadata": { "subject": "AI Concepts" }
    },
    {
      "chunk_id": 2,
      "text": "Machine Learning is a subset of AI that enables systems to learn from data.",
      "metadata": { "subject": "ML Basics" }
    }
  ]
}
```
- **Response**: `201 Created`
```json
{
  "status": "success",
  "stored_count": 2,
  "message": "Successfully generated embeddings and stored 2 chunks in Qdrant collection 'study_notes'.",
  "stored_ids": [1, 2]
}
```

---

### 2. Retrieve Relevant Chunks (Semantic Search)
- **Endpoint**: `POST /retrieve`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "query": "Machine Learning",
  "top_k": 2
}
```
- **Response**: `200 OK`
```json
{
  "results": [
    {
      "score": 0.9412,
      "chunk": "Machine Learning is a subset of AI that enables systems to learn from data.",
      "chunk_id": 2,
      "metadata": { "subject": "ML Basics" }
    },
    {
      "score": 0.8954,
      "chunk": "Artificial Intelligence is a branch of computer science focused on building smart machines.",
      "chunk_id": 1,
      "metadata": { "subject": "AI Concepts" }
    }
  ]
}
```

---

## 🤝 Handover Documentation for Taqadus

This section contains all details required by **Taqadus** to feed retrieved document context into the downstream LLM Study Plan Generator.

### Integration Details for Taqadus:
- **Retrieval API Endpoint**: `POST /retrieve` (Base URL: `http://localhost:8000`)
- **Qdrant Collection Name**: `study_notes`
- **Request Schema**:
  ```json
  {
    "query": "<User Topic / Learning Goal>",
    "top_k": 5
  }
  ```
- **Response Schema**:
  ```json
  {
    "results": [
      {
        "score": <float: Cosine similarity score (e.g. 0.94)>,
        "chunk": "<str: Text content of retrieved document chunk>",
        "chunk_id": <int/str: Unique ID of the chunk>,
        "metadata": { ... }
      }
    ]
  }
  ```
- **Usage in LLM Prompt**:
  Extract the `"chunk"` text strings from `results` array and inject them into the system/user prompt for study plan generation.

---

## 🧪 Testing

Execute the automated test suite with pytest:
```bash
pytest tests/ -v
```

---

## 📋 Git Commit History & PR Structure

Recommended commit sequence implemented:
1. `Add embedding model` (`services/embedding_service.py`)
2. `Configure Qdrant client` (`services/qdrant_service.py`, `config.py`)
3. `Create Qdrant collection` (`study_notes` with size 384 and COSINE metric)
4. `Store embeddings in vector database` (`POST /embed`)
5. `Implement semantic retrieval API` (`POST /retrieve`)
6. `Refactor embedding and retrieval services` (`main.py`, unit tests & documentation)
