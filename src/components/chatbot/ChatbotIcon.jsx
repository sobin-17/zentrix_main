import "./ChatbotIcon.css";

const RobotIcon = ({ size = "100%" }) => (
  <img 
    src={encodeURI("/chatbot logo.png")} 
    alt="Zentrix Chatbot" 
    style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%' }} 
  />
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
        <RobotIcon size="100%" />
      </button>
    );
  }

  if (chatState === "minimized") {
    return (
      <div className="zx-minimized-bar">
        <div className="zx-min-avatar">
          <RobotIcon size="100%" />
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
