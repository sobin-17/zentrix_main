"""
export_json.py
--------------
Run this script to pull all chatbot data from Firestore and write it
to data/intents.json so the NLP engine can load it.

Usage:
    python firebase/export_json.py
"""

import os
import json
import sys

# Allow running from project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from firebase.firestore_reader import get_chatbot_data


def export():
    print("Fetching data from Firestore...")
    data = get_chatbot_data()

    output_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "data",
        "intents.json",
    )

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Exported {len(data.get('intents', []))} intents → {output_path}")


if __name__ == "__main__":
    export()
