import { useEffect, useState } from "react";
import { getCourses } from "../../services/courseService";
import { DEFAULT_SEED_COURSES, ensureCourseIds } from "../../utils/courseIdHelper";
import "./CourseCards.css";

const COURSE_CONFIG = [
  {
    route: "full-stack",
    syllabus: ["HTML, CSS and JavaScript", "React and frontend applications", "Node.js, Express and APIs", "Databases and deployment"],
  },
  {
    route: "ui-ux",
    syllabus: ["User research and personas", "Information architecture", "Wireframing and prototyping", "Usability testing and portfolios"],
  },
  {
    route: "data-analytics",
    syllabus: ["Python for data analysis", "SQL and data preparation", "Statistics and business insights", "Power BI dashboards"],
  },
  {
    route: "data-science-ml",
    syllabus: ["Python and exploratory analysis", "Feature engineering", "Supervised and unsupervised learning", "Model evaluation and deployment"],
  },
  {
    route: "ZTAI0001",
    syllabus: ["Neural networks and deep learning", "Computer vision", "Generative AI and LLMs", "Production AI workflows"],
  },
  {
    route: "digital-marketing",
    syllabus: ["SEO and content strategy", "Social media campaigns", "Google and performance ads", "Analytics and optimization"],
  },
];

const getSourceCourse = (course, sourceCourses) => sourceCourses.find((item) =>
  [item.id, item.slug, item.courseId, item.firestoreId].some((value) =>
    value?.toLowerCase() === course.route.toLowerCase()
  )
) || sourceCourses.find((item) => course.route === "full-stack" &&
  [item.id, item.slug].some((value) => ["mern-stack", "python-fullstack"].includes(value?.toLowerCase()))
);

// ── Single course card ────────────────────────────────────────────────────────
const CourseCard = ({ course, onApply }) => {
  const [showSyllabus, setShowSyllabus] = useState(false);

  return (
    <div className={`zx-course-card ${showSyllabus ? "zx-course-card--expanded" : ""}`}>
      {/* Top row: course name and duration */}
      <div className="zx-course-top">
        <span className="zx-course-name">{course.name}</span>
        <span className="zx-duration-badge">{course.duration}</span>
      </div>

      <div className="zx-course-details">
        <span><b aria-hidden="true">⏱</b><span>Duration: {course.duration}</span></span>
        <span><b aria-hidden="true">🎓</b><span>Certificate Included</span></span>
        <span><b aria-hidden="true">💼</b><span>Placement Support</span></span>
      </div>

      {showSyllabus && (
        <div className="zx-course-syllabus">
          <strong>Syllabus</strong>
          <ul>
            {course.syllabus.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
        </div>
      )}

      {/* Action buttons */}
      <div className="zx-course-actions">
        <button
          className="zx-desc-btn"
          onClick={() => setShowSyllabus((prev) => !prev)}
        >
          {showSyllabus ? "Hide Syllabus" : "View Syllabus"}
        </button>
        <button
          className="zx-apply-btn"
          onClick={() => onApply(course)}
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
};

// ── Course list ───────────────────────────────────────────────────────────────
const CourseCards = ({ onApply, courseRoute }) => {
  const [sourceCourses, setSourceCourses] = useState(DEFAULT_SEED_COURSES);

  useEffect(() => {
    let isCurrent = true;
    getCourses()
      .then((courses) => {
        if (isCurrent && courses.length > 0) setSourceCourses(ensureCourseIds(courses));
      })
      .catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, []);

  const courses = COURSE_CONFIG.map((config) => {
    const sourceCourse = getSourceCourse(config, sourceCourses) || {};
    return {
      ...config,
      ...sourceCourse,
      name: sourceCourse.title || sourceCourse.name || config.route,
      duration: sourceCourse.duration || "Duration unavailable",
    };
  });
  const course = courses.find((item) => item.route === courseRoute);

  return (
    <div className="zx-course-list">
      {!course && <p className="zx-course-heading">📚 Available Courses at Zentrix</p>}
      {course ? <CourseCard course={course} onApply={onApply} /> : courses.map((item) => (
        <CourseCard key={item.id} course={item} onApply={onApply} />
      ))}
    </div>
  );
};

export default CourseCards;
