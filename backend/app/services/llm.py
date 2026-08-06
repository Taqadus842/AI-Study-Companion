import json
import google.generativeai as genai

from app.config import (
    GEMINI_API_KEY,
    LLM_MODEL
)


class LLMService:

    def __init__(self):

        genai.configure(
            api_key=GEMINI_API_KEY
        )

        self.model = genai.GenerativeModel(
            model_name=LLM_MODEL
        )


    def generate_study_plan(
        self,
        topic: str,
        retrieved_chunks: list
    ) -> dict:


        context = "\n\n".join(
            [
                chunk["content"]
                if isinstance(chunk, dict)
                else chunk
                for chunk in retrieved_chunks
            ]
        )


        prompt = f"""
You are an AI Study Planner.

Create a study plan using only these notes.

Notes:
{context}

Topic:
{topic}


Return ONLY valid JSON.

Format:

{{
  "topic": "{topic}",
  "days": [
    {{
      "day": 1,
      "title": "Topic name",
      "tasks": [
        "Task 1",
        "Task 2"
      ]
    }}
  ]
}}

Rules:
- No markdown
- No explanation
- JSON only
- Keep tasks practical
"""


        response = self.model.generate_content(
            prompt
        )


        text = response.text.strip()


        # Remove accidental markdown
        if text.startswith("```"):
            text = (
                text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )


        return json.loads(text)