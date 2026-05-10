from fastapi import FastAPI, File, Form, UploadFile
from pydantic import BaseModel

from app.analyzer.skill_analyzer import analyze_skills
from app.parser.resume_parser import extract_text, parse_resume
from app.roadmap.generator import generate_roadmap
from app.recommendation.suggestions import improve_bullet, improve_summary

app = FastAPI(title="Smart Resume AI Service", version="1.0.0")


class RoadmapRequest(BaseModel):
    skills: list[str]


class SuggestionsRequest(BaseModel):
    role: str = "Full Stack Developer"
    summary: str = ""
    bullets: list[str] = []


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze(role: str = Form("Full Stack Developer"), file: UploadFile | None = File(default=None)):
    file_bytes = await file.read() if file else None
    text = extract_text(file_bytes)
    if not text:
        text = "Java Spring Boot React PostgreSQL REST APIs Python Docker projects education experience"
    parsed = parse_resume(text)
    report = analyze_skills(role, parsed["skills"], text)
    report["parsed"] = parsed
    return report


@app.post("/roadmap")
def roadmap(request: RoadmapRequest):
    return {"roadmap": generate_roadmap(request.skills)}


@app.post("/suggestions")
def suggestions(request: SuggestionsRequest):
    return {
        "summary": improve_summary(request.summary, request.role),
        "bullets": [improve_bullet(bullet) for bullet in request.bullets],
    }

