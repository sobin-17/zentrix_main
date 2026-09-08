import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// The chatbot's data lives in the "zentrix-chatbot" project, not the main website's project.
const chatbotFirebaseConfig = {
  apiKey: "AIzaSyA1OzA1ZtxH7GjLXEedprCcZ0TygydRSew",
  authDomain: "zentrix-chatbot.firebaseapp.com",
  projectId: "zentrix-chatbot",
  storageBucket: "zentrix-chatbot.firebasestorage.app",
  messagingSenderId: "393836114544",
  appId: "1:393836114544:web:944112633e14d79a41bab5"
};

let chatbotApp;
try {
  chatbotApp = getApp("chatbotApp");
} catch (e) {
  chatbotApp = initializeApp(chatbotFirebaseConfig, "chatbotApp");
}
export const chatbotDb = getFirestore(chatbotApp);

let INTENTS = [];
let isLoaded = false;
let loadPromise = null;

const COLLECTIONS_TO_FETCH = ["faq", "courses", "internship", "careers", "services", "company_information", "knowledge_base"];

/**
 * Normalizes keys to handle missing spaces or typos from manual entry
 */
const normalizeKey = (key) => key.trim().replace(":", "").toLowerCase();

const firstMatch = (docData, exactKeys, containsKey = null) => {
  for (const ek of exactKeys) {
    for (const [key, value] of Object.entries(docData)) {
      if (normalizeKey(key) === ek && typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
  }
  if (containsKey) {
    for (const [key, value] of Object.entries(docData)) {
      if (normalizeKey(key).includes(containsKey) && typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
  }
  return "";
};

export const loadIntentsFromFirestore = async () => {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    let loadedIntents = [];

    for (const colName of COLLECTIONS_TO_FETCH) {
      try {
        const querySnapshot = await getDocs(collection(chatbotDb, colName));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;

          if (["main", "social_media", "quick_links", "placement_information", "contact information"].includes(docId.toLowerCase())) {
            return;
          }

          let pattern = firstMatch(data, ["question", "title", "name", "role", "keyword"], "quest");
          let response = firstMatch(data, ["answer", "description", "details", "content", "text", "message"], "answ");

          if (!response && firstMatch(data, ["role"])) {
            const role = firstMatch(data, ["role"]);
            const duration = firstMatch(data, ["duration"]);
            const location = firstMatch(data, ["location"]);
            pattern = pattern || role;
            response = `${role} — Duration: ${duration}. Location: ${location}.`;
          }

          if (pattern && response) {
            let keywords = [];
            const keywordsRaw = firstMatch(data, ["keywords", "keyword"]);
            if (keywordsRaw) {
              keywords = keywordsRaw.split(",").map(k => k.trim().toLowerCase()).filter(k => k);
            }
            if (!keywords.includes(pattern.toLowerCase())) {
              keywords.push(pattern.toLowerCase());
            }

            loadedIntents.push({
              tag: `${colName}_${docId}`,
              collection: colName,
              keywords: keywords,
              response: response
            });
          }
        });
      } catch (err) {
        console.error(`Failed to fetch collection ${colName}:`, err);
      }
    }

    if (loadedIntents.length > 0) {
      INTENTS = loadedIntents;
      console.log(`Loaded ${INTENTS.length} intents from live Firestore.`);
    } else {
      console.warn("Firestore fetch empty or blocked. No fallback data available.");
    }
    isLoaded = true;
  })();

  return loadPromise;
};

// Correct, current contact details. Update here only — everything below reads
// from these two constants so a future number/address change is one edit,
// not a grep-and-replace across every string in the file.
const CONTACT_PHONE = "+91 95097 30003";
const CONTACT_EMAIL = "hr.zentrixtechnology@gmail.com";

const FALLBACK_RESPONSES = [
  `I don't have an answer for that yet. Try asking about our Courses, Internships, Services, Placement, or Contact details, or reach our team directly: ${CONTACT_PHONE} / ${CONTACT_EMAIL}`,
];

const GREETINGS = [
  "h", "hi", "hii", "hello", "helo", "hlo", "hey", "hai", "hola", "yo",
  "sup", "wassup", "wasup", "good morning", "good afternoon", "good evening", "howdy"
];
const GREETING_RESPONSE = "Hello! 👋 Welcome to Zentrix Technology. How can I help you today?";

