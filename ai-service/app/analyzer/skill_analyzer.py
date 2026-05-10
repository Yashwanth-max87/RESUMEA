from app.data import ROLE_SKILLS
from app.analyzer.ats import ats_score


def analyze_skills(role: str, extracted_skills: list[str], text: str) -> dict:
    required = ROLE_SKILLS.get(role, ROLE_SKILLS["Full Stack Developer"])
    normalized = {skill.lower().replace(".", "").replace(" ", ""): skill for skill in extracted_skills}
    matched = [skill for skill in required if skill.lower().replace(".", "").replace(" ", "") in normalized]
    missing = [skill for skill in required if skill.lower().replace(".", "").replace(" ", "") not in normalized]
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
            f"Add {skill} evidence through a small project, deployment note, test, or quantified resume bullet."
            for skill in missing[:4]
        ],
        "resumeFixes": [
            f"Add a bullet showing how you used {skill}, or complete a project before listing it."
            for skill in missing[:6]
        ],
        "interviewTopics": matched[:3] + missing[:5],
    }
