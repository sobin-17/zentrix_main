"""
export_firestore.py
-------------------
Exports all Zentrix Firestore collections to a single Excel file
for Power BI dashboards.

Usage:
    python3 export_firestore.py

Output:
    chatbot_data.xlsx  (one sheet per collection)
"""

import os
import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
from datetime import datetime

# ── Firebase Init ─────────────────────────────────────────────────────────────
# Looks for serviceAccountKey.json in the SAME folder as this script
key_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "serviceAccountKey.json")

if not os.path.exists(key_path):
    raise FileNotFoundError(
        f"serviceAccountKey.json not found at: {key_path}\n"
        "Place the Firebase service account key in the same folder as this script."
    )

if not firebase_admin._apps:
    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()
print("Firebase Connected Successfully\n")

# ── Collections to export ─────────────────────────────────────────────────────
# Make sure these match your EXACT Firestore collection names
COLLECTIONS = [
    "faq",
    "courses",
    "services",
    "internship",          # FIX: was "internships" — your collection is "internship"
    "careers",
    "knowledge_base",
    "company_information",
    "chatbot",
    "queries",
    "chat_history",
    "leads",
    "visitors",
]

OUTPUT_FILE = "chatbot_data.xlsx"


def safe_convert(value):
    """Convert any Firestore special types to plain Python types for Excel."""
    # FIX: Handle Firestore DatetimeWithNanoseconds and standard datetime
    if hasattr(value, 'seconds'):
        # Firestore Timestamp object
        try:
            return datetime.fromtimestamp(value.seconds).strftime("%Y-%m-%d %H:%M:%S")
        except Exception:
            return str(value)
    elif isinstance(value, datetime):
        return value.strftime("%Y-%m-%d %H:%M:%S")
    elif isinstance(value, dict):
        return str(value)
    elif isinstance(value, list):
        return ", ".join(str(i) for i in value)
    return value


def export_collection(col_name):
    """Fetch all documents from a Firestore collection and return as DataFrame."""
    try:
        docs = list(db.collection(col_name).stream())

        if not docs:
            print(f"  ⚠️  {col_name} — empty collection, skipping.")
            return None

        data = []
        for doc in docs:
            item = doc.to_dict()

            # Convert all special types safely
            cleaned = {k: safe_convert(v) for k, v in item.items()}
            cleaned["document_id"] = doc.id
            data.append(cleaned)

        df = pd.DataFrame(data)
        print(f"  ✅ {col_name} — {len(df)} documents exported")
        return df

    except Exception as e:
        print(f"  ❌ {col_name} — Error: {e}")
        return None


# ── Main Export ───────────────────────────────────────────────────────────────
print("Starting Firestore Export...")
print("=" * 40)

exported_count = 0

with pd.ExcelWriter(OUTPUT_FILE, engine="openpyxl") as writer:
    for collection_name in COLLECTIONS:
        df = export_collection(collection_name)
        if df is not None:
            # Excel sheet names max 31 characters
            sheet_name = collection_name[:31]
            df.to_excel(writer, sheet_name=sheet_name, index=False)
            exported_count += 1

print("=" * 40)
print(f"\n✅ Export Completed!")
print(f"   Collections exported : {exported_count}/{len(COLLECTIONS)}")
print(f"   Output file          : {OUTPUT_FILE}")
print(f"   Location             : {os.path.abspath(OUTPUT_FILE)}")
print("\nNow open chatbot_data.xlsx in Power BI Desktop → Get Data → Excel")
