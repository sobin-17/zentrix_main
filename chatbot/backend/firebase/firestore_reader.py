from firebase.firebase_connect import db

# All Firestore collections that contain chatbot knowledge
# NOTE: names must match Firestore EXACTLY (case-sensitive!) — this was
# previously "Internship" (capital I) while the real collection is
# "internship", which silently dropped 31 documents from training.
KNOWLEDGE_COLLECTIONS = [
    "faq",
    "courses",
    "internship",
    "careers",
    "services",
    "company_information",
    "knowledge_base",
    "chatbot",
]


def get_collection_docs(collection_name):
    """Fetch all documents from a single Firestore collection."""
    try:
        docs = db.collection(collection_name).stream()
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["_id"] = doc.id
            data["_collection"] = collection_name
            result.append(data)
        return result
    except Exception as e:
        print(f"Warning: Could not read collection '{collection_name}': {e}")
        return []


def get_chatbot_data():
    """
    Fetch documents from all knowledge collections and return a
    structured intents list compatible with the NLP engine.

    Each Firestore document is expected to have either:
      - question / Question  →  the pattern
      - answer / Answer      →  the response
    Or for courses/services/internships:
      - name / title         →  used as pattern
      - description / details / content  →  used as response

    The Firestore data was entered manually and is messy in several ways:
      - trailing/leading spaces in field names ("question ", " certificate")
      - a literal colon typed INTO the field name ("title:", "content:")
      - typos in field names ("questio" instead of "question")
      - some docs use "message" instead of "answer" (chatbot collection)
      - some docs (mern_intern, python_intern, uiux_intern) have no
        question/answer at all — just role/duration/location fields
      - some docs (main, social_media, quick_links, placement_information)
        are pure config/metadata, not a Q&A pair, and should not be skipped
        as "errors" — they're just not chatbot intents.

    This function normalizes keys and uses fuzzy substring matching so
    typos and stray punctuation in field names don't silently drop data.
    """
    intents = []

    # Firestore document IDs that are known metadata/config, not Q&A —
    # we skip these silently (no warning spam) since they're not meant
    # to be chatbot intents.
    METADATA_DOC_IDS = {
        "main", "social_media", "quick_links", "placement_information",
        "contact information",
    }

    for col in KNOWLEDGE_COLLECTIONS:
        docs = get_collection_docs(col)
        for doc in docs:
            doc_id = doc.get("_id", "")

            # Normalize keys: strip whitespace, strip stray colons,
            # lowercase — so "question ", "title:", " Answer" etc. all
            # resolve to the same canonical key.
            clean = {}
            for k, v in doc.items():
                if isinstance(k, str):
                    norm_k = k.strip().strip(":").strip().lower()
                    clean[norm_k] = v
                else:
                    clean[k] = v

            def _first_match(*exact_keys, contains=None):
                """Try exact keys first, then any key containing `contains`."""
                for ek in exact_keys:
                    val = clean.get(ek)
                    if isinstance(val, str) and val.strip():
                        return val.strip()
                if contains:
                    for k, v in clean.items():
                        if contains in k and isinstance(v, str) and v.strip():
                            return v.strip()
                return ""

            pattern = _first_match(
                "question", "title", "name", "role", "keyword",
                contains="quest",
            )
            response = _first_match(
                "answer", "description", "details", "content", "text",
                "message",
                contains="answ",
            )

            # Special case: docs like mern_intern / python_intern / uiux_intern
            # have no answer field — synthesize one from role/duration/location.
            if not response and clean.get("role"):
                role = clean.get("role", "")
                duration = clean.get("duration", "")
                location = clean.get("location", "")
                pattern = pattern or role
                response = f"{role} — Duration: {duration}. Location: {location}."

            if not pattern or not response:
                if doc_id.strip().lower() not in METADATA_DOC_IDS:
                    print(f"Skipping incomplete doc '{doc_id}' in '{col}' "
                          f"(missing question/answer) — raw keys: {list(doc.keys())}")
                continue  # skip incomplete / non-Q&A documents

            # Build the pattern list: the main question + every keyword
            # phrase as its own pattern, so TF-IDF has more to learn from.
            patterns = [pattern]
            keywords_raw = _first_match("keywords", "keyword")
            if keywords_raw:
                for kw in keywords_raw.split(","):
                    kw = kw.strip()
                    if kw and kw.lower() != pattern.lower():
                        patterns.append(kw)

            # Build an intent entry for the NLP engine
            intents.append({
                "tag": f"{col}_{doc_id}",
                "collection": col,
                "patterns": patterns,
                "responses": [response],
            })

    print(f"Loaded {len(intents)} intents from Firestore")
    return {"intents": intents}


def save_lead(name, email, phone="", location=""):
    """Save a captured lead to the leads collection."""
    try:
        from firebase_admin import firestore as fs
        db.collection("leads").add({
            "name": name,
            "email": email,
            "phone": phone,
            "location": location,
            "createdAt": fs.SERVER_TIMESTAMP,
        })
        return True
    except Exception as e:
        print(f"Error saving lead: {e}")
        return False


def save_chat_history(user_message, bot_response, user_name="Anonymous"):
    """Persist a chat exchange to the chat_history collection."""
    try:
        from firebase_admin import firestore as fs
        db.collection("chat_history").add({
            "userMessage": user_message,
            "botResponse": bot_response,
            "userName": user_name,
            "timestamp": fs.SERVER_TIMESTAMP,
        })
        return True
    except Exception as e:
        print(f"Error saving chat history: {e}")
        return False


def log_analytics(event_type, data: dict):
    """Log an analytics event to the analytics_logs collection."""
    try:
        from firebase_admin import firestore as fs
        db.collection("analytics_logs").add({
            "event": event_type,
            "data": data,
            "timestamp": fs.SERVER_TIMESTAMP,
        })
    except Exception as e:
        print(f"Error logging analytics: {e}")
