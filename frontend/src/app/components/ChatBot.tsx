"use client";

import React, { useState, useEffect } from "react";
import { getResponseFromGPT } from "../services/api";

// Define el tipo de mensaje
interface Message {
  role: string;
  content: string;
}

export const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    return savedDarkMode === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getResponseFromGPT(input);
      const botMessage: Message = { role: "bot", content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const err = error as { message: string };
      console.error("Error:", err.message);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Hubo un problema, intenta de nuevo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-[75px] w-full h-[90%] bg-gray-200 rounded-lg dark:bg-gray-900 text-black dark:text-gray-200 transition-colors">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-xl font-semibold">ChatBot</h1>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex p-4 border-t border-gray-300 dark:border-gray-700">
        <input
          type="text"
          className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-600 mr-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;