// Words too generic to count as a real signal for any topic (they show up
// across almost every intent, so they were letting long questions "win"
// unrelated intents just by accident of word overlap).
const STOP_WORDS = new Set([
  "the", "and", "for", "are", "you", "can", "please", "explain", "provide",
  "complete", "detail", "details", "about", "including", "please", "kindly",
  "help", "understand", "would", "like", "want", "know", "tell", "give",
  "what", "how", "does", "will", "with", "from", "that", "this", "your",
  "all", "each", "every", "also", "well", "just", "some", "any", "into",
  "have", "has", "had", "based", "goals", "make", "sure",

  // --- Domain stopwords (added) ---------------------------------------
  // These words are too generic WITHIN this chatbot's own domain: nearly
  // every course/internship doc's keyword list legitimately contains
  // "course"/"program" as part of a longer phrase (e.g. "course fees",
  // "which course is good", "python course details"). Letting them count
  // as an individual scoring signal caused unrelated intents to steal
  // score from the actually-correct intent whenever a query happened to
  // contain the word "course" (e.g. "course duration" scoring points
  // against the fees-doc, the ai-details-doc, the java-details-doc, etc,
  // just because their keyword lists each had one phrase containing
  // "course"). Excluding them from signalWords means they no longer
  // contribute word-level score on their own — but exact full-query
  // match and phrase-containment match (both checked separately below,
  // e.g. "course duration" as a whole phrase against a keyword) are
  // untouched, so intentional exact phrases like "course duration" or
  // "which course is good" still work correctly.
  "course", "courses", "program", "programs",
]);

// Real people stretch letters when typing casually — "hellooo", "heyyy",
// "hiiii". Collapse any letter repeated 2+ times down to one before
// comparing against the greeting list, so these still match.
const normalizeElongated = (word) => word.replace(/(.)\1{1,}/g, "$1");

// --- Typo / shorthand normalization layer ---------------------------------
// Instead of hand-listing misspellings in every Firestore doc's keywords
// (doesn't scale, bloats keyword lists, dilutes rarity weighting), normalize
// the incoming query once here: strip common suffixes, expand known
// shorthand, then fuzzy-match individual words against the keyword
// vocabulary using edit distance. Firestore keyword lists stay short and
// clean; typo/shorthand coverage is universal instead of per-doc guesswork.

// Small hardcoded shorthand map. Expand as new patterns show up in real
// queries — keep it short, this is for common abbreviations, not full
// synonym coverage.
const SHORTHAND_MAP = {
  "biz dev": "business development",
  "bizdev": "business development",
  "ml": "machine learning",
  "ai": "artificial intelligence",
  "reg": "registration",
  "info": "information",
  "int": "internship",
  "intern ship": "internship",
  "fullstack": "full stack",
  "full-stack": "full stack",
  "ui ux": "ui/ux",
  "phn": "phone",
  "ph no": "phone number",
  "ph": "phone",
};

const expandShorthand = (text) => {
  let out = text;
  for (const [short, full] of Object.entries(SHORTHAND_MAP)) {
    out = out.replace(new RegExp(`\\b${short}\\b`, "g"), full);
  }
  return out;
};

// Very small stemmer — strips common suffixes so "courses"/"internships"/
// "registering" match "course"/"internship"/"register" keywords without
// needing every inflected form listed manually.
const stem = (word) => {
  if (word.length <= 4) return word;
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("es") && !word.endsWith("ses")) return word.slice(0, -2);
  if (word.endsWith("ing") && word.length > 6) return word.slice(0, -3);
  if (word.endsWith("ed") && word.length > 5) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
};

// Standard edit distance, capped early exit for perf on short strings.
const levenshtein = (a, b) => {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (Math.abs(al - bl) > 2) return 99; // words too different in length, skip full compute
  const dp = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) dp[i][0] = i;
  for (let j = 0; j <= bl; j++) dp[0][j] = j;
  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[al][bl];
};

// Fuzzy word-equality: exact stem match, or edit distance <=2 for words
// long enough that a small typo won't collide with a genuinely different
// word (guards short words like "hr"/"ai" from false fuzzy matches).
const fuzzyWordMatch = (a, b) => {
  if (a === b) return true;
  const sa = stem(a), sb = stem(b);
  if (sa === sb) return true;
  if (a.length >= 5 && b.length >= 5 && levenshtein(a, b) <= 2) return true;
  return false;
};

