def extract_text_file(file_path: str) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()

    except Exception as e:
        raise Exception(f"Error reading text file: {str(e)}")