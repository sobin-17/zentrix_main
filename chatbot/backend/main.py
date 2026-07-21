"""
main.py
-------
Entry point for the Zentrix chatbot backend.

Steps on first run:
  1. Firebase connects using ServiceAccountKey.json (or FIREBASE_KEY env var)
  2. Firestore data is exported to data/intents.json
  3. TF-IDF model is built from intents.json
  4. Flask API server starts on port 5000

Usage:
  python main.py                   # development
  gunicorn main:app -b 0.0.0.0:5000  # production
"""

import os
import sys

# Ensure project root is on the path when running as python main.py
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# ── Step 1: Connect Firebase ──────────────────────────────────────────────────
from firebase.firebase_connect import db  # noqa: F401 — triggers init
print("✅ Firebase connected")

# ── Step 2: Export Firestore → intents.json ───────────────────────────────────
from firebase.export_json import export
export()
print("✅ Firestore data exported to data/intents.json")

# ── Step 3: Pre-build TF-IDF model (so first request is fast) ─────────────────
from nlp.tfidf_model import get_model
get_model()
print("✅ TF-IDF model built")

# ── Step 4: Import the Flask app (also used by gunicorn) ─────────────────────
from api.app import app
print("✅ Flask app ready")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Starting Zentrix chatbot server on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
