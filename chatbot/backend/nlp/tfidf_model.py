"""
tfidf_model.py
--------------
Builds and queries a TF-IDF matrix over all intent patterns.
Used by the intent detection engine to find the best matching intent.
"""

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from nlp.preprocess import preprocess
from nlp.data_loader import load_intents


class TFIDFModel:
    """
    Vectorizes all intent patterns using TF-IDF and supports
    cosine-similarity-based nearest-neighbour search.
    """

    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),   # unigrams + bigrams for better coverage
            min_df=1,
            max_df=0.95,
        )
        self.matrix = None        # shape: (n_patterns, n_features)
        self.pattern_index = []   # list of (intent_tag, original_pattern)
        self.intents = []         # full intent objects
        self._built = False

    def build(self, intents_data: dict | None = None):
        """
        Build the TF-IDF matrix from intents data.

        Args:
            intents_data: Optional dict with "intents" key.
                          If None, loads from intents.json automatically.
        """
        if intents_data is None:
            intents_data = load_intents()

        self.intents = intents_data.get("intents", [])

        if not self.intents:
            print("Warning: No intents found. TF-IDF model is empty.")
            self._built = False
            return self

        # Flatten all patterns — each (tag, pattern) becomes one row
        corpus = []
        for intent in self.intents:
            tag = intent.get("tag", "unknown")
            for pattern in intent.get("patterns", []):
                processed = preprocess(pattern)
                if processed:
                    corpus.append(processed)
                    self.pattern_index.append((tag, pattern))

        if not corpus:
            print("Warning: All patterns were empty after preprocessing.")
            self._built = False
            return self

        self.matrix = self.vectorizer.fit_transform(corpus)
        self._built = True
        print(f"TF-IDF model built: {len(corpus)} patterns, {self.matrix.shape[1]} features")
        return self

    def query(self, user_input: str, top_n: int = 1) -> list[dict]:
        """
        Find the best matching intent(s) for a user query.

        Args:
            user_input: Raw user text.
            top_n: Number of top results to return.

        Returns:
            List of dicts sorted by score descending:
              [{"tag": ..., "pattern": ..., "score": ...}, ...]
            Empty list if the model is not built or no match found.
        """
        if not self._built or self.matrix is None:
            return []

        processed = preprocess(user_input)
        if not processed:
            return []

        query_vec = self.vectorizer.transform([processed])
        scores = cosine_similarity(query_vec, self.matrix).flatten()

        top_indices = np.argsort(scores)[::-1][:top_n]

        results = []
        for idx in top_indices:
            score = float(scores[idx])
            if score > 0:
                tag, pattern = self.pattern_index[idx]
                results.append({"tag": tag, "pattern": pattern, "score": score})

        return results

    def is_ready(self) -> bool:
        return self._built


# Module-level singleton — imported by chatbot_engine and intent_detection
_model_instance: TFIDFModel | None = None


def get_model() -> TFIDFModel:
    """Return the shared TF-IDF model, building it on first call."""
    global _model_instance
    if _model_instance is None or not _model_instance.is_ready():
        _model_instance = TFIDFModel()
        _model_instance.build()
    return _model_instance


def rebuild_model() -> TFIDFModel:
    """Force a rebuild — call this after re-exporting intents from Firestore."""
    global _model_instance
    _model_instance = TFIDFModel()
    _model_instance.build()
    return _model_instance
