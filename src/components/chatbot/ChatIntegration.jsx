import React, { useState, lazy, Suspense } from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatbotWindow = lazy(() => import("./ChatbotWindow"));

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
      {/* State 2: Full chat window (lazy loaded on demand) */}
      {chatState === "open" && (
        <Suspense fallback={null}>
          <ChatbotWindow
            chatState={chatState}
            onStateChange={handleStateChange}
          />
        </Suspense>
      )}

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

export default React.memo(ChatIntegration);
