"""
preprocess.py
-------------
Text preprocessing pipeline:
  lowercase → tokenize → remove stopwords → lemmatize → stem → rejoin
"""

import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Download required NLTK data (safe to call multiple times)
for pkg in ("punkt", "punkt_tab", "stopwords", "wordnet"):
    nltk.download(pkg, quiet=True)

stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()
STOP_WORDS = set(stopwords.words("english"))


def preprocess(text: str) -> str:
    """
    Clean and normalize a text string for TF-IDF vectorization.

    Args:
        text: Raw input string (user query or intent pattern).

    Returns:
        Processed string of space-joined tokens.
    """
    if not text or not isinstance(text, str):
        return ""

    # 1. Lowercase  ← BUG FIX: original code lowercased into `text`
    #    but then passed the original `db` variable to word_tokenize
    text = text.lower()

    # 2. Remove special characters (keep alphanumeric + spaces)
    text = re.sub(r"[^a-z0-9\s]", " ", text)

    # 3. Tokenize
    tokens = word_tokenize(text)

    # 4. Remove stopwords and non-alphanumeric tokens
    tokens = [w for w in tokens if w.isalnum() and w not in STOP_WORDS]

    # 5. Lemmatize (reduces inflected forms: "running" → "run")
    tokens = [lemmatizer.lemmatize(w) for w in tokens]

    # 6. Stem (further reduces to root: "running" → "run")
    tokens = [stemmer.stem(w) for w in tokens]

    return " ".join(tokens)
