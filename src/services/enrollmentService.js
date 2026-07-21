import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";
  
  const enrollRef = collection(db, "enrollments");
  
  // Add Enrollment
  export const addEnrollment = async (data) => {
    await addDoc(enrollRef, {
      ...data,
      status: "New",
      createdAt: new Date(),
    });
  };
  
  // Get Enrollments
  export const getEnrollments = async () => {
    const snapshot = await getDocs(enrollRef);
  
    return snapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }));
  };
  
  // Update Enrollment Status
  export const updateEnrollmentStatus = async (firestoreId, status) => {
    const docRef = doc(db, "enrollments", firestoreId);
  
    await updateDoc(docRef, {
      status,
    });
  };
  
  // Delete Enrollment (optional but recommended)
  export const deleteEnrollment = async (firestoreId) => {
    await deleteDoc(doc(db, "enrollments", firestoreId));
  };