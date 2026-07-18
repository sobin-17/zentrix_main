import React from "react";
import { useNavigate } from "react-router-dom";

/* ─── SVG Icons ─────────────────────────────────────────────── */
const LightbulbIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const CodeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const RocketIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

/* ── "What We Do" icons ── */
const DevIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const AcademyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const AIIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
    <circle cx="9" cy="13" r="1" fill="#a855f7" /><circle cx="15" cy="13" r="1" fill="#a855f7" />
    <path d="M9 17c.83.65 2.17 1 3 1s2.17-.35 3-1" />
  </svg>
);

const SupportIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────── */
const steps = [
  { num: "01", icon: <LightbulbIcon />, title: "Share Your Idea", desc: "Tell us what you need." },
  { num: "02", icon: <PeopleIcon />, title: "We Connect", desc: "Our team will reach out." },
  { num: "03", icon: <ClipboardIcon />, title: "Plan & Proposal", desc: "We analyze and prepare the best plan." },
  { num: "04", icon: <CodeIcon />, title: "Development", desc: "We build with quality and care." },
  { num: "05", icon: <RocketIcon />, title: "Delivery", desc: "On time. Every time. Beyond expectations." },
];

const services = [
  { icon: <DevIcon />, title: "Software Development", desc: "Custom software solutions that grow your business." },
  { icon: <AcademyIcon />, title: "Academy & Training", desc: "Industry-focused training for your career growth." },
  { icon: <AIIcon />, title: "AI & Tech Solutions", desc: "Intelligent solutions powered by technology." },
  { icon: <SupportIcon />, title: "Support & Maintenance", desc: "We're here even after the project is done." },
];

