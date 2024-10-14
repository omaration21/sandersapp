import React, { useState, useEffect } from "react";
import { useAuth, User } from "../context/AuthContext";
import { updateUser, updateProfileImage } from "../services/api";
import { API_URL } from "../services/api";
import { FiMoon, FiSun } from "react-icons/fi";

export const ProfileUser = () => {
  const { user, setUser } = useAuth();
  const [editableUser, setEditableUser] = useState<User | null>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    return savedDarkMode === "true";
  });

  if (!editableUser) return <div>Cargando...</div>;

  const imageUrl = `${API_URL}${editableUser.profile_image_url}`;

  const handleSaveChanges = async () => {
    try {
      await updateUser(editableUser.id, editableUser);  // Actualiza los datos del usuario
  
      if (selectedImage) {
        const newProfileImageUrl = await updateProfileImage(editableUser.id, selectedImage);
  
        // Actualiza tanto el usuario editable como el global con la nueva imagen
        setEditableUser({ ...editableUser, profile_image_url: newProfileImageUrl });
        setUser({ ...editableUser, profile_image_url: newProfileImageUrl });
  
        // Limpia la vista previa y la imagen seleccionada
        setPreviewImageUrl(null);
        setSelectedImage(null);
      }
  
      alert("Perfil actualizado con éxito");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("No se pudo actualizar el perfil");
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file); // Guarda la imagen seleccionada
  
      // Muestra la vista previa usando FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string); // Asigna la vista previa
      };
      reader.readAsDataURL(file); // Lee la imagen seleccionada
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedImage(null);
    setPreviewImageUrl(null);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-200 p-10 rounded-3xl shadow-2xl max-w-xl mx-auto mt-12 transition-colors">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
        Perfil de Usuario
      </h1>

      <div className="flex flex-col items-center gap-6">
        <img
          src={previewImageUrl || imageUrl}
          alt="Imagen de perfil"
          className="w-36 h-36 rounded-full object-cover shadow-lg"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 hover:file:bg-blue-200"
          />
        )}
      </div>

      <div className="text-center mt-6 space-y-2 text-lg">
        <p>{editableUser.name}</p>
        <p>{editableUser.email}</p>
        <p>{editableUser.phone}</p>
      </div>

      {isEditing ? (
        <div className="space-y-4 mt-4">
          <input
            type="text"
            value={editableUser.name}
            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre"
          />
          <input
            type="email"
            value={editableUser.email}
            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Correo"
          />
          <input
            type="text"
            value={editableUser.phone}
            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Teléfono"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSaveChanges}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Editar
          </button>
        </div>
      )}

      <div className="flex items-center justify-center mt-8 gap-2">
        <span>Modo oscuro:</span>
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
          {isDarkMode ? (
            <FiSun className="text-yellow-400 w-6 h-6" />
          ) : (
            <FiMoon className="text-blue-500 w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};
