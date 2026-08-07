import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
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
  },
  {
    id: "rijoe-pro",
    title: "RIJOE PRO PROJECT",
    subtitle: "Enterprise ERP · Professional Suite",
    category: "Enterprise ERP",
    image: "/abijoe furniture.png",
    overview: "An advanced enterprise management & operations platform designed for streamlined workflow automation, real-time tracking, billing, and intelligent business analytics.",
    description: "An advanced enterprise management & operations platform designed for streamlined workflow automation, real-time tracking, billing, and intelligent business analytics.",
    status: "Completed",
    progress: "100%",
    technologies: ["React.js", "Node.js", "MySQL", "Tailwind CSS"],
    modulesCount: "8 Modules",
    pagesCount: "35+ Pages",
    apisCount: "45+ APIs",
    tablesCount: "18+ Tables",
    client: "Rijoe Pro",
    year: "2026",
    liveLink: "/portfolio/rijoe-pro",
    features: [
      "Smart Business Operations Dashboard",
      "Automated Invoicing & Financial Accounting",
      "Role-based User Access & Audit Logs",
      "Real-time Data Analytics & Custom Reporting",
      "Cloud Database Integration & High-Speed API Engine"
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
const CACHE_KEY = "zentrix_projects_cache";
let inMemoryCache = null;

// Read local cache instantly (<1ms)
export const getCachedProjects = () => {
  if (inMemoryCache && inMemoryCache.length > 0) return inMemoryCache;
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const merged = [...parsed];
        DEFAULT_SEED_PROJECTS.forEach(seed => {
          if (!merged.some(p => p.id === seed.id)) {
            merged.push(seed);
          }
        });
        inMemoryCache = merged;
        return inMemoryCache;
      }
    }
  } catch (e) {}
  return DEFAULT_SEED_PROJECTS;
};

// Save cache locally
const setCachedProjects = (data) => {
  inMemoryCache = data;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// High-speed Stale-While-Revalidate fetch (<2ms response)
export const getProjects = async () => {
  const fetchPromise = (async () => {
    try {
      const projectsCol = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(projectsCol);
      
      if (!snapshot.empty) {
        const fetched = snapshot.docs.map((docSnap) => ({
          firestoreId: docSnap.id,
          ...docSnap.data()
        }));
        
        // Client-side sort by createdAt descending
        fetched.sort((a, b) => {
          const tA = a.createdAt?.toMillis?.() || (typeof a.createdAt === 'number' ? a.createdAt : 0);
          const tB = b.createdAt?.toMillis?.() || (typeof b.createdAt === 'number' ? b.createdAt : 0);
          return tB - tA;
        });

        setCachedProjects(fetched);
        return fetched;
      }
      setCachedProjects(DEFAULT_SEED_PROJECTS);
      return DEFAULT_SEED_PROJECTS;
    } catch (error) {
      console.warn("Firestore fetch error, using local cache:", error);
      return getCachedProjects();
    }
  })();

  // Instant SWR cache hit
  const cached = getCachedProjects();
  if (cached && cached.length > 0) {
    return cached;
  }

  return await fetchPromise;
};

// Create a new portfolio project with instant cache update
export const createProject = async (projectData) => {
  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const payload = {
      ...projectData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const docRef = await addDoc(projectsCol, payload);
    const newProject = { firestoreId: docRef.id, ...payload };
    
    const current = getCachedProjects();
    const updated = [newProject, ...current.filter(p => p.id !== newProject.id)];
    setCachedProjects(updated);

    return newProject;
  } catch (error) {
    console.error("Error creating project in Firestore:", error);
    throw error;
  }
};

// Update an existing portfolio project with instant cache update
export const updateProject = async (firestoreId, projectData) => {
  try {
    if (!firestoreId) throw new Error("Missing firestoreId for update");
    const projectRef = doc(db, COLLECTION_NAME, firestoreId);
    const payload = {
      ...projectData,
      updatedAt: Date.now()
    };
    await updateDoc(projectRef, payload);
    const updatedProject = { firestoreId, ...payload };

    const current = getCachedProjects();
    const updated = current.map(p => (p.firestoreId === firestoreId || p.id === projectData.id) ? updatedProject : p);
    setCachedProjects(updated);

    return updatedProject;
  } catch (error) {
    console.error("Error updating project in Firestore:", error);
    throw error;
  }
};

// Delete a portfolio project with instant cache update
export const deleteProject = async (firestoreId) => {
  try {
    if (!firestoreId) return;
    const projectRef = doc(db, COLLECTION_NAME, firestoreId);
    await deleteDoc(projectRef);

    const current = getCachedProjects();
    const updated = current.filter(p => p.firestoreId !== firestoreId);
    setCachedProjects(updated);
  } catch (error) {
    console.error("Error deleting project in Firestore:", error);
    throw error;
  }
};
