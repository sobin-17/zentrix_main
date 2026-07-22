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

  return snapshot.docs.map(doc => ({
    firestoreId: doc.id,
    ...doc.data(),
  }));
};

export const updateContactMessageStatus = async (id, status) => {
  if (!id) return;
  await updateDoc(doc(db, "contactMessages", id), { status });
};

export const deleteContactMessage = async (id) => {
  await deleteDoc(doc(db, "contactMessages", id));
};