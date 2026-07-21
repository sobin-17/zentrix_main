import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import QuickActions from "./QuickActions";
import LeadForm from "./LeadForm";
import TypingAnimation from "./TypingAnimation";
import CourseCards from "./CourseCards";
import PremiumRobot from "./PremiumRobot";
import "./ChatbotWindow.css";

// ── Flask backend URL ─────────────────────────────────────────────────────────
const BACKEND_URL = "http://localhost:5000";

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ── Call Flask NLP backend for chat response ──────────────────────────────────
const askBackend = async (message, userName = "Anonymous") => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        session: { user_name: userName },
      }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    return data.response || null;
  } catch (error) {
    console.error("Backend error:", error);
    return "I'm having trouble connecting right now. Please try again or reach us at 📧 hr.zentrixtechnology@gmail.com or 📞 +91 938423728";
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
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showLeadForm]);

  const addBotMessage = (text, delay = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "text", sender: "bot", text, time: getTime() },
      ]);
    }, delay);
  };

  // ── Courses quick action — uses hardcoded CourseCards, NO Firestore fetch ─
  const handleCoursesAction = () => {
    setShowQuickActions(false);

    // Add user bubble
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "text", sender: "user", text: "Courses", time: getTime() },
    ]);

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
    }, 200);

    if (!leadCaptured) {
      setTimeout(() => setShowLeadForm(true), 1500);
    }
  };

  // ── Apply Now clicked on a course card ───────────────────────────────────
  const handleApply = (courseName) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "text", sender: "user", text: `Apply for: ${courseName}`, time: getTime() },
    ]);
    addBotMessage(
      `Great choice! 🎉 To apply for "${courseName}", please share your details and our team will get in touch.\n\n📧 Email: hr.zentrixtechnology@gmail.com\n📞 Phone: +91 938423728\nOr fill the lead form below!`,
      800
    );
    if (!leadCaptured) {
      setTimeout(() => setShowLeadForm(true), 1400);
    }
  };

  // ── Quick actions (non-courses) → Flask backend ───────────────────────────
  const handleQuickAction = async (label) => {
    if (label === "Courses") {
      handleCoursesAction();
      return;
    }

    setShowQuickActions(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "text", sender: "user", text: label, time: getTime() },
    ]);

    setIsTyping(true);
    const reply = await askBackend(label, userName);
    setIsTyping(false);

    addBotMessage(reply, 0);

    if (!leadCaptured) {
      setTimeout(() => setShowLeadForm(true), 800);
    }
  };

  // ── Lead form submitted ───────────────────────────────────────────────────
  const handleLeadSubmit = (name) => {
    setLeadCaptured(true);
    setUserName(name);
    setShowLeadForm(false);
    addBotMessage(
      `Thanks ${name}! 🎉 We've saved your details. Our team will reach out to you shortly.\n\nFeel free to ask me anything about Zentrix!`,
      600
    );
  };

  // ── Lead form skipped ─────────────────────────────────────────────────────
  const handleLeadSkip = () => {
    setLeadCaptured(true);
    setShowLeadForm(false);
    addBotMessage("No worries! Feel free to ask me anything about Zentrix. 😊", 400);
  };

  // ── Send message → Flask backend ──────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setShowQuickActions(false);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "text", sender: "user", text, time: getTime() },
    ]);

    if (!leadCaptured) {
      addBotMessage(
        "Thanks for reaching out! Please fill in your details so we can assist you better.",
        900
      );
      setTimeout(() => setShowLeadForm(true), 1000);
      return;
    }

    setIsTyping(true);
    const reply = await askBackend(text, userName);
    setIsTyping(false);

    addBotMessage(reply, 0);
  };

  if (chatState !== "open") return null;

  return (
    <div className="zx-window">
      {/* Header */}
      <div className="zx-header">
        <div className="zx-header-avatar">
          <img 
            src={encodeURI("/chatbot logo.png")} 
            alt="Zentrix Assistant" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
          />
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
        {/* Robot mascot shown once at top of chat */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "12px", paddingBottom: "4px" }}>
          <img 
            src={encodeURI("/chatbot logo.png")} 
            alt="AI Assistant" 
            style={{ width: 130, height: 130, objectFit: 'cover', borderRadius: '50%' }} 
          />
          <p style={{ margin: "4px 0 0", fontSize: "13px", fontWeight: 700, color: "#e2d9f3", letterSpacing: "0.2px", fontFamily: "inherit" }}>
            Zentrix AI Assistant
          </p>
          <p style={{ margin: "2px 0 8px", fontSize: "10px", fontWeight: 600, color: "#a855f7", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "inherit" }}>
            Smart Guide
          </p>
        </div>

        {messages.map((msg, i) => (
          <div key={msg.id}>
            {msg.type === "text" && <ChatMessage message={msg} />}
            {msg.type === "courses" && (
              <CourseCards onApply={handleApply} />
            )}
            {i === 0 && showQuickActions && (
              <QuickActions onSelect={handleQuickAction} />
            )}
          </div>
        ))}
        {isTyping && <TypingAnimation />}
        {showLeadForm && (
          <LeadForm onSubmit={handleLeadSubmit} onSkip={handleLeadSkip} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="zx-input-bar">
        <input
          className="zx-text-input"
          type="text"
          placeholder="Ask about courses, services, internship..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

      <div className="zx-footer">⚡ Powered by Zentrix AI</div>
    </div>
  );
};

export default ChatbotWindow;
