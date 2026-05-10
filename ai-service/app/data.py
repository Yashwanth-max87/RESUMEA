ROLE_SKILLS = {
    "Frontend Developer": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Redux", "Tailwind CSS", "Accessibility", "Testing Library", "Vite"],
    "Backend Developer": ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "Redis", "Docker", "Microservices", "JUnit", "OAuth2", "System Design"],
    "Full Stack Developer": ["React", "Java", "Spring Boot", "PostgreSQL", "REST APIs", "Docker", "JWT", "CI/CD", "Testing", "Cloud Deployment"],
    "Java Developer": ["Java", "Spring Boot", "Hibernate", "JPA", "PostgreSQL", "JUnit", "Maven", "Microservices", "Kafka", "Docker"],
    "Python Developer": ["Python", "FastAPI", "Flask", "SQLAlchemy", "PostgreSQL", "pytest", "Pandas", "Docker", "REST APIs", "Async IO"],
    "AI/ML Engineer": ["Python", "Machine Learning", "scikit-learn", "TensorFlow", "PyTorch", "NLP", "Transformers", "MLOps", "Vector Databases", "Feature Engineering"],
    "Data Analyst": ["SQL", "Python", "Pandas", "Power BI", "Tableau", "Statistics", "Excel", "Data Cleaning", "Visualization", "Storytelling"],
    "Cloud Engineer": ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Linux", "Networking", "CI/CD", "Monitoring", "Security"],
    "DevOps Engineer": ["Linux", "Docker", "Kubernetes", "CI/CD", "Terraform", "AWS", "Monitoring", "Scripting", "GitHub Actions", "Security"],
}

KNOWN_SKILLS = sorted({skill for skills in ROLE_SKILLS.values() for skill in skills} | {
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Express",
    "Java", "Spring", "Spring Boot", "Hibernate", "JPA", "Maven", "Gradle", "Python", "FastAPI",
    "Flask", "Django", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Kubernetes",
    "AWS", "Azure", "GCP", "Git", "GitHub", "CI/CD", "Jenkins", "GitHub Actions", "NLP",
    "Machine Learning", "Deep Learning", "Transformers", "scikit-learn", "Pandas", "NumPy",
})

