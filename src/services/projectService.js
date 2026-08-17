import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Seed projects — used ONLY when Firestore collection is empty (fallback display)
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
// In-memory cache — survives React re-renders, resets on full page reload
let inMemoryCache = null;

// ── Deduplication helper ─────────────────────────────────────────────────
// Keeps the first occurrence of each project by (lowercased) title
const deduplicateProjects = (list) => {
  const seen = new Set();
  return list.filter(p => {
    const key = (p.title || p.id || p.firestoreId || "").toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// ── Cache read — returns data instantly (<1 ms) ──────────────────────────
// Returns only Firestore-sourced data. Seeds are NEVER merged in here.
export const getCachedProjects = () => {
  if (inMemoryCache && inMemoryCache.length > 0) return inMemoryCache;
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryCache = deduplicateProjects(parsed);
        return inMemoryCache;
      }
    }
  } catch (e) {}
  return null; // No cache yet
};

// ── Cache write ──────────────────────────────────────────────────────────
const setCachedProjects = (data) => {
  inMemoryCache = data;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (e) {}
};

// ── Cache clear ──────────────────────────────────────────────────────────
export const clearProjectsCache = () => {
  inMemoryCache = null;
  try { localStorage.removeItem(CACHE_KEY); } catch (e) {}
};

// ── Stale-While-Revalidate fetch ─────────────────────────────────────────
// 1. Returns cached data INSTANTLY if available (no wait)
// 2. Fetches fresh data from Firestore in background
// 3. Calls onFresh(freshData) when Firestore responds — component can update
export const getProjects = async ({ onFresh } = {}) => {
  const cached = getCachedProjects();

  // Kick off background Firestore fetch
  const fetchFresh = async () => {
    try {
      const projectsCol = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(projectsCol);

      if (!snapshot.empty) {
        const fetched = snapshot.docs.map((docSnap) => ({
          firestoreId: docSnap.id,
          ...docSnap.data()
        }));

        // Sort newest first
        fetched.sort((a, b) => {
          const tA = a.createdAt?.toMillis?.() || (typeof a.createdAt === 'number' ? a.createdAt : 0);
          const tB = b.createdAt?.toMillis?.() || (typeof b.createdAt === 'number' ? b.createdAt : 0);
          return tB - tA;
        });

        const unique = deduplicateProjects(fetched);
        setCachedProjects(unique);
        return unique;
      }

      // Firestore empty — seeds are fallback (NOT cached so they re-check next time)
      return DEFAULT_SEED_PROJECTS;
    } catch (error) {
      console.warn("Firestore fetch error, using local cache:", error);
      return cached || DEFAULT_SEED_PROJECTS;
    }
  };

  if (cached && cached.length > 0) {
    // Return cache immediately, then revalidate in background
    fetchFresh().then(fresh => {
      if (typeof onFresh === 'function') onFresh(fresh);
    });
    return cached;
  }

  // No cache — wait for Firestore
  return await fetchFresh();
};

// ── Create ───────────────────────────────────────────────────────────────
export const createProject = async (projectData) => {
  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const payload = { ...projectData, createdAt: Date.now(), updatedAt: Date.now() };
    const docRef = await addDoc(projectsCol, payload);
    const newProject = { firestoreId: docRef.id, ...payload };

    const current = getCachedProjects() || [];
    setCachedProjects(deduplicateProjects([newProject, ...current]));
    return newProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// ── Update ───────────────────────────────────────────────────────────────
export const updateProject = async (firestoreId, projectData) => {
  try {
    if (!firestoreId) throw new Error("Missing firestoreId for update");
    const projectRef = doc(db, COLLECTION_NAME, firestoreId);
    const payload = { ...projectData, updatedAt: Date.now() };
    await updateDoc(projectRef, payload);
    const updatedProject = { firestoreId, ...payload };

    const current = getCachedProjects() || [];
    const updated = current.map(p =>
      (p.firestoreId === firestoreId || p.id === projectData.id) ? updatedProject : p
    );
    setCachedProjects(updated);
    return updatedProject;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// ── Delete ───────────────────────────────────────────────────────────────
export const deleteProject = async (firestoreId) => {
  try {
    if (!firestoreId) return;
    const projectRef = doc(db, COLLECTION_NAME, firestoreId);
    await deleteDoc(projectRef);

    const current = getCachedProjects() || [];
    setCachedProjects(current.filter(p => p.firestoreId !== firestoreId));
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
