"""
app.py
------
Flask REST API for the Zentrix chatbot backend.

Endpoints:
  POST /api/chat        — main chat endpoint
  POST /api/lead        — save a captured lead
  POST /api/rebuild     — rebuild TF-IDF model from latest Firestore data
  GET  /api/health      — health check
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from nlp.chatbot_engine import get_response
from nlp.tfidf_model import get_model, rebuild_model
from firebase.firestore_reader import save_lead, save_chat_history, log_analytics

app = Flask(__name__)
# Allow requests from any origin (tighten this to your frontend domain in production)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ── Boot: build TF-IDF model on startup ──────────────────────────────────────
print("Building TF-IDF model...")
get_model()
print("Server ready.")


# ─────────────────────────────────────────────────────────────────────────────
# POST /api/chat
# Body: { "message": str, "session": { "user_name": str } }
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)

    if not data or not data.get("message"):
        return jsonify({"error": "Missing 'message' field"}), 400

    user_message = str(data["message"]).strip()
    session = data.get("session", {})

    if not user_message:
        return jsonify({"error": "Message cannot be empty"}), 400

    # Get chatbot response
    result = get_response(user_message, session)

    # Persist to Firestore (fire-and-forget — errors don't break the response)
    user_name = session.get("user_name", "Anonymous")
    save_chat_history(user_message, result["response"], user_name)
    log_analytics("chat", {
        "user_message": user_message,
        "intent_tag": result["intent_tag"],
        "confidence": result["confidence"],
        "method": result["method"],
        "user_name": user_name,
    })

    return jsonify({
        "response": result["response"],
        "intent_tag": result["intent_tag"],
        "confidence": result["confidence"],
        "method": result["method"],
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
# POST /api/lead
# Body: { "name": str, "email": str, "phone": str, "location": str }
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/api/lead", methods=["POST"])
def capture_lead():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No data provided"}), 400

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    phone = str(data.get("phone", "")).strip()
    location = str(data.get("location", "")).strip()

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    success = save_lead(name, email, phone, location)
    log_analytics("lead_captured", {"name": name, "email": email, "location": location})

    if success:
        return jsonify({"message": f"Lead saved for {name}"}), 201
    else:
        return jsonify({"error": "Failed to save lead"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# POST /api/rebuild
# Rebuilds the TF-IDF model from latest Firestore data.
# Call this after updating Firestore content.
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/api/rebuild", methods=["POST"])
def rebuild():
    # Optional: add a secret token check here before allowing rebuild
    secret = request.headers.get("X-Rebuild-Token", "")
    expected = os.environ.get("REBUILD_TOKEN", "")
    if expected and secret != expected:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        from firebase.export_json import export
        export()                  # Pull latest data from Firestore → intents.json
        model = rebuild_model()   # Rebuild TF-IDF
        return jsonify({
            "message": "Model rebuilt successfully",
            "patterns": len(model.pattern_index),
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────────────────────────────────────────
# GET /api/health
# ─────────────────────────────────────────────────────────────────────────────
@app.route("/api/health", methods=["GET"])
def health():
    model = get_model()
    return jsonify({
        "status": "ok",
        "model_ready": model.is_ready(),
        "patterns_loaded": len(model.pattern_index),
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV", "production") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
