import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  const isBot = message.sender === "bot";
  return (
    <div className={`zx-msg-row ${isBot ? "zx-msg-row--bot" : "zx-msg-row--user"}`}>
      {isBot && (
        <div className="zx-bot-avatar">
          <img 
            src={encodeURI("/chatbot logo.png")} 
            alt="AI" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
          />
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
