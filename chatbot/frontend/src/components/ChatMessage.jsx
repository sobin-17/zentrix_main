import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  const isBot = message.sender === "bot";
  return (
    <div className={`zx-msg-row ${isBot ? "zx-msg-row--bot" : "zx-msg-row--user"}`}>
      {isBot && (
        <div className="zx-bot-avatar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M9 11V8a3 3 0 0 1 6 0v3" />
            <circle cx="9" cy="16" r="1.5" />
            <circle cx="15" cy="16" r="1.5" />
          </svg>
        </div>
      )}
      <div className={`zx-bubble ${isBot ? "zx-bubble--bot" : "zx-bubble--user"}`}>
        {message.text}
        <span className="zx-bubble-time">{message.time}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
