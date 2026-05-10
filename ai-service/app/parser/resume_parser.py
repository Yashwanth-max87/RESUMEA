from io import BytesIO
import re

try:
    import pdfplumber
except Exception:  # pragma: no cover
    pdfplumber = None

from app.data import KNOWN_SKILLS


def extract_text(file_bytes: bytes | None) -> str:
    if not file_bytes:
        return ""
    if pdfplumber is None:
        return ""
    text_parts: list[str] = []
    with pdfplumber.open(BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            text_parts.append(page.extract_text() or "")
    return "\n".join(text_parts)


def extract_skills(text: str) -> list[str]:
    lowered = text.lower()
    found = []
    for skill in KNOWN_SKILLS:
        pattern = r"(?<![a-z0-9])" + re.escape(skill.lower()) + r"(?![a-z0-9])"
        if re.search(pattern, lowered):
            found.append(skill)
    return sorted(set(found))


def parse_resume(text: str) -> dict:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return {
        "skills": extract_skills(text),
        "experience": [line for line in lines if re.search(r"\b(engineer|developer|intern|analyst|manager)\b", line, re.I)][:8],
        "education": [line for line in lines if re.search(r"\b(university|college|b\.?e|bachelor|master|degree)\b", line, re.I)][:5],
        "projects": [line for line in lines if re.search(r"\b(project|built|created|developed)\b", line, re.I)][:8],
        "certifications": [line for line in lines if re.search(r"\b(certified|certification|certificate)\b", line, re.I)][:5],
    }

