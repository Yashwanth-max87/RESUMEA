# Smart Resume Builder

A full-stack AI-powered resume builder inspired by Reactive Resume and OpenResume. It includes a dark React editor with live preview, dashboard, templates, AI resume analysis, ATS scoring, missing-skills detection, and personalized learning roadmaps with YouTube search suggestions.

## Stack

- Frontend: React, Tailwind CSS, React Router, Axios, dnd-kit
- Backend: Java Spring Boot, Spring Security, JWT, OAuth2 client, PostgreSQL
- AI service: Python FastAPI, pdfplumber/PyMuPDF-ready parser, scikit-learn style scoring hooks
- Infrastructure: Docker Compose, Swagger/OpenAPI-ready backend

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
./mvnw spring-boot:run
```

```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Or use Docker:

```bash
docker compose up --build
```

## Ports

- Frontend: `http://localhost:5173`
- Spring Boot API: `http://localhost:8080/api`
- Python AI service: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

## Notes

OAuth credentials, JWT secret, SMTP values, and production file storage settings belong in environment variables. See `.env.example`.

