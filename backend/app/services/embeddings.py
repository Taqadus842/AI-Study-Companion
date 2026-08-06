from typing import List
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.config import(GEMINI_API_KEY,EMBEDDING_MODEL,)

class EmbeddingService:

    def __init__(self):
        self.embedding_model=GoogleGenerativeAIEmbeddings(
            model=EMBEDDING_MODEL,
            google_api_key=GEMINI_API_KEY,
        )

    def embed_text(self,text:str)->List[float]:
        return self.embedding_model.embed_query(text)

    def embed_document(self,chunks:List[str])->List[List[float]]:
        if not chunks:
            return []
        return self.embedding_model.embed_documents(chunks)