import os
import firebase_admin
from firebase_admin import credentials, firestore

def init_firebase():
    """
    Initialize Firebase only once.
    Reads the service account key path from the FIREBASE_KEY env variable.
    Falls back to ServiceAccountKey.json in the backend root directory.
    """
    if firebase_admin._apps:
        # Already initialized — return existing client
        return firestore.client()

    key_path = os.environ.get("FIREBASE_KEY", "ServiceAccountKey.json")

    if not os.path.exists(key_path):
        raise FileNotFoundError(
            f"Firebase service account key not found at: {key_path}\n"
            "Set the FIREBASE_KEY environment variable to the correct path."
        )

    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)
    print("Firebase Connected Successfully")
    return firestore.client()


# Single shared Firestore client — imported by other modules
db = init_firebase()
