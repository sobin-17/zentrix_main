import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return setError("Please fill all fields.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      await setDoc(
        doc(db, "admins", userCredential.user.uid),
        {
          uid: userCredential.user.uid,
          name: form.name,
          email: form.email,
          role: "admin",
          createdAt: new Date().toISOString(),
        }
      );

      alert("Admin account created successfully!");

      navigate("/admin-login");
    } catch (err) {
      setError(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden relative">

      {/* Glow */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[180px] rounded-full" />

      <form
        onSubmit={handleSignup}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
      >
        <div className="text-center mb-8">

          <img
            src="/logo5_transparent.png"
            alt="logo"
            className="h-16 mx-auto mb-5"
          />

          <h1 className="text-4xl font-bold text-white">
            Admin Signup
          </h1>

          <p className="text-gray-400 mt-2">
            Create Zentrix Admin Account
          </p>

        </div>

        {error && (
          <div className="mb-5 bg-red-500/20 border border-red-500 rounded-xl px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {/* Name */}

        <div className="mb-5">

          <label className="text-sm text-gray-300 block mb-2">
            Full Name
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">

            <User className="w-5 h-5 text-purple-400" />

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-transparent outline-none px-3 py-4 text-white"
            />

          </div>

        </div>

        {/* Email */}

        <div className="mb-5">

          <label className="text-sm text-gray-300 block mb-2">
            Email
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">

            <Mail className="w-5 h-5 text-purple-400" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@zentrixtechnology.com"
              className="w-full bg-transparent outline-none px-3 py-4 text-white"
            />

          </div>

        </div>

        {/* Password */}

        <div className="mb-5">

          <label className="text-sm text-gray-300 block mb-2">
            Password
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">

            <Lock className="w-5 h-5 text-purple-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent outline-none px-3 py-4 text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff className="text-gray-400" />
              ) : (
                <Eye className="text-gray-400" />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div className="mb-8">

          <label className="text-sm text-gray-300 block mb-2">
            Confirm Password
          </label>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4">

            <Lock className="w-5 h-5 text-purple-400" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none px-3 py-4 text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
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
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Creating...
            </>
          ) : (
            "Create Admin Account"
          )}
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/admin-login")}
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            Login
          </button>
        </p>

      </form>
    </div>
  );
};

export default AdminSignup;