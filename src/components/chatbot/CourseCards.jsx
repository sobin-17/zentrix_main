import { useState } from "react";
import "./CourseCards.css";

// ── All Zentrix courses hardcoded — no Firestore needed ───────────────────────
const ZENTRIX_COURSES = [
  {
    id: 1,
    name: "MERN Stack Development",
    category: "Development",
    duration: "6 Months",
    mode: "Online",
    description:
      "Build modern, scalable, and high-performance web applications using the MERN Stack. Learn to develop dynamic user interfaces, robust backend systems, and database-driven applications through hands-on projects and real-world development practices.",
  },
  {
    id: 2,
    name: "Java Programming",
    category: "Development",
    duration: "6 Months",
    mode: "Online",
    description:
      "Create fast, scalable, and reliable web applications using the Java ecosystem. Gain practical experience designing interactive UIs, building backend services with frameworks like Spring, and handling database-driven solutions through real-world projects.",
  },
  {
    id: 3,
    name: "Python Full Stack Development",
    category: "Development",
    duration: "5 Months",
    mode: "Online",
    description:
      "Design and develop modern, efficient, and scalable web applications using Python full stack technologies. Build interactive front-end interfaces, implement backend logic with Django or Flask, and work with databases through practical, project-based learning.",
  },
  {
    id: 4,
    name: "Data Analytics",
    category: "Data Science",
    duration: "6 Months",
    mode: "Online",
    description:
      "Transform raw data into meaningful insights using powerful data analytics techniques and tools. Learn to clean, analyze, and visualize data, build data-driven reports, and uncover patterns through hands-on projects and real-world case studies.",
  },
  {
    id: 5,
    name: "Data Science & Machine Learning",
    category: "Data Science",
    duration: "2 Months",
    mode: "Online",
    description:
      "Harness the power of data science and machine learning to build intelligent, data-driven solutions. Analyze complex datasets, develop predictive models, and implement algorithms that automate decision-making through hands-on projects.",
  },
  {
    id: 6,
    name: "AI (Artificial Intelligence)",
    category: "Development",
    duration: "4 Months",
    mode: "Online & Offline",
    description:
      "Explore the world of Artificial Intelligence to create smart, adaptive, and innovative solutions. Build intelligent systems, work with advanced algorithms, and develop AI-powered applications through hands-on projects and real-world use cases.",
  },
  {
    id: 7,
    name: "UI / UX Designing",
    category: "Designing",
    duration: "3 Months",
    mode: "Online & Offline",
    description:
      "Design intuitive and engaging digital experiences through UI/UX design. Learn to create user-friendly interfaces, enhance usability, and craft visually appealing designs by applying modern design principles, user research, and hands-on projects.",
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
