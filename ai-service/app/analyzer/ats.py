import re


def readability_score(text: str) -> int:
    words = re.findall(r"[A-Za-z]+", text)
    sentences = max(1, len(re.findall(r"[.!?]", text)))
    average_sentence = len(words) / sentences
    score = 100 - max(0, average_sentence - 18) * 2
    return max(40, min(100, round(score)))


def formatting_score(text: str) -> int:
    score = 70
    if re.search(r"\b(summary|experience|education|skills|projects)\b", text, re.I):
        score += 15
    if re.search(r"[-•]\s+", text):
        score += 8
    if len(text) > 1200:
        score += 7
    return min(100, score)


def ats_score(text: str, matching_percentage: int) -> int:
    if not text:
        return max(55, round(matching_percentage * 0.72 + 24))
    combined = matching_percentage * 0.58 + readability_score(text) * 0.2 + formatting_score(text) * 0.22
    return max(0, min(100, round(combined)))

