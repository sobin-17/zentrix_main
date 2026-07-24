import { useState } from "react";
import "./CourseCards.css";

// ── All Zentrix courses hardcoded — no Firestore needed ───────────────────────
const ZENTRIX_COURSES = [
  {
    id: 1,
    name: "Full Stack Development",
    category: "Development",
    duration: "6 Months",
    mode: "Hybrid",
    description:
      "Master complete frontend and backend software development, database architecture, APIs, and cloud deployment through hands-on real-world projects.",
  },
  {
    id: 2,
    name: "UI / UX Design",
    category: "Design",
    duration: "3 Months",
    mode: "Remote",
    description:
      "Design intuitive and engaging digital experiences through UI/UX design. Learn to create user-friendly interfaces, wireframes, and interactive prototypes.",
  },
  {
    id: 3,
    name: "Data Analytics",
    category: "Data Science",
    duration: "6 Months",
    mode: "Remote",
    description:
      "Transform raw data into meaningful business insights using Python, SQL, Power BI, and statistical analysis tools.",
  },
  {
    id: 4,
    name: "Data Science & Machine Learning",
    category: "Data Science",
    duration: "6 Months",
    mode: "Hybrid",
    description:
      "Harness the power of data modeling, predictive algorithms, and machine learning to build intelligent, data-driven solutions.",
  },
  {
    id: 5,
    name: "Artificial Intelligence",
    category: "AI",
    duration: "4 Months",
    mode: "Onsite",
    description:
      "Explore neural networks, computer vision, generative AI, and Large Language Models to create adaptive AI systems.",
  },
  {
    id: 6,
    name: "Digital Marketing",
    category: "Marketing",
    duration: "3 Months",
    mode: "Hybrid",
    description:
      "Master SEO, social media marketing, Google Ads, content strategy, and performance analytics for digital brand growth.",
  },
];

// ── Single course card ────────────────────────────────────────────────────────
const CourseCard = ({ course, onApply }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className={`zx-course-card ${showDesc ? "zx-course-card--expanded" : ""}`}>
      {/* Top row: name + duration badge */}
      <div className="zx-course-top">
        <span className="zx-course-name">{course.name}</span>
        <div className="zx-course-badges">
          <span className="zx-badge zx-badge--duration">{course.duration}</span>
          {course.mode === "Online & Offline" && (
            <span className="zx-badge zx-badge--mode">{course.mode}</span>
          )}
        </div>
      </div>

      {/* Description — animated expand/collapse */}
      {showDesc && (
        <p className="zx-course-desc">{course.description}</p>
      )}

      {/* Action buttons */}
      <div className="zx-course-actions">
        <button
          className="zx-desc-btn"
          onClick={() => setShowDesc((prev) => !prev)}
        >
          {showDesc ? "Hide Info ▲" : "View Info ▼"}
        </button>
        <button
          className="zx-apply-btn"
          onClick={() => onApply(course.name)}
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
};

// ── Course list ───────────────────────────────────────────────────────────────
const CourseCards = ({ onApply }) => {
  return (
    <div className="zx-course-list">
      <p className="zx-course-heading">📚 Available Courses at Zentrix</p>
      {ZENTRIX_COURSES.map((course) => (
        <CourseCard key={course.id} course={course} onApply={onApply} />
      ))}
    </div>
  );
};

export default CourseCards;
