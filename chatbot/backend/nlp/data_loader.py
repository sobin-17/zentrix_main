"""
data_loader.py
--------------
Loads intents.json from the data/ directory.
This is the single source of truth used by the NLP engine.
"""

import os
import json


def load_intents() -> dict:
    """
    Load the intents JSON file.

    Returns:
        dict with an "intents" key containing a list of intent objects.
        Returns {"intents": []} if the file is missing or empty.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, "data", "intents.json")

    if not os.path.exists(json_path):
        print(f"Warning: intents.json not found at {json_path}. Run export_json.py first.")
        return {"intents": []}

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Handle both {"intents": [...]} and a bare list []
    if isinstance(data, list):
        data = {"intents": data}

    intents = data.get("intents", [])
    print(f"Loaded {len(intents)} intents from {json_path}")
    return data
