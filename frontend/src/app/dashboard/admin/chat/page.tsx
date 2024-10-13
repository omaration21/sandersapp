"use client";

import React, { useState, useContext } from "react";
import Sidebar from "src/app/components/Sidebar";
import { UpperBar } from "src/app/components/UpperBar";
import { ChatBot } from "src/app/components/ChatBot";
import { AuthContext } from "src/app/context/AuthContext";

const ChatBotPage = () => {
  const authContext = useContext(AuthContext);

  // Estado para controlar la visibilidad del Sidebar y UpperBar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUpperBarOpen, setIsUpperBarOpen] = useState(true);

  // Verificación de autenticación
  if (!authContext?.user) {
    return <div>No estás autenticado</div>;
  }

  const { user } = authContext;

  // Función para alternar la visibilidad del Sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#141D32] transition-colors">
      {/* Renderización de UpperBar */}
      {isUpperBarOpen && (
        <UpperBar user={user} onToggleSidebar={handleToggleSidebar} />
      )}

      {/* Sidebar con visibilidad controlada */}
      {isSidebarOpen && <Sidebar />}

      {/* Contenido principal con margen dinámico según el estado del Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-0"
        } flex-grow p-8 transition-all duration-300`}
      >
        {/* Renderización del ChatBot */}
        <ChatBot />
      </div>
    </div>
  );
};

export default ChatBotPage;