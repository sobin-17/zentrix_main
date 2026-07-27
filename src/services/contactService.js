import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const contactRef = collection(db, "contactMessages");

export const addContactMessage = async (data) => {
  const docRef = await addDoc(contactRef, {
    ...data,
    status: "New",
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
};

export const getContactMessages = async () => {
  const snapshot = await getDocs(contactRef);

  const messages = snapshot.docs.map(doc => ({
    firestoreId: doc.id,
    ...doc.data(),
  }));

  const getTimestamp = (msg) => {
    const raw = msg.createdAt || msg.submittedAt || msg.date || msg.timestamp;
    if (!raw) return 0;
    if (typeof raw === 'object' && raw.seconds) {
      return raw.seconds * 1000;
    }
    const parsed = new Date(raw).getTime();
    return isNaN(parsed) ? 0 : parsed;
  };

  return messages.sort((a, b) => getTimestamp(b) - getTimestamp(a));
};

export const updateContactMessageStatus = async (id, status) => {
  if (!id) return;
  await updateDoc(doc(db, "contactMessages", id), { status });
};

export const deleteContactMessage = async (id) => {
  await deleteDoc(doc(db, "contactMessages", id));
};