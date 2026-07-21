"""
intent_detection.py
-------------------
Detects the best matching intent for a user query using:
  1. TF-IDF cosine similarity (primary)
  2. Keyword fallback matching (secondary, for short/common queries)

Renamed from intent_dedection.py (typo fixed).
"""

import re
from nlp.tfidf_model import get_model
from nlp.data_loader import load_intents

# Minimum cosine similarity score to accept a TF-IDF match
CONFIDENCE_THRESHOLD = 0.15

# Keyword rules for common short queries that TF-IDF may miss
KEYWORD_RULES = [
    (["hi", "hello", "hey", "hai", "howdy"], "greeting"),
    (["bye", "goodbye", "see you", "thanks", "thank you"], "farewell"),
    (["course", "courses", "training", "learn", "study"], "courses"),
    (["service", "services", "offer", "provide"], "services"),
    (["intern", "internship", "internships"], "internship"),
    (["career", "job", "jobs", "hiring", "vacancy", "openings"], "careers"),
    (["contact", "email", "phone", "reach", "address"], "contact"),
    (["about", "zentrix", "company", "who are you", "what do you do"], "about"),
    (["fee", "fees", "cost", "price", "pricing", "charges"], "fees"),
    (["certificate", "certification", "cert"], "certification"),
]


def _get_intent_by_tag(tag: str, intents_data: dict) -> dict | None:
    """Find the first intent whose tag matches (or starts with) `tag`."""
    for intent in intents_data.get("intents", []):
        if intent.get("tag", "").startswith(tag) or intent.get("tag", "") == tag:
            return intent
    return None


def detect_intent(user_input: str) -> dict:
    """
    Detect the best intent for a given user input.

    Returns a dict:
    {
        "tag":        str,   — matched intent tag
        "confidence": float, — similarity score (0–1)
        "method":     str,   — "tfidf" | "keyword" | "fallback"
        "intent":     dict,  — full intent object (patterns + responses)
    }
    """
    if not user_input or not isinstance(user_input, str):
        return _fallback()

    lower = user_input.lower().strip()
    intents_data = load_intents()

    # ── 1. TF-IDF cosine similarity ──────────────────────────────────────────
    model = get_model()
    if model.is_ready():
        results = model.query(lower, top_n=1)
        if results and results[0]["score"] >= CONFIDENCE_THRESHOLD:
            best = results[0]
            intent = _get_intent_by_tag(best["tag"], intents_data)
            if intent:
                return {
                    "tag": best["tag"],
                    "confidence": best["score"],
                    "method": "tfidf",
                    "intent": intent,
                }

    # ── 2. Keyword rule fallback ─────────────────────────────────────────────
    for keywords, category_tag in KEYWORD_RULES:
        if any(kw in lower for kw in keywords):
            # Try to find an intent whose tag contains this category
            matched_intent = None
            for intent in intents_data.get("intents", []):
                if category_tag in intent.get("tag", "").lower():
                    matched_intent = intent
                    break

            if matched_intent:
                return {
                    "tag": matched_intent["tag"],
                    "confidence": 0.5,
                    "method": "keyword",
                    "intent": matched_intent,
                }
            else:
                # Category recognised but no intent yet — return category hint
                return {
                    "tag": category_tag,
                    "confidence": 0.4,
                    "method": "keyword",
                    "intent": None,
                }

    # ── 3. No match ───────────────────────────────────────────────────────────
    return _fallback()


def _fallback() -> dict:
    return {
        "tag": "fallback",
        "confidence": 0.0,
        "method": "fallback",
        "intent": None,
    }
