from io import BytesIO
import re

try:
    import pdfplumber
except Exception:  # pragma: no cover
    pdfplumber = None

from app.data import KNOWN_SKILLS

SKILL_ALIASES = {
    "JavaScript": ["javascript", "js", "ecmascript"],
    "TypeScript": ["typescript", "ts"],
    "React": ["react", "react.js", "reactjs"],
    "Node.js": ["node.js", "nodejs", "node"],
    "REST APIs": ["rest api", "rest apis", "restful", "restful api", "api development"],
    "PostgreSQL": ["postgresql", "postgres", "psql"],
    "Spring Boot": ["spring boot", "springboot"],
    "Spring": ["spring framework", "spring"],
    "CI/CD": ["ci/cd", "cicd", "continuous integration", "continuous deployment"],
    "JWT": ["jwt", "json web token", "json web tokens"],
    "OAuth2": ["oauth2", "oauth 2", "oauth"],
    "Testing": ["testing", "unit testing", "integration testing", "jest", "junit", "pytest"],
    "Cloud Deployment": ["cloud deployment", "deployment", "deployed", "render", "vercel", "netlify"],
    "Tailwind CSS": ["tailwind", "tailwind css"],
    "GitHub Actions": ["github actions", "gh actions"],
    "Machine Learning": ["machine learning", "ml"],
    "scikit-learn": ["scikit-learn", "sklearn"],
    "Power BI": ["power bi", "powerbi"],
}


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
        aliases = SKILL_ALIASES.get(skill, [skill.lower()])
        if any(re.search(r"(?<![a-z0-9])" + re.escape(alias.lower()) + r"(?![a-z0-9])", lowered) for alias in aliases):
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
