"use client";

import React, { useEffect, useState } from "react";
import { User } from "../context/AuthContext";
import { fetchProfileImage } from "../services/api";

interface UpperBarProps {
  user: User;
  onToggleSidebar: () => void;
}

export const UpperBar = ({ user, onToggleSidebar }: UpperBarProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (user.profile_image_url) {
          const imageUrl = await fetchProfileImage(user.profile_image_url);
          setProfileImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error loading profile image", error);
      }
    };

    loadImage();
  }, [user.profile_image_url]);

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

      {/* Contenedor del nombre y la imagen */}
      <div className="flex items-center space-x-4">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        )}
        <div className="text-white font-semibold">{user.name}</div>
      </div>
    </header>
  );
};