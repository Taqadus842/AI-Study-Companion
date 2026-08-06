from typing import List
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.config import CHUNK_SIZE,CHUNK_OVERLAP

class TextChunker:
    def __init__(self):
        self.splitter=RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ],
        )

    def split(self,text:str)->List[str]:
        if not text or not text.strip():
            return []
        chunks=self.splitter.split_text(text)
        cleaned_chunks=[
            chunk.strip() for chunk in chunks if chunk.strip()
        ]
        return cleaned_chunks