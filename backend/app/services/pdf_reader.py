from pathlib import Path
from pypdf import PdfReader

class DocumentReader:

    @staticmethod
    def read(file_path:str)->str:
        extension=Path(file_path).suffix.lower()
        if extension==".pdf":
            return DocumentReader._read_pdf(file_path)
        elif extension==".txt":
            return DocumentReader._read_txt(file_path)
        else:
            raise ValueError(
                f"Unsupported file type:{extension}"
            )

    @staticmethod
    def _read_pdf(file_path:str)->str:
        reader=PdfReader(file_path)
        text=[]
        for page in reader.pages:
            page_text=page.extract_text()
            if page_text:
                text.append(page_text)
        return "\n".join(text)

    @staticmethod
    def _read_txt(filepath:str)->str:
        with open(filepath,"r",encoding="utf-8") as file:
            return file.read()