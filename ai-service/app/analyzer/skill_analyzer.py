from app.data import ROLE_SKILLS
from app.analyzer.ats import ats_score


def analyze_skills(role: str, extracted_skills: list[str], text: str) -> dict:
    required = ROLE_SKILLS.get(role, ROLE_SKILLS["Full Stack Developer"])
    normalized = {skill.lower(): skill for skill in extracted_skills}
    matched = [skill for skill in required if skill.lower() in normalized]
    missing = [skill for skill in required if skill.lower() not in normalized]
    matching_percentage = round(len(matched) / len(required) * 100)

    return {
        "role": role,
        "extractedSkills": extracted_skills,
        "matchedSkills": matched,
        "missingSkills": missing,
        "matchingPercentage": matching_percentage,
        "atsScore": ats_score(text, matching_percentage),
        "recommendedTechnologies": missing[:6],
        "suggestedProjects": [
            f"Build and deploy a {skill} focused feature with tests, README, and quantified resume bullets."
            for skill in missing[:4]
        ],
        "interviewTopics": matched[:3] + missing[:5],
    }

