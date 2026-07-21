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

const FALLBACK_RESPONSES = [
  "I'm not sure about that. Could you try asking about our Courses, Internships, Services, Placement, or Contact details?",
  "That's a bit outside my knowledge right now. For specific questions, our team is available at:\n📧 hr.zentrixtechnology@gmail.com\n📞 +91 938423728",
];

const GREETINGS = ["hi", "hello", "hey", "hai", "good morning", "good evening", "howdy"];
const GREETING_RESPONSE = "Hello! 👋 Welcome to Zentrix Technology. How can I help you today?";

export const getFirestoreResponse = async (userInput) => {
  await loadIntentsFromFirestore(); // Just in case it's not loaded
  
  const lower = userInput.toLowerCase().trim();
  if (!lower) return FALLBACK_RESPONSES[0];

  // Hardcoded greeting check
  if (GREETINGS.includes(lower) || lower.split(" ").some(w => GREETINGS.includes(w) && w !== "good")) {
    return GREETING_RESPONSE;
  }

  let bestIntent = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (lower.includes(kw) || kw.includes(lower)) {
        // Boost exact matches
        if (lower === kw) score += 10;
        else score += kw.split(" ").length * 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && bestScore > 0) {
    return bestIntent.response;
  }

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
};
