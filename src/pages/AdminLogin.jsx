import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // 1. Firebase Authentication checks email + password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      console.log("Authenticated UID:", user.uid);

      // 2. Get admin document using Firebase Auth UID
      const adminRef = doc(db, "admins", user.uid);
      const adminSnap = await getDoc(adminRef);

      // 3. Admin document must exist
      if (!adminSnap.exists()) {
        await signOut(auth);

        setError(
          "This account is not registered as an administrator."
        );

        return;
      }

      // 4. Check admin role
      const adminData = adminSnap.data();

      if (adminData.role !== "admin") {
        await signOut(auth);

        setError("Admin access denied.");

        return;
      }

      // 5. Successful login
      navigate("/admin-dashboard", { replace: true });

    } catch (err) {
      console.error("Admin login error:", err);

      switch (err.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Check your internet connection.");
          break;

        case "permission-denied":
          setError(
            "Login succeeded, but Firestore denied access to the admin profile."
          );
          break;

        default:
          setError(err.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full" />

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
      >
        <div className="text-center mb-10">

          <img
            src="/logo5_transparent.png"
            alt="Zentrix Technology"
            className="h-16 mx-auto mb-6"
          />

          <h1 className="text-4xl font-bold text-white">
            Admin Login
          </h1>

          <p className="text-gray-400 mt-2">
            Zentrix Dashboard
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/20 border border-red-500 text-red-300 px-4 py-3">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="text-gray-300 text-sm mb-2 block">
            Email
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">
            <Mail className="w-5 h-5 text-purple-400" />

            <input
              type="email"
              placeholder="admin@zentrixtechnology.com"
              className="w-full bg-transparent outline-none px-3 py-4 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="text-gray-300 text-sm mb-2 block">
            Password
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">
            <Lock className="w-5 h-5 text-purple-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent outline-none px-3 py-4 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1"
            >
              {showPassword ? (
                <EyeOff className="text-gray-400" />
              ) : (
                <Eye className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold flex justify-center items-center gap-2 hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Signing In...
            </>
          ) : (
            "Login"
          )}
        </button>

      </form>
    </div>
  );
};

export default AdminLogin;