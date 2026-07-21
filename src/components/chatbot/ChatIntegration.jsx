import React, { useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatbotWindow from "./ChatbotWindow";

const ChatIntegration = () => {
  const [chatState, setChatState] = useState("closed");

  const handleStateChange = (newState) => {
    setChatState(newState);
  };

  const handleIconToggle = (newState) => {
    setChatState(newState);
  };

  return (
    <>
      {/* State 2: Full chat window (only renders when open) */}
      <ChatbotWindow
        chatState={chatState}
        onStateChange={handleStateChange}
      />

      {/* State 1 (closed floating btn) + State 3 (minimized bar) */}
      {chatState !== "open" && (
        <ChatbotIcon
          chatState={chatState}
          onToggle={handleIconToggle}
          hasNotification={chatState === "closed"}
        />
      )}
    </>
  );
};

export default ChatIntegration;
