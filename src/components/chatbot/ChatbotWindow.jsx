import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { loadIntentsFromFirestore, getFirestoreResponse, chatbotDb } from "./localNLP";
import ChatMessage from "./ChatMessage";
import QuickActions from "./QuickActions";
import TypingAnimation from "./TypingAnimation";
import CourseCards from "./CourseCards";
import "./ChatbotWindow.css";

const LEAD_FORM_TRIGGER_COUNT = 5;

const CONTACT_ACTIONS = [
  {
    label: "💬 Chat on WhatsApp",
    href: "https://wa.me/919509730003?text=Hi%20Zentrix%2C%20I%20have%20an%20inquiry",
  },
  { label: "📞 Call +91 95097 30003", href: "tel:+919509730003" },
  {
    label: "✉️ info@zentrixtechnology.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=info@zentrixtechnology.com&su=General%20Inquiry",
  },
  {
    label: "🎓 HR & Careers Desk",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=hr.zentrixtechnology@gmail.com&su=Career%20%2F%20Internship%20Inquiry",
  },
];

const ContactMessage = ({ time }) => (
  <div className="zx-msg-row zx-msg-row--bot">
    <div className="zx-bot-avatar">
      <img src={encodeURI("/chatbot logo.png")} alt="Bot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    </div>
    <div className="zx-bubble zx-bubble--bot zx-contact-hub">
      <h3>Get in Touch with Us 📍</h3>
      <p>Palpannai, Nagercoil, Tamil Nadu 629001, India</p>
      <div className="zx-contact-grid">
        {CONTACT_ACTIONS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("https://") ? "_blank" : undefined}
            rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
      <span className="zx-bubble-time">{time}</span>
    </div>
  </div>
);

const ABOUT_HIGHLIGHTS = [
  ["💻", "Custom Software & Cloud Development"],
  ["🎓", "Industrial Training & Real-World Internships"],
  ["🚀", "End-to-End Digital Solutions & Transformation"],
];

