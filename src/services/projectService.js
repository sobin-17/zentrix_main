import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

export const DEFAULT_SEED_PROJECTS = [
  {
    id: "abijoefurniture-erp",
    title: "ABIJOE FURNITURE ERP PROJECT",
    subtitle: "Enterprise ERP · Furniture Industry",
    category: "Enterprise ERP",
    image: "/abijoe furniture.png",
    overview: "A complete ERP solution for furniture manufacturers and retailers to manage billing, accounting, inventory, attendance, reports, GST, and business operations from a single platform.",
    description: "A complete ERP solution for furniture manufacturers and retailers to manage billing, accounting, inventory, attendance, reports, GST, and business operations from a single platform.",
    status: "In Development",
    progress: "70%",
    technologies: ["React.js", "Python Flask", "MySQL", "Tailwind CSS"],
    modulesCount: "7 Modules",
    pagesCount: "40+ Pages",
    apisCount: "50+ APIs",
    tablesCount: "20+ Tables",
    client: "AbiJoe Furniture",
    year: "2026",
    liveLink: "/portfolio/abijoefurniture-erp",
    features: [
      "Multi-branch Billing & Invoicing Engine",
      "Real-time Inventory & Stock Tracking",
      "Staff Attendance & Payroll Automation",
      "GST Return Filing & Accounting Reports",
      "Automated Sales & Analytics Dashboard"
    ],
    screenshots: [
      { label: "Dashboard Overview", src: "/DASHBOARD.jpeg" },
      { label: "Billing & Invoicing", src: "/BILLING.jpeg" },
      { label: "Inventory Management", src: "/INVENTORY.jpeg" },
      { label: "Accounting Ledger", src: "/ACCOUNTING.jpeg" },
      { label: "Masters Management", src: "/MASTERS.jpeg" },
      { label: "Reports & Analytics", src: "/REPORTS.jpeg" },
      { label: "System Settings", src: "/SETTINGS.jpeg" }
    ]
  }
];

const COLLECTION_NAME = "projects";

// Fetch all portfolio projects from Firestore
export const getProjects = async () => {
  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const q = query(projectsCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => ({
        firestoreId: docSnap.id,
        ...docSnap.data()
      }));
    }

    return DEFAULT_SEED_PROJECTS;
  } catch (error) {
    console.warn("Firestore fetch projects failed, using seed fallbacks:", error);
    return DEFAULT_SEED_PROJECTS;
  }
};

// Create a new portfolio project
export const createProject = async (projectData) => {
  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const payload = {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(projectsCol, payload);
    return { firestoreId: docRef.id, ...payload };
  } catch (error) {
    console.error("Error creating project in Firestore:", error);
    throw error;
  }
};

// Update an existing portfolio project
export const updateProject = async (firestoreId, projectData) => {
  try {
    if (!firestoreId) throw new Error("Missing firestoreId for update");
    const projectRef = doc(db, COLLECTION_NAME, firestoreId);
    const payload = {
      ...projectData,
      updatedAt: serverTimestamp()
    };
    await updateDoc(projectRef, payload);
    return { firestoreId, ...payload };
  } catch (error) {
    console.error("Error updating project in Firestore:", error);
    throw error;
  }
};

// Delete a portfolio project
export const deleteProject = async (firestoreId) => {
  try {
    if (!firestoreId) return;
    const projectRef = doc(db, COLLECTION_NAME, firestoreId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting project in Firestore:", error);
    throw error;
  }
};
