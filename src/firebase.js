import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAvBFDbUbD9X5IljQBnMIpsl1DCtdmD_-s",
  authDomain: "zentrix-e7f63-5a3d1.firebaseapp.com",
  projectId: "zentrix-e7f63-5a3d1",
  storageBucket: "zentrix-e7f63-5a3d1.firebasestorage.app",
  messagingSenderId: "701823584761",
  appId: "1:701823584761:web:72ac457cbbf55d9fa7d528",
  measurementId: "G-GY3RZLK705"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);

export default app;

// Analytics only works in browser
if (typeof window !== "undefined") {
  getAnalytics(app);
}