const AboutMessage = ({ time }) => (
  <div className="zx-msg-row zx-msg-row--bot">
    <div className="zx-bot-avatar">
      <img src={encodeURI("/chatbot logo.png")} alt="Bot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    </div>
    <div className="zx-bubble zx-bubble--bot" style={{ width: "min(330px, 76vw)", maxWidth: "none", boxSizing: "border-box" }}>
      <h3 style={{ margin: 0, color: "#f5f3ff", fontSize: "14px", lineHeight: 1.35 }}>
        About Zentrix Technology 🌐
      </h3>
      <p style={{ margin: "6px 0 0", color: "#c4b5fd", fontSize: "11.5px", fontWeight: 600, lineHeight: 1.4 }}>
        Empowering Innovation &amp; Career Growth
      </p>
      <div style={{ display: "grid", gap: "8px", marginTop: "13px" }}>
        {ABOUT_HIGHLIGHTS.map(([icon, text]) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(226, 217, 243, 0.82)", fontSize: "11.5px", lineHeight: 1.35 }}>
            <span aria-hidden="true" style={{ width: "20px", flex: "0 0 20px", textAlign: "center" }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <p style={{ margin: "13px 0 0", paddingTop: "11px", borderTop: "1px solid rgba(167, 139, 250, 0.18)", color: "rgba(226, 217, 243, 0.72)", fontSize: "11px", lineHeight: 1.5 }}>
        A fast-growing tech company focused on building cutting-edge software and future-ready tech talent.
      </p>
      <span className="zx-bubble-time">{time}</span>
    </div>
  </div>
);
const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


const AUTOCOMPLETE_SUGGESTIONS = [
  "Python Course",
  "Python Internship",
  "Python Projects",
  "Python Fees",
  "MERN Course",
  "MERN Internship",
  "MERN Projects",
  "React Course",
  "React Internship",
  "Java Course",
  "Data Analytics Course",
  "Power BI Course",
  "Tableau Course",
  "SQL & Excel Course",
  "Internship Programs",
  "Internship Eligibility",
  "Internship Projects",
  "Digital Marketing Course",
  "Design Course",
  "AI Course",
  "Machine Learning Course",
  "Django Course",
  "Web Development Services",
  "Course Fees",
  "Course Duration",
  "Projects",
];

const COURSE_ROUTE_ALIASES = [
  ["full-stack", ["python full stack", "python", "django", "full stack", "fullstack", "python fullstack"]],
  ["full-stack", ["mern", "mearn", "mern stack", "react", "node", "react js", "node js"]],
  ["ui-ux", ["ui ux", "ui/ux", "design"]],
  ["data-analytics", ["data analytics", "analytics", "power bi", "data analysis", "tableau", "sql", "excel"]],
  ["data-science-ml", ["data science", "machine learning", "ml"]],
  ["ZTAI0001", ["artificial intelligence", "ai", "deep learning", "llm"]],
  ["digital-marketing", ["digital marketing", "marketing", "seo", "search engine optimization"]],
  ["software-testing", ["software testing", "testing", "qa", "quality assurance"]],
];

const normalizeCourseKeyword = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

const aliasMatchesKeyword = (query, alias) => {
  const normalizedQuery = normalizeCourseKeyword(query);
  const normalizedAlias = normalizeCourseKeyword(alias);

  if (!normalizedAlias) return false;
  if (normalizedAlias.includes(" ")) {
    return normalizedQuery.includes(normalizedAlias);
  }

  return new RegExp(`(^|\\s)${normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`, "i").test(normalizedQuery);
};

const getCourseRoute = (query) => {
  const normalizedQuery = normalizeCourseKeyword(query);
  return COURSE_ROUTE_ALIASES.find(([, aliases]) =>
    aliases.some((alias) => aliasMatchesKeyword(normalizedQuery, alias))
  )?.[0] || null;
};

const isServicesQuery = (query) =>
  /\b(?:our\s+)?services?\b/i.test(query);

const isInternshipQuery = (query) =>
  /\binternships?\b/i.test(query);

const isCareersQuery = (query) =>
  /\bcareers?\b/i.test(query);

const isContactQuery = (query) =>
  /\bcontact\b/i.test(query);

const isAboutQuery = (query) =>
  /\babout(?:\s+us)?\b/i.test(query);

const COURSE_SUGGESTION_MAP = {
  "full-stack": [
    { label: "📊 Data Analytics", route: "data-analytics" },
    { label: "🤖 AI & Machine Learning", route: "ZTAI0001" },
    { label: "⚡ MERN Stack", route: "full-stack" },
  ],
  "data-analytics": [
    { label: "🐍 Python Full Stack", route: "full-stack" },
    { label: "📈 Power BI", route: "data-analytics" },
    { label: "🤖 AI & Machine Learning", route: "ZTAI0001" },
  ],
  "ZTAI0001": [
    { label: "📊 Data Analytics", route: "data-analytics" },
    { label: "🐍 Python Full Stack", route: "full-stack" },
    { label: "📈 Power BI", route: "data-analytics" },
  ],
  "digital-marketing": [
    { label: "📊 Data Analytics", route: "data-analytics" },
    { label: "🎨 UI/UX Design", route: "ui-ux" },
    { label: "🌐 Web Development", route: "full-stack" },
  ],
  "ui-ux": [
    { label: "📊 Data Analytics", route: "data-analytics" },
    { label: "🌐 Web Development", route: "full-stack" },
    { label: "🤖 AI & Machine Learning", route: "ZTAI0001" },
  ],
};

const CourseSuggestions = ({ courseRoute, onSelect }) => {
  const suggestions = COURSE_SUGGESTION_MAP[courseRoute] || [];

  if (!suggestions.length) return null;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "10px 12px 0",
        borderTop: "1px solid rgba(148, 163, 184, 0.18)",
      }}
    >
      <div
        style={{
          marginBottom: "8px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#e2e8f0",
          letterSpacing: "0.02em",
        }}
      >
        You may also be interested in:
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {suggestions.map((item) => (
          <button
            key={`${courseRoute}-${item.label}`}
            type="button"
            onClick={() => onSelect(item.route)}
            style={{
              border: "1px solid rgba(167, 139, 250, 0.28)",
              background: "rgba(15, 23, 42, 0.5)",
              color: "#e2e8f0",
              padding: "7px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              lineHeight: 1.25,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 18px rgba(15, 23, 42, 0.18)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-1px)";
              event.currentTarget.style.background = "rgba(76, 29, 149, 0.38)";
              event.currentTarget.style.borderColor = "rgba(196, 181, 253, 0.45)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.background = "rgba(15, 23, 42, 0.5)";
              event.currentTarget.style.borderColor = "rgba(167, 139, 250, 0.28)";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const COURSE_COMPARISON_DATA = {
  python: {
    route: "full-stack",
    title: "Python Full Stack",
    duration: "3 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "Backend, Frontend & Databases",
  },
  mern: {
    route: "full-stack",
    title: "MERN Stack Development",
    duration: "3 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "React, Node, Express, MongoDB",
  },
  data_analytics: {
    route: "data-analytics",
    title: "Data Analytics",
    duration: "2-3 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "Power BI, SQL, Python, Excel",
  },
  digital_marketing: {
    route: "digital-marketing",
    title: "Digital Marketing",
    duration: "2 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "SEO, SEM, SMM, Meta Ads",
  },
  ui_ux: {
    route: "ui-ux",
    title: "UI/UX Design",
    duration: "2 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "Figma, Wireframing, Prototyping",
  },
  software_testing: {
    route: "software-testing",
    title: "Software Testing",
    duration: "2 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "Manual & Automation Testing",
  },
  ai_ml: {
    route: "ZTAI0001",
    title: "AI & Machine Learning",
    duration: "3 Months",
    mode: "Online / Remote",
    cert: "Yes",
    placement: "Yes",
    focus: "ML Models, Deep Learning, NLP",
  },
};

const COURSE_ALIAS_MAP = {
  python: ["python", "py", "django"],
  mern: ["mern", "mearn", "react", "node", "fullstack", "full stack"],
  data_analytics: ["data analytics", "data analyst", "analytics", "analyst", "power bi"],
  digital_marketing: ["digital marketing", "marketing", "digital market", "seo", "smm"],
  ui_ux: ["ui ux", "ui/ux", "ui design", "ux design", "figma", "ui", "ux"],
  software_testing: ["software testing", "testing", "qa", "automation testing"],
  ai_ml: ["ai", "ml", "machine learning", "artificial intelligence"],
};

const getMatchedComparisonCourses = (query) => {
  const normalized = normalizeCourseKeyword(query);
  const matches = [];

  Object.entries(COURSE_ALIAS_MAP).forEach(([courseKey, aliases]) => {
    const isMatch = aliases.some((alias) => aliasMatchesKeyword(normalized, alias));
    if (isMatch) {
      matches.push({ key: courseKey, ...COURSE_COMPARISON_DATA[courseKey] });
    }
  });

  return matches.filter((course, index, arr) => arr.findIndex((item) => item.key === course.key) === index);
};

const extractCoursesFromComparison = (query) => {
  const matchedCourses = getMatchedComparisonCourses(query);
  return matchedCourses.slice(0, 2).map((course) => [course.route, { ...course }]);
};

const isComparisonQuery = (query) => {
  const normalized = normalizeCourseKeyword(query);
  const matchedCourses = getMatchedComparisonCourses(normalized);
  const hasDistinctCourseMatches = matchedCourses.length >= 2;
  const hasComparisonPhrase = /(?:\b(?:vs|versus|compare|comparison)\b|\b(?:which\s+(?:one\s+)?(?:is\s+)?(?:good|better)|which\s+one\s+to\s+choose|difference\s+between)\b|\b(?:or|and)\b)/i.test(normalized);

  return hasDistinctCourseMatches || (hasComparisonPhrase && matchedCourses.length >= 1);
};

const ComparisonMessage = ({ time, courses, onViewCourse }) => (
  <div className="zx-msg-row zx-msg-row--bot">
    <div className="zx-bot-avatar">
      <img src={encodeURI("/chatbot logo.png")} alt="Bot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    </div>
    <div className="zx-bubble zx-bubble--bot" style={{ width: "min(420px, 90vw)", maxWidth: "none", boxSizing: "border-box", overflow: "auto" }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#f5f3ff", fontSize: "14px", lineHeight: 1.3 }}>
        📊 Course Comparison
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", lineHeight: 1.4, color: "rgba(226, 217, 243, 0.85)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(167, 139, 250, 0.3)" }}>
            <th style={{ padding: "8px 6px", textAlign: "left", fontWeight: 600, color: "#ddd6fe" }}>Feature</th>
            <th style={{ padding: "8px 6px", textAlign: "left", fontWeight: 600, color: "#ddd6fe" }}>{courses[0]?.[1]?.title || "Course 1"}</th>
            {courses[1] && <th style={{ padding: "8px 6px", textAlign: "left", fontWeight: 600, color: "#ddd6fe" }}>{courses[1][1].title}</th>}
          </tr>
        </thead>
        <tbody>
          {[
            ["Duration", courses[0]?.[1]?.duration, courses[1]?.[1]?.duration],
            ["Mode", courses[0]?.[1]?.mode, courses[1]?.[1]?.mode],
            ["Certificate Included", courses[0]?.[1]?.cert, courses[1]?.[1]?.cert],
            ["Placement Support", courses[0]?.[1]?.placement, courses[1]?.[1]?.placement],
            ["Core Focus", courses[0]?.[1]?.focus, courses[1]?.[1]?.focus],
          ].map(([feature, val1, val2]) => (
            <tr key={feature} style={{ borderBottom: "1px solid rgba(167, 139, 250, 0.15)" }}>
              <td style={{ padding: "7px 6px", fontWeight: 500, color: "#c4b5fd" }}>{feature}</td>
              <td style={{ padding: "7px 6px", color: "rgba(226, 217, 243, 0.8)" }}>{val1 || "—"}</td>
              {courses[1] && <td style={{ padding: "7px 6px", color: "rgba(226, 217, 243, 0.8)" }}>{val2 || "—"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "7px", marginTop: "13px" }}>
        {courses.map(([route, data]) => (
          <button
            key={route}
            type="button"
            onClick={() => onViewCourse(route)}
            style={{
              flex: 1,
              padding: "8px 7px",
              borderRadius: "8px",
              border: 0,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            View {data.title?.split(" ")[0] || data.name?.split(" ")[0] || "Course"}
          </button>
        ))}
      </div>
      <span className="zx-bubble-time">{time}</span>
    </div>
  </div>
);

const SERVICES = [
  ["💻", "Custom Software Development"],
  ["📱", "Web & Mobile App Development"],
  ["🎨", "UI/UX Design"],
  ["📈", "Digital Marketing & SEO"],
  ["☁️", "Cloud Infrastructure"],
  ["🎓", "Academic Project Guidance"],
];

const ServicesMessage = ({ time }) => (
  <div className="zx-msg-row zx-msg-row--bot">
    <div className="zx-bot-avatar">
      <img src={encodeURI("/chatbot logo.png")} alt="Bot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    </div>
    <div className="zx-bubble zx-bubble--bot">
      <div>Here are the services offered by Zentrix Technology:</div>
      <div style={{ display: "grid", gap: "6px", marginTop: "9px" }}>
        {SERVICES.map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span aria-hidden="true" style={{ width: "20px", flexShrink: 0 }}>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <span className="zx-bubble-time">{time}</span>
    </div>
  </div>
);

const INTERNSHIP_DETAILS = [
  ["📍", "Location:", "Nagercoil, Tamil Nadu, India"],
  ["💻", "Mode:", "100% Remote / Online"],
  ["📞", "Phone:", "+91 95097 30003"],
  ["✉️", "Email:", "hr.zentrixtechnology@gmail.com"],
];

const InternshipMessage = ({ time, onApply }) => (
  <div className="zx-msg-row zx-msg-row--bot">
    <div className="zx-bot-avatar">
      <img src={encodeURI("/chatbot logo.png")} alt="Bot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    </div>
    <div className="zx-bubble zx-bubble--bot zx-internship-card">
      <div className="zx-internship-header">
        <strong>Zentrix Internship Program</strong>
        <span className="zx-internship-badge">🌐 Remote Available</span>
      </div>
      <div className="zx-internship-details">
        {INTERNSHIP_DETAILS.map(([icon, label, value]) => (
          <div key={label} className="zx-internship-detail">
            <span className="zx-internship-icon" aria-hidden="true">{icon}</span>
            <span><strong>{label}</strong> {value}</span>
          </div>
        ))}
      </div>
      <div className="zx-internship-actions">
        <button type="button" onClick={onApply}>Apply for Internship →</button>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=hr.zentrixtechnology@gmail.com&su=Application%20%2F%20Inquiry%20Regarding%20Internship%20at%20Zentrix"
          target="_blank"
          rel="noopener noreferrer"
          className="zx-internship-email-action"
          onClick={(event) => event.stopPropagation()}
          style={{ cursor: "pointer" }}
        >
          Email HR ✉️
        </a>
      </div>
      <span className="zx-bubble-time">{time}</span>
    </div>
  </div>
);

const CareerMessage = ({ time }) => (
  <div className="zx-msg-row zx-msg-row--bot">
    <div className="zx-bot-avatar">
      <img src={encodeURI("/chatbot logo.png")} alt="Bot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
    </div>
    <div className="zx-bubble zx-bubble--bot zx-career-card">
      <h3>Join Our Team at Zentrix 🚀</h3>
      <p>
        At Zentrix Technology we create opportunities to learn, create and innovate together. We provide a collaborative environment where creativity thrives and skills are developed through real-world projects.
      </p>
      <div className="zx-career-email-section">
        <span>Send your resume directly to our HR team.</span>
        <a href="mailto:hr.zentrixtechnology@gmail.com">hr.zentrixtechnology@gmail.com</a>
      </div>
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=hr.zentrixtechnology@gmail.com&su=Job%20Application%20%2F%20Resume%20Submission"
        target="_blank"
        rel="noopener noreferrer"
        className="zx-career-email-action"
      >
        Send Resume via Email ✉️
      </a>
      <span className="zx-bubble-time">{time}</span>
    </div>
  </div>
);

const getDetailsPromptCourse = (message) => {
  if (!/would you like to know more details about/i.test(message)) return null;
  return getCourseRoute(message);
};

const hasPositiveIntent = (message) => {
  const normalized = message.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (/(?:^|\s)(?:no|nope|nop|nah)(?:\s|$)/i.test(normalized) ||
    /not\s+(?:interested|intrested|really|now)/i.test(normalized)) {
    return false;
  }

  return /(?:^|\s)(?:yes|sure|ok|okay|yep|yeah|yea|details?|info|information|interested|please)(?:\s|$)/i.test(normalized);
};

// ── Call NLP engine (which fetches from Firestore directly) ───────────────────
const askBackend = async (message, userName = "Anonymous") => {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
  try {
    return await getFirestoreResponse(message);
  } catch (error) {
    console.error("NLP error:", error);
    return "I'm having trouble connecting right now. Please try again or reach us at \ud83d\udce7 info@zentrix.com";
  }
};

// ── Component ─────────────────────────────────────────────────────────────────
const ChatbotWindow = ({ chatState, onStateChange }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "text",
      sender: "bot",
      text: "Hello! 👋 Welcome to Zentrix Technology.\nHow can I help you today?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadStep, setLeadStep] = useState(null);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interestedCourse: "",
  });
  const [pendingCourseDetails, setPendingCourseDetails] = useState(null);
  const [userName, setUserName] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [inputSuggestionsVisible, setInputSuggestionsVisible] = useState(false);
  const bottomRef = useRef(null);
  const inputBarRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadIntentsFromFirestore();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, leadStep]);

  useEffect(() => {
    const handleOutsideInputClick = (event) => {
      if (!inputBarRef.current?.contains(event.target)) {
        setInputSuggestionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInputClick);
    return () => document.removeEventListener("mousedown", handleOutsideInputClick);
  }, []);

  useEffect(() => {
    if (chatState === "open" && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [chatState]);

  const addBotMessage = (text, delay = 1200) => {
    const courseRoute = getDetailsPromptCourse(text);
    if (courseRoute) setPendingCourseDetails(courseRoute);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "text", sender: "bot", text, time: getTime() },
      ]);
    }, delay);
  };

  // ── Adds a user-authored message to the chat and tracks the count that
  //    drives the LeadForm trigger. Every place a user message is appended
  //    should go through this function instead of calling setMessages directly.
  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "text", sender: "user", text, time: getTime() },
    ]);

    setUserMsgCount((prevCount) => prevCount + 1);
  };

  const startLeadCapture = () => {
    setLeadStep("name");
    addBotMessage(
      "Before we continue, let us know who you are 👇 What is your name?",
      400
    );
  };

  const handleLeadStep = async (text) => {
    const value = text.trim();

    if (leadStep === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      addBotMessage(
        "Please enter a valid email address (e.g., name@example.com) to continue:",
        250
      );
      return true;
    }

    if (leadStep === "phone") {
      const digits = value.replace(/[\s\-()[\]]/g, "").replace(/^\+/, "");
      const phone = digits.startsWith("91") && digits.length === 12
        ? digits.slice(2)
        : digits.startsWith("0") && digits.length === 11
          ? digits.slice(1)
          : digits;

      if (!/^[6-9]\d{9}$/.test(phone)) {
        addBotMessage("Please enter a valid 10-digit phone number to continue:", 250);
        return true;
      }

      const nextData = { ...leadData, phone };
      setLeadData(nextData);
      setLeadStep("interestedCourse");
      addBotMessage("Which course are you interested in?", 250);
      return true;
    }

    const nextData = { ...leadData, [leadStep]: value };
    setLeadData(nextData);

    if (leadStep === "name") {
      setUserName(value);
      setLeadStep("email");
      addBotMessage("Please enter your email address:", 250);
      return true;
    }
    if (leadStep === "email") {
      setLeadStep("phone");
      addBotMessage("Please enter your phone number:", 250);
      return true;
    }
    const lead = {
      ...nextData,
      location: nextData.location || "",
      timestamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(chatbotDb, "leads"), lead);
      setLeadCaptured(true);
      setLeadStep(null);
      const courseRoute = getCourseRoute(value);
      setPendingCourseDetails(courseRoute);
      addBotMessage(
        `Thank you! Would you like to know more details about ${value}?`,
        250
      );
    } catch {
      addBotMessage("I couldn't save your details. Please enter your course again.", 250);
    }
    return true;
  };

  const saveQuery = async (userMsg) => {
    try {
      await addDoc(collection(chatbotDb, "chatbot_queries"), {
        message: userMsg,
        userName: userName || "Anonymous",
        createdAt: serverTimestamp(),
      });
    } catch (_) {}
  };

  const saveChatHistory = async (userMsg, botReply) => {
    try {
      await addDoc(collection(chatbotDb, "chat_history"), {
        userMessage: userMsg,
        botResponse: botReply,
        userName: userName || "Anonymous",
        timestamp: serverTimestamp(),
      });
    } catch (_) {}
  };

  // ── Courses quick action — uses hardcoded CourseCards, NO Firestore fetch ─
  const handleCoursesAction = () => {
    setShowQuickActions(false);

    // Add user bubble
    addUserMessage("Courses");
    saveQuery("Courses");

    if (leadStep) {
      handleLeadStep("Courses");
      return;
    }
    if (!leadCaptured && userMsgCount + 1 === LEAD_FORM_TRIGGER_COUNT) {
      startLeadCapture();
      return;
    }

    // Add bot intro message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        type: "text",
        sender: "bot",
        text: "Here are all our available courses! Click View Info for details or Apply Now to enroll 👇",
        time: getTime(),
      },
    ]);

    // Add course cards as a message in the chat flow
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "courses",
          sender: "bot",
          time: getTime(),
        },
      ]);
      inputRef.current?.focus();
    }, 200);
  };

  // ── Apply Now clicked on a course card ───────────────────────────────────
  const handleApply = (course) => {
    onStateChange("minimized");
    navigate(`/course/${course.route}`);
  };

  const showCourseCard = (query) => {
    const courseRoute = getCourseRoute(query);
    if (!courseRoute) return false;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "courses", sender: "bot", courseRoute, time: getTime() },
    ]);
    return true;
  };

  const openSuggestedCourse = (route) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "courses", sender: "bot", courseRoute: route, time: getTime() },
    ]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const showServicesMessage = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "services", sender: "bot", time: getTime() },
    ]);
  };

  const showInternshipMessage = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "internship", sender: "bot", time: getTime() },
    ]);
  };

  const showCareerMessage = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "career", sender: "bot", time: getTime() },
    ]);
  };

  const showContactMessage = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "contact", sender: "bot", time: getTime() },
    ]);
  };

  const showAboutMessage = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "about", sender: "bot", time: getTime() },
    ]);
  };

  const showComparisonMessage = (courses) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "comparison", sender: "bot", courses, time: getTime() },
    ]);
  };

  const handleCourseDetailsReply = (text) => {
    if (!pendingCourseDetails) return false;

    const courseRoute = pendingCourseDetails;
    setPendingCourseDetails(null);
    if (hasPositiveIntent(text)) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "courses", sender: "bot", courseRoute, time: getTime() },
      ]);
      return true;
    }

    return false;
  };

  // ── Quick actions (non-courses) → Flask backend ───────────────────────────
  const handleQuickAction = async (label) => {
    if (label === "Courses") {
      handleCoursesAction();
      return;
    }

    setShowQuickActions(false);
    addUserMessage(label);
    saveQuery(label);

    if (leadStep) {
      await handleLeadStep(label);
      inputRef.current?.focus();
      return;
    }
    if (handleCourseDetailsReply(label)) {
      inputRef.current?.focus();
      return;
    }
    if (!leadCaptured && userMsgCount + 1 === LEAD_FORM_TRIGGER_COUNT) {
      startLeadCapture();
      inputRef.current?.focus();
      return;
    }

    if (isServicesQuery(label)) {
      showServicesMessage();
      inputRef.current?.focus();
      return;
    }
    if (isInternshipQuery(label)) {
      showInternshipMessage();
      inputRef.current?.focus();
      return;
    }
    if (isCareersQuery(label)) {
      showCareerMessage();
      inputRef.current?.focus();
      return;
    }
    if (isContactQuery(label)) {
      showContactMessage();
      inputRef.current?.focus();
      return;
    }
    if (isAboutQuery(label)) {
      showAboutMessage();
      inputRef.current?.focus();
      return;
    }

    if (isComparisonQuery(label)) {
      const courses = extractCoursesFromComparison(label);
      if (courses.length >= 2) {
        showComparisonMessage(courses);
        inputRef.current?.focus();
        return;
      }
    }

    if (showCourseCard(label)) {
      inputRef.current?.focus();
      return;
    }

    setIsTyping(true);
    const reply = await askBackend(label, userName);
    setIsTyping(false);

    addBotMessage(reply, 0);
    saveChatHistory(label, reply);
    inputRef.current?.focus();
  };

  // ── Send message → Flask backend ──────────────────────────────────────────
  const handleSend = async (messageOverride) => {
    const text = (messageOverride ?? input).trim();
    if (!text) return;
    setInput("");
    setInputSuggestionsVisible(false);
    setShowQuickActions(false);

    addUserMessage(text);
    saveQuery(text);

    if (leadStep) {
      await handleLeadStep(text);
      inputRef.current?.focus();
      return;
    }
    if (handleCourseDetailsReply(text)) {
      inputRef.current?.focus();
      return;
    }
    if (!leadCaptured && userMsgCount + 1 === LEAD_FORM_TRIGGER_COUNT) {
      startLeadCapture();
      inputRef.current?.focus();
      return;
    }

    if (isServicesQuery(text)) {
      showServicesMessage();
      inputRef.current?.focus();
      return;
    }
    if (isInternshipQuery(text)) {
      showInternshipMessage();
      inputRef.current?.focus();
      return;
    }
    if (isCareersQuery(text)) {
      showCareerMessage();
      inputRef.current?.focus();
      return;
    }
    if (isContactQuery(text)) {
      showContactMessage();
      inputRef.current?.focus();
      return;
    }
    if (isAboutQuery(text)) {
      showAboutMessage();
      inputRef.current?.focus();
      return;
    }

    if (isComparisonQuery(text)) {
      const courses = extractCoursesFromComparison(text);
      if (courses.length >= 2) {
        showComparisonMessage(courses);
        inputRef.current?.focus();
        return;
      }
    }

    if (showCourseCard(text)) {
      inputRef.current?.focus();
      return;
    }

    setIsTyping(true);
    const reply = await askBackend(text, userName);
    setIsTyping(false);

    addBotMessage(reply, 0);
    saveChatHistory(text, reply);
    inputRef.current?.focus();
  };

  const matchingSuggestions = input.trim()
    ? AUTOCOMPLETE_SUGGESTIONS.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.trim().toLowerCase())
    )
    : [];

  if (chatState !== "open") return null;

  return (
    <div className="zx-window">
      {/* Header */}
      <div className="zx-header">
        <div className="zx-header-avatar">
          <img src={encodeURI("/chatbot logo.png")} alt="Zentrix Chatbot" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
        </div>
        <div className="zx-header-info">
          <span className="zx-header-name">Zentrix Assistant</span>
          <span className="zx-header-status">
            <span className="zx-status-dot" /> Online
          </span>
        </div>
        <div className="zx-header-badge">AI</div>

        <button
          className="zx-header-ctrl"
          onClick={() => onStateChange("minimized")}
          aria-label="Minimize chat"
          title="Minimize"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <button
          className="zx-header-ctrl zx-header-ctrl--close"
          onClick={() => onStateChange("closed")}
          aria-label="Close chat"
          title="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="zx-messages">
        {messages.map((msg, i) => (
          <div key={msg.id}>
            {msg.type === "text" && <ChatMessage message={msg} />}
            {msg.type === "services" && <ServicesMessage time={msg.time} />}
            {msg.type === "internship" && (
              <InternshipMessage time={msg.time} onApply={() => navigate("/your-next-step")} />
            )}
            {msg.type === "career" && <CareerMessage time={msg.time} />}
            {msg.type === "contact" && <ContactMessage time={msg.time} />}
            {msg.type === "about" && <AboutMessage time={msg.time} />}
            {msg.type === "comparison" && (
              <ComparisonMessage courses={msg.courses} time={msg.time} onViewCourse={(route) => navigate(`/course/${route}`)} />
            )}
            {msg.type === "courses" && (
              <>
                <CourseCards courseRoute={msg.courseRoute} onApply={handleApply} />
                {msg.courseRoute && <CourseSuggestions courseRoute={msg.courseRoute} onSelect={openSuggestedCourse} />}
              </>
            )}
            {i === 0 && showQuickActions && (
              <QuickActions onSelect={handleQuickAction} />
            )}
          </div>
        ))}
        {isTyping && <TypingAnimation />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="zx-input-bar" ref={inputBarRef}>
        {inputSuggestionsVisible && matchingSuggestions.length > 0 && (
          <div className="zx-autocomplete" role="listbox">
            {matchingSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="zx-autocomplete-option"
                onClick={() => handleSend(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <input
          ref={inputRef}
          className="zx-text-input"
          type="text"
          placeholder="Ask about courses, services, internship..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setInputSuggestionsVisible(Boolean(e.target.value.trim()));
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="zx-send-btn"
          onClick={handleSend}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;