/* ─── Component ──────────────────────────────────────────────── */
const YourNextStep = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#0a0a12", color: "#fff", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes heroFloat {
          0%   { transform: scale(1.02) translateY(0px); }
          50%  { transform: scale(1.06) translateY(-10px); }
          100% { transform: scale(1.02) translateY(0px); }
        }
        @keyframes rayShimmer {
          0%   { opacity: 0;    transform: rotate(-15deg) translateX(-80px); }
          40%  { opacity: 0.22; }
          70%  { opacity: 0.1;  }
          100% { opacity: 0;    transform: rotate(-15deg) translateX(80px); }
        }
        @keyframes sparkBlink {
          0%,100% { opacity: 0;   transform: scale(0.6); }
          30%     { opacity: 1;   transform: scale(1.4); }
          50%     { opacity: 0.2; transform: scale(0.8); }
          70%     { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.6; }
          33%  { transform: translateY(-22px) translateX(10px) scale(1.3); opacity: 1;   }
          66%  { transform: translateY(-10px) translateX(-8px) scale(0.9); opacity: 0.7; }
          100% { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.6; }
        }
        @keyframes heroTextFade {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive hero ── */
        .ynx-hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 72px 24px 100px;
          overflow: hidden;
        }
        .ynx-hero-container {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 1200px;
          padding-left: 20px;
        }
        .ynx-hero-img {
          position: absolute;
          right: 0; top: 0;
          width: 55%; height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          animation: heroFloat 8s ease-in-out infinite;
          transform-origin: center center;
        }
        .ynx-hero-text {
          max-width: 520px;
          animation: heroTextFade 1s ease-out both;
        }

        @media (max-width: 768px) {
          .ynx-hero-section {
            padding: 80px 16px 60px;
            align-items: flex-end;
            min-height: 70vh;
          }
          .ynx-hero-container { padding-left: 0; }
          .ynx-hero-img {
            width: 100%;
            opacity: 0.45;
          }
          .ynx-hero-text { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .ynx-hero-section { padding: 70px 16px 48px; }
        }

        /* ── Lower Sections Responsive ── */
        .ynx-section-padding { padding: 0 40px 100px; }
        .ynx-section-padding-top { padding: 20px 40px 100px; }
        
        .ynx-process-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0;
        }
        .ynx-step-connector {
          flex-shrink: 0;
          width: 48px;
          height: 2px;
          border-top: 2px dashed rgba(168,85,247,0.4);
          margin-top: 28px;
        }

        .ynx-cta-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ynx-cta-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .ynx-section-padding { padding: 0 24px 60px; }
          .ynx-section-padding-top { padding: 10px 24px 60px; }
          
          .ynx-process-container { flex-direction: column; align-items: center; gap: 16px; }
          .ynx-step-wrapper { width: 100%; max-width: 320px; }
          .ynx-step-connector {
            width: 2px;
            height: 36px;
            border-top: none;
            border-left: 2px dashed rgba(168,85,247,0.4);
            margin: 8px 0;
          }
        }
        
        @media (max-width: 600px) {
          .ynx-cta-banner { justify-content: center; text-align: center; }
          .ynx-cta-content { flex-direction: column; gap: 12px; text-align: center; }
        }

        @media (max-width: 480px) {
          .ynx-section-padding { padding: 0 16px 50px; }
          .ynx-section-padding-top { padding: 10px 16px 50px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="ynx-hero-section">

        {/* Staircase image */}
        <img src="/staircase_hero.png" alt="" className="ynx-hero-img" />

        {/* Dark fade overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, #0a0a12 35%, rgba(10,10,18,0.75) 60%, rgba(10,10,18,0.05) 100%)",
          zIndex: 1,
        }} />

        {/* Sweeping light ray */}
        <div style={{
          position: "absolute", right: "3%", top: 0,
          width: "200px", height: "100%",
          background: "linear-gradient(115deg, transparent 0%, rgba(210,160,255,0.15) 50%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
          animation: "rayShimmer 5s ease-in-out infinite",
        }} />

        {/* Second ray — different angle & delay */}
        <div style={{
          position: "absolute", right: "20%", top: 0,
          width: "120px", height: "100%",
          background: "linear-gradient(130deg, transparent 0%, rgba(200,150,255,0.1) 50%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
          animation: "rayShimmer 7s ease-in-out infinite 2s",
        }} />

        {/* Star sparks — blink in/out */}
        {[
          { right: "28%", top: "22%", size: 5, delay: "0s", dur: "1.2s" },
          { right: "24%", top: "38%", size: 4, delay: "0.4s", dur: "1.8s" },
          { right: "32%", top: "18%", size: 6, delay: "0.8s", dur: "1.4s" },
          { right: "19%", top: "32%", size: 3, delay: "1.2s", dur: "2s" },
          { right: "21%", top: "50%", size: 4, delay: "0.2s", dur: "1.6s" },
          { right: "35%", top: "30%", size: 3, delay: "1.5s", dur: "1.1s" },
          { right: "17%", top: "44%", size: 5, delay: "0.6s", dur: "2.2s" },
          { right: "26%", top: "60%", size: 3, delay: "1s", dur: "1.5s" },
        ].map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            right: p.right, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "rgba(240,200,255,1)",
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(180,80,255,0.9)`,
            zIndex: 3, pointerEvents: "none",
            animation: `sparkBlink ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        {/* Floating dust particles */}
        {[
          { right: "27%", top: "28%", size: 6, delay: "0s", dur: "4s" },
          { right: "23%", top: "44%", size: 4, delay: "1s", dur: "5s" },
          { right: "31%", top: "21%", size: 5, delay: "2s", dur: "3.5s" },
          { right: "18%", top: "36%", size: 3, delay: "0.5s", dur: "6s" },
        ].map((p, i) => (
          <div key={`d${i}`} style={{
            position: "absolute",
            right: p.right, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "rgba(220,180,255,0.8)",
            boxShadow: "0 0 10px 4px rgba(168,85,247,0.7)",
            zIndex: 3, pointerEvents: "none",
            animation: `particleFloat ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        {/* Heading */}
        <div className="ynx-hero-container">
          <div className="ynx-hero-text" style={{ marginTop: "-23vh" }}>
            <h1 style={{ fontSize: "clamp(68px,12.5vw,135px)", fontWeight: 900, lineHeight: 0.95, margin: 0 }}>
              YOUR<br />
              <span style={{ color: "#a855f7" }}>NEXT</span> STEP
            </h1>
            <div style={{ width: "40px", height: "4px", background: "#a855f7", borderRadius: "2px", margin: "18px 0 22px" }} />
            <p style={{ fontSize: "17px", color: "#ccc", lineHeight: 1.7, margin: 0 }}>
              From idea to reality.<br />
              We make the process simple and effective.
            </p>
          </div>
        </div>
      </section>


      {/* ── PROCESS STEPS ── */}
      <section className="ynx-section-padding">
        <div style={{
          background: "#13131f",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "40px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <div className="ynx-process-container">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="ynx-step-wrapper" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 8px" }}>
                  {/* Icon */}
                  <div style={{ width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {step.icon}
                  </div>

                  {/* Number badge */}
                  <div style={{
                    background: "#a855f7",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderRadius: "50px",
                    padding: "3px 12px",
                    marginBottom: "12px",
                    letterSpacing: "0.05em",
                  }}>
                    {step.num}
                  </div>

                  <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 8px", color: "#fff" }}>{step.title}</h3>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>

                {/* Dotted connector */}
                {idx < steps.length - 1 && (
                  <div className="ynx-step-connector" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="ynx-section-padding-top">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, marginBottom: "8px" }}>What We Do</h2>
          <div style={{ width: "40px", height: "4px", background: "#a855f7", borderRadius: "2px", marginBottom: "36px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {services.map((svc, idx) => (
              <div key={idx} style={{
                background: "#13131f",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "28px 24px",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: "52px", height: "52px",
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "18px",
                }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#fff" }}>{svc.title}</h3>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.65, margin: 0 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="ynx-section-padding">
        <div className="ynx-cta-banner" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #1a0a2e 0%, #13131f 60%, #1c0f30 100%)",
          border: "1px solid rgba(168,85,247,0.25)",
          borderRadius: "20px",
          padding: "36px 40px",
        }}>
          <div className="ynx-cta-content">
            <div style={{
              width: "52px", height: "52px",
              background: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.4)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <ChatIcon />
            </div>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px", color: "#fff" }}>Ready to start your journey?</h3>
              <p style={{ fontSize: "14px", color: "#aaa", margin: 0 }}>Let's build something great together.</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/get-touch")}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#fff",
              color: "#0a0a12",
              border: "none",
              borderRadius: "50px",
              padding: "14px 30px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e8d5ff"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Let's Talk
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
};

export default YourNextStep;
