from urllib.parse import quote_plus


def youtube(label: str) -> str:
    return f"https://www.youtube.com/results?search_query={quote_plus(label)}"


def generate_roadmap(skills: list[str]) -> list[dict]:
    roadmap = []
    for index, skill in enumerate(skills):
        roadmap.append({
            "skill": skill,
            "duration": "2 weeks" if index < 2 else "3 weeks",
            "stages": [
                {
                    "level": "Beginner",
                    "goals": [f"Learn core {skill} concepts", "Set up tools and complete guided exercises"],
                    "resources": [
                        {"label": f"{skill} crash course", "url": youtube(f"{skill} crash course")},
                        {"label": f"{skill} beginner tutorial", "url": youtube(f"{skill} beginner tutorial")},
                    ],
                },
                {
                    "level": "Intermediate",
                    "goals": [f"Use {skill} in a practical project", "Write tests and document implementation choices"],
                    "resources": [
                        {"label": f"{skill} project tutorial", "url": youtube(f"{skill} project tutorial full course")},
                    ],
                },
                {
                    "level": "Advanced",
                    "goals": [f"Optimize and secure a {skill} workflow", "Prepare interview explanations with tradeoffs"],
                    "resources": [
                        {"label": f"{skill} interview questions", "url": youtube(f"{skill} advanced interview questions")},
                    ],
                },
            ],
            "project": f"Create a portfolio project using {skill}; include deployment, tests, screenshots, and impact metrics.",
        })
    return roadmap