// Small-talk / off-topic personal questions the bot should deflect on,
// instead of trying (and failing) to match them to a business intent.
// Covers common shorthand/misspelling people actually type: "u"/"r"/"ur"
// for you/are/your, dropped apostrophes, missing question marks.
const SMALL_TALK_PATTERNS = [
  /\b(are|r) (u|you) (free|single|human|real|a bot|a robot|married|female|male|a girl|a guy|busy|there|ok|okay)\b/,
  /\bhow (are|r|s|is) (u|you|ya)\b/,
  /\bhow('?s| is) it going\b/,
  /\bwhat'?s up\b/,
  /\b(love|luv|marry|date) (u|you|me)\b/,
  /\bwill (u|you) marry me\b/,
  /\bdo (u|you) love me\b/,
  /\bwho (are|r|s|is) (u|you|dis|this)\b/,
  /\b(are|r) (u|you) (a )?(real )?(human|person|ai|robot|bot)\b/,
  /\b(what'?s|wat'?s|whats|wats|what is) (ur|your|u) name\b/,
  /\b(ur|your|u) name\??$/,
  /\bhow old (are|r) (u|you)\b/,
  /\bcan i love (u|you)\b/,
  /\b(u|you) there\b/,
  /\bhbu\b|\bhru\b/,
  /\b(are|r) (u|you) (gay|straight|bi|trans|christian|hindu|muslim|jewish|atheist)\b/,
  /\bwhat('?s| is) (ur|your|u) (religion|caste|nationality|age|zodiac)\b/,
];
const SMALL_TALK_RESPONSE =
  "I'm the Zentrix Technology chatbot 🤖 — here to help with courses, internships, and services. " +
  `For anything else, reach our team directly: ${CONTACT_PHONE} or ${CONTACT_EMAIL}`;

const FEE_FALLBACK_RESPONSE =
  "• Internship training is merit-based with free access to live projects.\n" +
  "• For specific course fee structures or offers, please click 'Apply Now' or connect via WhatsApp.";

const hasFeeKeyword = (input) =>
  /\b(fee|fees|cost|pricing|price)\b/i.test(input);

const hasDirectFeeQuote = (response) =>
  /(?:₹|rs\.?|inr|\$|€|£)\s*[\d,]+|\b(?:fee|fees|cost|price|pricing)\b[^.\n]{0,24}\b\d[\d,]*/i.test(response);

const isCourseCardDescription = (intent, input) =>
  intent.collection === "courses" &&
  /\b(course|courses|program|programs)\b/i.test(input);

const conciseBullets = (responses) => {
  const sentences = responses
    .flatMap((response) => response.split(/(?<=[.!?])\s+|\n+/))
    .map((sentence) => sentence.replace(/^[•*-]\s*/, "").trim())
    .filter(Boolean);

  const uniqueSentences = [];
  for (const sentence of sentences) {
    const normalized = sentence.toLowerCase();
    if (!uniqueSentences.some((item) => item.toLowerCase() === normalized)) {
      uniqueSentences.push(sentence);
    }
  }

  return uniqueSentences
    .slice(0, 3)
    .map((sentence) => {
      const conciseSentence = sentence.length > 180
        ? `${sentence.slice(0, 177).trimEnd()}...`
        : sentence;
      return `• ${conciseSentence}`;
    })
    .join("\n");
};

export const getFirestoreResponse = async (userInput) => {
  await loadIntentsFromFirestore(); // Just in case it's not loaded

  const lower = userInput.toLowerCase().trim();
  if (!lower) return FALLBACK_RESPONSES[0];

  const cleanInput = lower.replace(/[^\w\s]/g, "").trim();
  const inputWords = cleanInput.split(/\s+/).filter(Boolean);
  const normWords = inputWords.map(normalizeElongated);
  const normInput = normWords.join(" ");

  // 1. Greeting check — handles "h", "hi", "hello", stretched letters
  // ("helloooo", "heyyy"), and multi-word greetings ("good morning").
  if (
    GREETINGS.includes(normInput) ||
    (normWords.length === 1 && GREETINGS.includes(normWords[0])) ||
    normWords.some((w) => GREETINGS.includes(w) && w !== "good")
  ) {
    return GREETING_RESPONSE;
  }

  // 1b. Small-talk / personal questions ("are you free", "your name?", etc.)
  if (SMALL_TALK_PATTERNS.some((re) => re.test(lower))) {
    return SMALL_TALK_RESPONSE;
  }

  // 2. Prevent single/2-character non-greetings from matching arbitrary substrings
  if (cleanInput.length < 3) {
    for (const intent of INTENTS) {
      for (const kw of intent.keywords) {
        if (kw.toLowerCase().trim() === cleanInput) {
          return intent.response;
        }
      }
    }
    return FALLBACK_RESPONSES[0];
  }

  // Expand shorthand ("biz dev" -> "business development") before word-level
  // work, then stem each word so plurals/gerunds line up with keyword forms.
  const expandedInput = expandShorthand(normWords.join(" "));
  const expandedWords = expandedInput.split(/\s+/).filter(Boolean);

  // Real signal words only — drop stop words (including domain stopwords
  // like "course"/"program") and tiny tokens so long questions don't rack
  // up score in unrelated intents just from filler or generic domain nouns.
  const signalWords = expandedWords.filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
  const stemmedSignalWords = signalWords.map(stem);

  // Rarity weight: a keyword shared by many intents is a weak signal
  // ("process", "course"); a keyword unique to one or two intents is a
  // strong signal. This stops generic-but-common keywords from winning
  // just because the question is long and touches many topics.
  const keywordDocFreq = new Map();
  for (const intent of INTENTS) {
    const seen = new Set();
    for (const kwRaw of intent.keywords) {
      const kw = kwRaw.toLowerCase().trim();
      if (kw && !seen.has(kw)) {
        seen.add(kw);
        keywordDocFreq.set(kw, (keywordDocFreq.get(kw) || 0) + 1);
      }
    }
  }
  const rarityWeight = (kw) => {
    const df = keywordDocFreq.get(kw) || 1;
    return df <= 1 ? 3 : df <= 3 ? 1.5 : 1 / Math.log2(df + 1);
  };

  const scored = []; // {intent, score}

  for (const intent of INTENTS) {
    let score = 0;
    for (const kwRaw of intent.keywords) {
      const kw = kwRaw.toLowerCase().trim();
      if (!kw) continue;
      const w = rarityWeight(kw);

      // Exact full query match — strongest possible signal
      if (cleanInput === kw || expandedInput === kw) {
        score += 30 * w;
        continue;
      }

      // Word-level matches, signal words only: exact, then stemmed/fuzzy.
      const kwWords = kw.split(/\s+/).filter(Boolean);
      const kwWordsStemmed = kwWords.map(stem);
      for (let idx = 0; idx < signalWords.length; idx++) {
        const word = signalWords[idx];
        const stemmedWord = stemmedSignalWords[idx];
        if (kwWords.includes(word)) {
          score += 10 * w;
        } else if (kwWordsStemmed.includes(stemmedWord)) {
          score += 8 * w; // stemmed match, slightly weaker than exact
        } else if (word.length >= 4 && kw.includes(word)) {
          score += 5 * w;
        } else if (
          word.length >= 5 &&
          kwWords.some((kww) => fuzzyWordMatch(word, kww))
        ) {
          score += 6 * w; // typo-tolerant match, between exact and substring
        } else if (
          word.length === 4 &&
          kwWords.some((kww) => kww.length === 4 && levenshtein(word, kww) === 1)
        ) {
          score += 6 * w; // 4-letter words: stricter distance=1 only, avoids false collisions ("marn" -> "mern")
        }
      }

      // Phrase containment match (only for phrases >= 3 chars). This is
      // intentionally NOT filtered by the domain stoplist — a query like
      // "course duration" or "which course is good" should still match a
      // keyword phrase like "course duration" or "which course" as a
      // whole unit, since that's a deliberate exact phrase in the data,
      // not an accidental single-word collision.
      if (kw.length >= 3 && cleanInput.length >= 3) {
        if (cleanInput.includes(kw) || expandedInput.includes(kw)) {
          score += kwWords.length * 8 * w;
        } else if (kw.includes(cleanInput)) {
          score += (cleanInput.length > 5 ? 6 : 3) * w;
        }
      }
    }
    if (score > 0) scored.push({ intent, score });
  }

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  // Keep only meaningful matches, then combine the strongest few answers.
  // The relative cutoff prevents a weak generic hit from being appended to
  // otherwise relevant answers for a multi-part question.
  const MIN_SCORE = 6;
  const relevantMatches = best
    ? scored.filter(
        ({ score }) => score >= MIN_SCORE && score >= best.score * 0.35
      )
    : [];

  if (relevantMatches.length > 0) {
    const feeRequested = hasFeeKeyword(lower);
    const directFeeMatch = relevantMatches.some(({ intent }) => hasDirectFeeQuote(intent.response));
    const filteredMatches = relevantMatches.filter(({ intent }) =>
      !isCourseCardDescription(intent, lower) || (feeRequested && hasDirectFeeQuote(intent.response))
    );
    const responses = filteredMatches.slice(0, 3).map(({ intent }) => intent.response).filter(Boolean);

    if (feeRequested && !directFeeMatch) {
      return FEE_FALLBACK_RESPONSE;
    }

    if (responses.length > 0) {
      return conciseBullets(responses);
    }
  }

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
};