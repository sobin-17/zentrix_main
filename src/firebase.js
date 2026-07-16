import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgdNPJWz7rsN0SmPgSP9uJRf3Ew1jgURI",
  authDomain: "zentrix-e7f63.firebaseapp.com",
  projectId: "zentrix-e7f63",
  storageBucket: "zentrix-e7f63.firebasestorage.app",
  messagingSenderId: "456702623824",
  appId: "1:456702623824:web:ba8ead64a9ad65d73a9155",
  measurementId: "G-9RJMKVT6NQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
