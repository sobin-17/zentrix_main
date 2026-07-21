import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "../firebase";
  
  export const addCareer = async (career) => {
    return await addDoc(collection(db, "careers"), career);
  };
  
  export const getCareers = async () => {
    const snapshot = await getDocs(collection(db, "careers"));
  
    return snapshot.docs.map((d) => ({
      firestoreId: d.id,
      ...d.data(),
    }));
  };
  
  export const updateCareer = async (firestoreId, data) => {
    const { firestoreId: _, ...careerData } = data;
  
    await updateDoc(doc(db, "careers", firestoreId), careerData);
  };
  
  export const deleteCareer = async (firestoreId) => {
    await deleteDoc(doc(db, "careers", firestoreId));
  };