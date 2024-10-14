import React, { useEffect, useState } from "react";
import { User } from "../context/AuthContext";
import { fetchProfileImage } from "../services/api";
import { useRouter } from 'next/navigation';

interface UpperBarProps {
  user: User;
  onToggleSidebar: () => void;
}

export const UpperBar = ({ user, onToggleSidebar }: UpperBarProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const router = useRouter(); // Hook de Next.js para navegación

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

  // Manejar la navegación según el rol del usuario
  const handleProfileClick = () => {
    const route = user.role_id === 1 ? "/dashboard/admin/settings" : "/dashboard/donor/settings";
    router.push(route); // Navegar a la ruta correspondiente
  };

  return (
    <header className="bg-[#202451] dark:bg-gray-900 text-white dark:text-gray-300 py-6 shadow-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 transition-colors">
      {/* Botón con 3 líneas para mostrar/ocultar sidebar */}
      <button onClick={onToggleSidebar} className="text-white dark:text-gray-300 focus:outline-none">
        <div className="space-y-2">
          <span className="block w-8 h-0.5 bg-white dark:bg-gray-300"></span>
          <span className="block w-8 h-0.5 bg-white dark:bg-gray-300"></span>
          <span className="block w-8 h-0.5 bg-white dark:bg-gray-300"></span>
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
       <div className="relative group">
  <button onClick={handleProfileClick} className="focus:outline-none">
    <div className="text-white dark:text-gray-300 font-semibold">
      {user.name}
    </div>
  </button>

  {/* Tooltip */}
  <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
    Haz clic para ir a la configuración
  </div>
</div>
      </div>
    </header>
  );
};