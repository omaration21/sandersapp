import React, { useState } from "react";
import { getResponseFromGPT } from "../services/api";

// Define el tipo de mensaje
interface Message {
  role: string;
  content: string;
}

export const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>(""); // Estado para el input del usuario
  const [messages, setMessages] = useState<Message[]>([]); // Estado para almacenar los mensajes
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para manejar la carga

  // Manejar el envío de la pregunta
  const handleSendMessage = async () => {
    if (!input.trim()) return; // No enviar mensajes vacíos

    const newMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Mostrar la pregunta del usuario

    setInput(""); // Limpiar el input
    setIsLoading(true); // Mostrar indicador de carga

    try {
      const response = await getResponseFromGPT(input); // Llamar al servicio de GPT
      const botMessage: Message = { role: "bot", content: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Mostrar la respuesta del bot
    } catch (error) {
        const err = error as { message: string }; // Afirmación de tipo
        console.error("Error:", err.message);
        const errorMessage: Message = {
          role: "bot",
          content: "Hubo un problema, intenta de nuevo.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false); // Ocultar el indicador de carga
    }
  };

  // Renderizar el componente
  return (
    <div className="chatbot-container p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="chat-messages mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.role === "user" ? "text-right" : "text-left"
            } my-2`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 rounded-lg border border-gray-300 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;