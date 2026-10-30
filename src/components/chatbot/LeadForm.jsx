import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { chatbotDb } from "./localNLP";
import "./LeadForm.css";

const LeadForm = ({ onSubmit, onSkip }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interestedCourse: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.name === "phone"
      ? e.target.value.replace(/\D/g, "").slice(0, 10)
      : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const interestedCourse = form.interestedCourse.trim();

    if (!name || !email || !phone || !interestedCourse) {
      setError("Name, email, phone number, and interested course are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(chatbotDb, "leads"), {
        name,
        email,
        phone,
        location: form.location || "",
        interestedCourse,
        timestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => onSubmit({ ...form, name, email, phone, interestedCourse }), 700);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zx-lead-form">
      {success ? (
        <p className="zx-lead-success">Done. Thank you!</p>
      ) : (
        <>
          <p className="zx-lead-intro">Before we continue, let us know who you are 👇</p>
          <form onSubmit={handleSubmit}>
            <input className="zx-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            <input className="zx-input" type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
            <input className="zx-input" type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} inputMode="numeric" maxLength={10} required />
            <input className="zx-input" type="text" name="location" placeholder="Your location (optional)" value={form.location} onChange={handleChange} />
            <select className="zx-input zx-course-select" name="interestedCourse" value={form.interestedCourse} onChange={handleChange} required>
              <option value="" disabled>Interested course</option>
              <option>Full Stack Development</option>
              <option>UI / UX Design</option>
              <option>Data Analytics</option>
              <option>Data Science &amp; Machine Learning</option>
              <option>Artificial Intelligence</option>
              <option>Digital Marketing</option>
            </select>
            {error && <p className="zx-lead-error">{error}</p>}
            <button className="zx-lead-submit" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Start Chatting →"}
            </button>
            <button className="zx-lead-skip" type="button" onClick={onSkip} disabled={loading}>Skip for now</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LeadForm;
