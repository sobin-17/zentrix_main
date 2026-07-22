import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
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

    setLoading(true);
    setError("");

    try {
      // Login with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Check if the user is an admin
      const adminRef = doc(db, "admins", user.uid);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        await auth.signOut();
        setError("You are not authorized to access the admin dashboard.");
        return;
      }

      // Optional: verify role field
      const adminData = adminSnap.data();

      if (adminData.role !== "admin") {
        await auth.signOut();
        setError("Admin access denied.");
        return;
      }

      // Success
      navigate("/admin-dashboard");

    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/user-not-found":
          setError("User not found.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Check your internet connection.");
          break;

        default:
          setError(err.message);
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
            alt="logo"
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
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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