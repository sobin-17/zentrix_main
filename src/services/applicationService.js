import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";
  
  export const addApplication = async (data) => {
    return await addDoc(collection(db, "applications"), data);
  };
  
  export const getApplications = async () => {
    const snapshot = await getDocs(collection(db, "applications"));
  
    return snapshot.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data(),
    }));
  };
  
  export const deleteApplication = async (id) => {
    await deleteDoc(doc(db, "applications", id));
  };
  
  export const updateApplicationStatus = async (id, status) => {
    const docRef = doc(db, "applications", id);
    await updateDoc(docRef, { status });
  };