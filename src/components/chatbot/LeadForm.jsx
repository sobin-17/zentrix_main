import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { chatbotDb } from "./localNLP";
import "./LeadForm.css";

const LeadForm = ({ onSubmit, onSkip }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(chatbotDb, "leads"), {
        name: form.name,
        email: form.email,
        phone: form.phone || "",
        location: form.location || "",
        createdAt: serverTimestamp(),
      });
      onSubmit(form.name);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zx-lead-form">
      <p className="zx-lead-intro">
        Before we continue, let us know who you are 👇
      </p>
      <form onSubmit={handleSubmit}>
        <input
          className="zx-input"
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="zx-input"
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="zx-input"
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          className="zx-input"
          type="text"
          name="location"
          placeholder="Your location (optional)"
          value={form.location}
          onChange={handleChange}
        />
        {error && <p className="zx-lead-error">{error}</p>}
        <button className="zx-lead-submit" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Start Chatting →"}
        </button>
        <button
          className="zx-lead-skip"
          type="button"
          onClick={onSkip}
          disabled={loading}
        >
          Skip for now
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
