import { useState } from "react";
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Save admin details in Firestore
      await setDoc(doc(db, "admins", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: form.name,
        email: form.email,
        role: "admin",
        createdAt: new Date().toISOString(),
      });

      alert("Admin account created successfully!");

      navigate("/admin-login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-6">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Signup
        </h2>

        {error && (
          <p className="bg-red-500/20 text-red-300 p-3 rounded mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-gray-600 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-gray-600 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-gray-600 text-white"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded bg-black/30 border border-gray-600 text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded text-white font-semibold"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;