import "./ChatbotIcon.css";

const RobotIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 32 34" fill="white">
    {/* Antenna */}
    <line x1="16" y1="2" x2="16" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="16" cy="1.5" r="1.8" fill="white"/>
    {/* Left ear */}
    <rect x="1" y="14" width="4" height="7" rx="1.5" fill="white" opacity="0.9"/>
    <rect x="2" y="16" width="2" height="3" rx="0.8" fill="rgba(79,70,229,0.7)"/>
    {/* Right ear */}
    <rect x="27" y="14" width="4" height="7" rx="1.5" fill="white" opacity="0.9"/>
    <rect x="28" y="16" width="2" height="3" rx="0.8" fill="rgba(79,70,229,0.7)"/>
    {/* Head */}
    <rect x="5" y="7" width="22" height="19" rx="4" fill="white"/>
    {/* Neck */}
    <rect x="12" y="26" width="8" height="3" rx="1.5" fill="white" opacity="0.7"/>
    {/* Eyes */}
    <rect x="9" y="13" width="5" height="4" rx="1.5" fill="rgba(79,70,229,0.85)"/>
    <rect x="18" y="13" width="5" height="4" rx="1.5" fill="rgba(79,70,229,0.85)"/>
    <circle cx="10.5" cy="14.2" r="0.8" fill="white" opacity="0.6"/>
    <circle cx="19.5" cy="14.2" r="0.8" fill="white" opacity="0.6"/>
    {/* Mouth grille */}
    <rect x="10" y="20" width="12" height="2" rx="1" fill="rgba(79,70,229,0.4)"/>
    <rect x="10" y="20" width="2" height="2" rx="0.5" fill="rgba(79,70,229,0.9)"/>
    <rect x="13.5" y="20" width="2" height="2" rx="0.5" fill="rgba(79,70,229,0.9)"/>
    <rect x="17" y="20" width="2" height="2" rx="0.5" fill="rgba(79,70,229,0.9)"/>
    <rect x="20" y="20" width="2" height="2" rx="0.5" fill="rgba(79,70,229,0.9)"/>
  </svg>
);

const ChatbotIcon = ({ chatState, onToggle, hasNotification }) => {

  if (chatState === "closed") {
    return (
      <button
        className="zx-icon-btn"
        onClick={() => onToggle("open")}
        aria-label="Open Zentrix Assistant"
      >
        {hasNotification && <span className="zx-notif-dot" />}
        <RobotIcon size={26} />
      </button>
    );
  }

  if (chatState === "minimized") {
    return (
      <div className="zx-minimized-bar">
        <div className="zx-min-avatar">
          <RobotIcon size={16} />
        </div>
        <div className="zx-min-info">
          <span className="zx-min-name">Zentrix Assistant</span>
          <span className="zx-min-status">
            <span className="zx-status-dot-sm" /> Online
          </span>
        </div>
        <div className="zx-min-actions">
          <button
            className="zx-min-btn"
            onClick={() => onToggle("open")}
            aria-label="Expand chat"
            title="Open"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            className="zx-min-btn zx-min-btn--close"
            onClick={() => onToggle("closed")}
            aria-label="Close chat"
            title="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatbotIcon;
