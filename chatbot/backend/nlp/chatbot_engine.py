"""
chatbot_engine.py
-----------------
The main chatbot response engine.
Takes a user message + session context → returns a bot response string.
"""

import random
from nlp.intent_detection import detect_intent

# ── Canned responses for built-in intents ────────────────────────────────────
GREETING_RESPONSES = [
    "Hello! 👋 Welcome to Zentrix Technology. How can I help you today?",
    "Hi there! 😊 I'm the Zentrix Assistant. What can I do for you?",
    "Hey! Great to see you. Ask me anything about our courses, services, or internships!",
]

FAREWELL_RESPONSES = [
    "Thank you for reaching out! Have a great day. 🙏",
    "You're welcome! Feel free to come back anytime. 👋",
    "Goodbye! Hope we were helpful. Don't hesitate to contact us. 😊",
]

FALLBACK_RESPONSES = [
    "I'm not sure about that. Could you rephrase your question?",
    "I don't have information on that yet. You can reach us at 📧 hr.zentrixtechnology@gmail.com or 📞 +91 938423728",
    "That's a bit outside my knowledge right now. Our team at hr.zentrixtechnology@gmail.com can help you better!",
]


def _pick_response(responses: list) -> str:
    """Randomly pick one response from a list."""
    if not responses:
        return random.choice(FALLBACK_RESPONSES)
    return random.choice(responses)


def get_response(user_message: str, session: dict | None = None) -> dict:
    """
    Generate a chatbot response for a user message.

    Args:
        user_message: Raw text from the user.
        session: Optional dict with session context (e.g. {"user_name": "Arjun"}).

    Returns:
        {
            "response": str,       — the text to send back to the user
            "intent_tag": str,     — matched intent tag
            "confidence": float,   — match confidence (0–1)
            "method": str,         — detection method used
        }
    """
    if session is None:
        session = {}

    user_name = session.get("user_name", "")

    # ── Handle built-in intents first (before hitting TF-IDF) ────────────────
    lower = user_message.lower().strip()

    if _is_greeting(lower):
        name_part = f" {user_name}" if user_name else ""
        response = f"Hi{name_part}! 👋 How can I help you today?"
        return _build_result(response, "greeting", 1.0, "rule")

    if _is_farewell(lower):
        response = _pick_response(FAREWELL_RESPONSES)
        return _build_result(response, "farewell", 1.0, "rule")

    # ── Run intent detection ──────────────────────────────────────────────────
    detection = detect_intent(user_message)
    tag = detection["tag"]
    confidence = detection["confidence"]
    method = detection["method"]
    intent = detection.get("intent")

    # ── Build response from matched intent ────────────────────────────────────
    if tag == "fallback" or intent is None:
        response = _pick_response(FALLBACK_RESPONSES)
        return _build_result(response, tag, confidence, method)

    # Inject user name into response if available
    response = _pick_response(intent.get("responses", []))
    if user_name and "{name}" in response:
        response = response.replace("{name}", user_name)

    return _build_result(response, tag, confidence, method)


# ── Helpers ───────────────────────────────────────────────────────────────────

def _is_greeting(text: str) -> bool:
    import re
    return bool(re.search(r"(^|\s)(hi|hello|hey|hai|howdy)(\s|$)", text))


def _is_farewell(text: str) -> bool:
    return any(w in text for w in ["bye", "goodbye", "see you", "thank you", "thanks"])


def _build_result(response: str, tag: str, confidence: float, method: str) -> dict:
    return {
        "response": response,
        "intent_tag": tag,
        "confidence": round(confidence, 4),
        "method": method,
    }
