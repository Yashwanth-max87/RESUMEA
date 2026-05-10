def improve_summary(summary: str, role: str) -> str:
    base = summary.strip() or f"Developer targeting {role} roles."
    return f"{base} Add quantified impact, role-specific keywords, and one clear domain strength for {role} applications."


def improve_bullet(bullet: str) -> str:
    clean = bullet.strip() or "Built a feature."
    return f"{clean} Quantify scope, name the technology, and state the user or business impact."

