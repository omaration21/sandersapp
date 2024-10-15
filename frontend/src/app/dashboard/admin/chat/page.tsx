"use client";

import React, { useState, useContext } from "react";
import Sidebar from "src/app/components/Sidebar";
import { UpperBar } from "src/app/components/UpperBar";
import { ChatBot } from "src/app/components/ChatBot";
import { AuthContext } from "src/app/context/AuthContext";

const ChatBotPage = () => {
  const authContext = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUpperBarOpen, setIsUpperBarOpen] = useState(true);

  if (!authContext?.user) {
    return <div>No estás autenticado</div>;
  }

  const { user } = authContext;

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#141D32] transition-colors">
      {isUpperBarOpen && (
        <UpperBar user={user} onToggleSidebar={handleToggleSidebar} />
      )}
      {isSidebarOpen && <Sidebar />}
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-0"
        } flex-grow p-8 transition-all duration-300`}
      >
        <ChatBot />
      </div>
    </div>
  );
};

export default ChatBotPage;