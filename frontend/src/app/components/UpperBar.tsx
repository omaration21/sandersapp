"use client";

import React from "react";
import { User } from "../context/AuthContext";

interface UpperBarProps {
    user: User;
    onToggleSidebar: () => void; 
}

export const UpperBar = ({ user, onToggleSidebar }: UpperBarProps) => {
    return (
        <header className="bg-[#202451] text-white py-6 shadow-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6">
            {/* Botón con 3 líneas para mostrar/ocultar sidebar */}
            <button onClick={onToggleSidebar} className="text-white focus:outline-none">
                <div className="space-y-2">
                    <span className="block w-8 h-0.5 bg-white"></span>
                    <span className="block w-8 h-0.5 bg-white"></span>
                    <span className="block w-8 h-0.5 bg-white"></span>
                </div>
            </button>

            {/* Nombre del usuario */}
            <div className="text-white font-semibold">
                {user.name}
            </div>
        </header>
    );
};