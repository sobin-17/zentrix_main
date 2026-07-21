import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyA1OzA1ZtxH7GjLXEedprCcZ0TygydRSew",
  authDomain: "zentrix-chatbot.firebaseapp.com",
  projectId: "zentrix-chatbot",
  storageBucket: "zentrix-chatbot.firebasestorage.app",
  messagingSenderId: "393836114544",
  appId: "1:393836114544:web:944112633e14d79a41bab5",
  measurementId: "G-BEV82V9E7R"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
