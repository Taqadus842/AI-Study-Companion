from pypdf import PdfReader

def extract_pdf_text(file_path: str) -> str:
    try:
        reader = PdfReader(file_path)

        extracted_text = []

        for page in reader.pages:
            text = page.extract_text()

            if text:
                extracted_text.append(text)

        return "\n".join(extracted_text)

    except Exception as e:
        raise Exception(f"Error reading PDF: {str(e)}")
        