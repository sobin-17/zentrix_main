import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  
  import { db } from "../firebase";
  
  const courseRef = collection(db, "courses");
  
  // Add Course
  export const addCourse = async (course) => {
    const docRef = await addDoc(courseRef, course);
    return docRef.id;
  };
  
  // Get All Courses
  export const getCourses = async () => {
    const snapshot = await getDocs(courseRef);
  
    return snapshot.docs.map((document) => ({
      firestoreId: document.id, // Firestore document ID
      ...document.data(),        // keeps your own id (mern-stack, ZTAI0001)
    }));
  };
  
  // Update Course
  export const updateCourse = async (firestoreId, data) => {
    const { firestoreId: _, ...courseData } = data;
  
    await updateDoc(
      doc(db, "courses", firestoreId),
      courseData
    );
  };
  
  // Delete Course
  export const deleteCourse = async (firestoreId) => {
    await deleteDoc(
      doc(db, "courses", firestoreId)
    );
  };