import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ["FIREBASE_KEY"] = "analytics/serviceAccountKey.json"

from firebase.firebase_connect import db

collections = [
    "faq",
    "courses",
    "internship",
    "careers",
    "services",
    "company_information",
    "knowledge_base",
    "chatbot",
]

updated_count = 0
for col in collections:
    docs = db.collection(col).stream()
    for doc in docs:
        data = doc.to_dict()
        needs_update = False
        new_data = {}
        for key, value in data.items():
            if isinstance(value, str) and ("zentrixtecnogies" in value or "87293" in value):
                new_val = value.replace("zentrixtecnogies@gmail.com", "hr.zentrixtechnology@gmail.com")
                new_val = new_val.replace("+91 87293 8522", "+91 938423728")
                new_data[key] = new_val
                needs_update = True
                
        if needs_update:
            print(f"Updating doc: {col}/{doc.id}")
            db.collection(col).document(doc.id).update(new_data)
            updated_count += 1

print(f"Total updated: {updated_count}")
