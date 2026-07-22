import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const adminDoc = await getDoc(doc(db, "admins", user.uid));

        if (
          adminDoc.exists() &&
          adminDoc.data().role === "admin"
        ) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error(error);
        setAuthorized(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;