# 📚 AI Study Companion

An AI-powered study assistant that transforms your lecture notes into personalized study plans using Retrieval-Augmented Generation (RAG), semantic search, and Large Language Models (LLMs).

---

## 🚀 Overview

AI Study Companion helps students study smarter by allowing them to upload lecture notes in PDF or TXT format. The system extracts and processes the content, stores semantic embeddings in a vector database, retrieves the most relevant information for a given topic, and uses an LLM (Google Gemini) to generate a personalized day-wise study plan.

---

## ✨ Features

### 📄 Upload Study Notes
- Upload PDF and TXT files
- Automatic document validation
- Secure file handling

### 📖 Document Processing
- Extract text from uploaded documents
- Split documents into semantic chunks
- Preserve context using chunk overlap

### 🧠 Embedding Generation
- Generate embeddings using Sentence Transformers
- Store vectors in Qdrant
- Attach metadata to every chunk

### 🔍 Semantic Retrieval
- Retrieve the most relevant notes based on a study topic
- Cosine similarity search using Qdrant
- Top-K contextual retrieval

### 🤖 AI Study Plan Generation
Generate personalized study plans using Google Gemini.

The study plan includes:

- Day-wise schedule
- Topics to study
- Learning objectives
- Revision suggestions
- Summary

### 💻 Modern Web Interface
- Upload notes
- Enter study topic
- Generate study plan
- Loading and error states
- Responsive design

---

# 🏗️ System Workflow

```text
            Upload PDF/TXT
                  │
                  ▼
          Extract Document Text
                  │
                  ▼
           Split into Chunks
                  │
                  ▼
      Generate Embedding Vectors
                  │
                  ▼
      Store in Qdrant Database
                  │
                  ▼
        User Enters Study Topic
                  │
                  ▼
      Retrieve Relevant Chunks
                  │
                  ▼
     Build Prompt for Gemini LLM
                  │
                  ▼
      Generate Structured Study Plan
                  │
                  ▼
        Display on Frontend
```

---

# 🏛️ Architecture

```
Frontend (Next.js)
        │
        ▼
 FastAPI Backend
        │
 ┌──────────────┐
 │ Upload API   │
 └──────────────┘
        │
        ▼
Document Processing
(PDF/TXT Loader)
        │
        ▼
 Chunking Service
        │
        ▼
Embedding Service
(all-MiniLM-L6-v2)
        │
        ▼
Qdrant Vector Database
        │
        ▼
 Retrieval Service
        │
        ▼
 Gemini LLM
        │
        ▼
 Study Plan JSON
```

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- FastAPI
- Python

## AI & NLP
- Google Gemini
- LangChain
- Sentence Transformers
- all-MiniLM-L6-v2

## Vector Database
- Qdrant

## File Processing
- PyPDF2 / PyMuPDF
- Text Loader

## Other Tools
- Docker
- Git
- GitHub
- Postman

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Taqadus842/AI-Study-Companion.git

cd AI-Study-Companion
```

---

## Backend

```bash
cd backend

python -m venv venv
```

Activate

Linux/macOS

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Frontend

```bash
cd frontend

npm install
```

---

# Environment Variables

Create a `.env` file.

```env
GOOGLE_API_KEY=YOUR_API_KEY

QDRANT_URL=http://localhost:6333

QDRANT_API_KEY=

COLLECTION_NAME=study_notes
```

---

# ▶️ Run the Application

## Backend

```bash
uvicorn main:app --reload
```

Backend

```
http://localhost:8000
```

---

## Frontend

```bash
npm run dev
```

Frontend

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Upload Notes

```
POST /upload
```

Uploads PDF/TXT notes and returns processed chunks.

---

## Generate Embeddings

```
POST /embed
```

Creates embeddings and stores them in Qdrant.

---

## Retrieve Notes

```
POST /retrieve
```

Returns the most relevant chunks for a study topic.

---

## Generate Study Plan

```
POST /study-plan
```

Uses retrieved chunks and Gemini to generate a structured study plan.

---

# 📋 Example Study Plan

```json
{
  "topic": "Machine Learning",
  "study_plan": [
    {
      "day": 1,
      "topic": "Introduction to Machine Learning"
    },
    {
      "day": 2,
      "topic": "Supervised Learning"
    },
    {
      "day": 3,
      "topic": "Unsupervised Learning"
    }
  ],
  "summary": "Complete the topics sequentially and revise on the final day."
}
```

---

# 🧪 Testing

- ✅ PDF upload
- ✅ TXT upload
- ✅ Text extraction
- ✅ Document chunking
- ✅ Embedding generation
- ✅ Qdrant storage
- ✅ Semantic retrieval
- ✅ Gemini integration
- ✅ Study plan generation
- ✅ Frontend API integration

---

# 🚀 Future Improvements

- Flashcard generation
- AI-generated quizzes
- Voice assistant
- OCR for handwritten notes
- Multi-document support
- Authentication
- Progress tracking dashboard
- Calendar integration
- Export study plans as PDF

---

# 👥 Team

| Name | Responsibility |
|------|----------------|
| **Ume Taqadus** | Team Lead, LLM Integration, Study Plan Generation, Frontend Development |
| **Hooriya** | FastAPI Backend, Document Processing, Chunking |
| **Sabeen** | Embeddings, Qdrant Integration, Semantic Retrieval |

---

# 📄 License

This project is developed for educational purposes as part of the FAST NUCES BS Computer Science coursework.

---

## ⭐ If you like this project, don't forget to star the repository!