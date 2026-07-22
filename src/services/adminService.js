import { db, auth } from "../firebase";
import app from "../firebase";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
} from "firebase/auth";

const adminsRef = collection(db, "admins");

// Fetch all registered admin accounts
export const getAdmins = async () => {
  try {
    const snapshot = await getDocs(adminsRef);
    return snapshot.docs.map((d) => ({
      firestoreId: d.id,
      ...d.data(),
    }));
  } catch (err) {
    console.error("Error fetching admins:", err);
    return [];
  }
};

// Create a new Admin without logging out the currently logged in admin
export const createAdminAccount = async ({ name, email, password }) => {
  // Use a secondary app instance so current admin session remains logged in
  const secondaryApp = initializeApp(app.options, `AdminCreation_${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  const userCredential = await createUserWithEmailAndPassword(
    secondaryAuth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, "admins", uid), {
    uid,
    name,
    email,
    role: "admin",
    createdAt: new Date().toISOString(),
  });

  return { uid, name, email };
};

// Delete an admin document from Firestore
export const deleteAdminAccount = async (adminId) => {
  if (!adminId) return;
  await deleteDoc(doc(db, "admins", adminId));
};

// Re-authenticate current admin with OLD password and update to NEW password / email
export const updateCurrentAdminPassword = async ({ oldPassword, newPassword, newEmail }) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No active admin user logged in. Please log in again.");
  }

  if (!oldPassword || !oldPassword.trim()) {
    throw new Error("Old password is required to verify your identity.");
  }

  const cleanOldPassword = oldPassword.trim();
  const cleanEmail = (user.email || "").trim();

  // 1. Verify old password against Firebase Auth using a fresh secondary auth instance
  const verifyAppName = `AuthVerify_${Date.now()}`;
  const verifyApp = initializeApp(app.options, verifyAppName);
  const verifyAuth = getAuth(verifyApp);
  
  let isPasswordValid = false;
  try {
    await signInWithEmailAndPassword(verifyAuth, cleanEmail, cleanOldPassword);
    isPasswordValid = true;
  } catch (verifyErr) {
    console.warn("Secondary auth signin failed, trying primary reauthenticate:", verifyErr);
    try {
      const cred = EmailAuthProvider.credential(cleanEmail, cleanOldPassword);
      await reauthenticateWithCredential(user, cred);
      isPasswordValid = true;
    } catch (reauthErr) {
      console.error("Both verification attempts failed:", reauthErr);
      throw reauthErr;
    }
  }

  if (!isPasswordValid) {
    throw new Error("Old password verification failed.");
  }

  // 2. Re-authenticate main user session for credential updates
  try {
    const cred = EmailAuthProvider.credential(cleanEmail, cleanOldPassword);
    await reauthenticateWithCredential(user, cred);
  } catch (e) {
    console.log("Main session re-auth note:", e);
  }

  // 3. Update Password if provided
  if (newPassword && newPassword.trim().length >= 6) {
    await updatePassword(user, newPassword.trim());
  }

  // 4. Update Email if provided & changed
  if (newEmail && newEmail.trim().toLowerCase() !== cleanEmail.toLowerCase()) {
    const cleanNewEmail = newEmail.trim();
    await updateEmail(user, cleanNewEmail);
    // Update firestore document
    await updateDoc(doc(db, "admins", user.uid), {
      email: cleanNewEmail,
    });
  }

  return true;
};

// Update another admin account details in Firestore
export const updateOtherAdminAccount = async ({ adminId, name, email }) => {
  if (!adminId) return;

  const updates = {
    updatedAt: new Date().toISOString(),
  };
  if (name) updates.name = name;
  if (email) updates.email = email;

  await updateDoc(doc(db, "admins", adminId), updates);
  return true;
};
