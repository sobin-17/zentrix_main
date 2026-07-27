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
  
    const enrollments = snapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }));

    const getTimestamp = (e) => {
      const raw = e.createdAt || e.enrolledDate || e.date || e.timestamp;
      if (!raw) return 0;
      if (typeof raw === 'object' && raw.seconds) return raw.seconds * 1000;
      const parsed = new Date(raw).getTime();
      return isNaN(parsed) ? 0 : parsed;
    };

    return enrollments.sort((a, b) => getTimestamp(b) - getTimestamp(a));
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