import React, { useState, useEffect } from "react";
import { useAuth, User } from "../context/AuthContext";
import { updateUser, updateProfileImage } from "../services/api";
import { API_URL } from "../services/api";

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

  if (!editableUser) {
    return <div>Cargando...</div>;
  }

  const imageUrl = `${API_URL}${editableUser.profile_image_url}`;

  const handleSaveChanges = async () => {
    try {
      await updateUser(editableUser.id, editableUser);
      if (selectedImage) {
        const newProfileImageUrl = await updateProfileImage(editableUser.id, selectedImage);
        setEditableUser({ ...editableUser, profile_image_url: newProfileImageUrl });
        setUser({
          ...editableUser,
          profile_image_url: newProfileImageUrl,
        });
        setPreviewImageUrl(null);
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
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-6 rounded-lg shadow-md transition-colors mt-10">
      <h1 className="text-2xl font-semibold mb-4">Perfil de usuario</h1>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img
          src={previewImageUrl || imageUrl}
          alt="Imagen de perfil"
          className="w-36 h-36 rounded-full object-cover"
        />
        {isEditing && <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />}
      </div>
      <p className="mt-4">Rol: {editableUser.role_id === 1 ? "Administrador" : "Donante"}</p>
      {isEditing ? (
        <div className="mt-4">
          <input
            type="text"
            value={editableUser.name}
            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
            className="w-full p-2 border border-gray-400 dark:border-gray-500 rounded text-gray-900 dark:text-gray-300 mb-2 bg-gray-100 dark:bg-gray-700"
            placeholder="Nombre"
          />
          <input
            type="email"
            value={editableUser.email}
            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
            className="w-full p-2 border border-gray-400 dark:border-gray-500 rounded text-gray-900 dark:text-gray-300 mb-2 bg-gray-100 dark:bg-gray-700"
            placeholder="Correo"
          />
          <input
            type="text"
            value={editableUser.phone}
            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
            className="w-full p-2 border border-gray-400 dark:border-gray-500 rounded text-gray-900 dark:text-gray-300 mb-2 bg-gray-100 dark:bg-gray-700"
            placeholder="Teléfono"
          />
          <button onClick={handleSaveChanges} className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded mr-2">
            Guardar Cambios
          </button>
          <button onClick={handleCancel} className="bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p>Nombre: {editableUser.name} </p>
          <p>Correo: {editableUser.email} </p>
          <p>Teléfono: {editableUser.phone} </p>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded">
            Editar
          </button>
          <div className="flex items-center mt-4">
            <span>Modo oscuro:</span>
            <label className="ml-2 relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300">
                <div
                  className={`${isDarkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white dark:bg-gray-200 rounded-full transition-transform`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
