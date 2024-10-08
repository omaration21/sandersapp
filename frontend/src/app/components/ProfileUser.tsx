import React, { useState, useEffect } from "react";
import { useAuth, User } from "../context/AuthContext";
import { updateUser, updateProfileImage } from "../services/api";
import { API_URL } from "../services/api";

export const ProfileUser = () => {
  const { user, setUser } = useAuth();
  const [editableUser, setEditableUser] = useState<User | null>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Recuperar el estado del modo oscuro desde localStorage al cargar el componente
    const savedDarkMode = localStorage.getItem("isDarkMode");
    return savedDarkMode === "true";
  });

  // Asegúrate de que 'editableUser' esté definido antes de usar sus propiedades
  if (!editableUser) {
    return <div>Cargando...</div>;
  }

  const imageUrl = `${API_URL}${editableUser.profile_image_url}`;

  // Guardar los cambios del perfil
  const handleSaveChanges = async () => {
    try {
      await updateUser(editableUser.id, editableUser);

      if (selectedImage) {
        const newProfileImageUrl = await updateProfileImage(editableUser.id, selectedImage);
        setEditableUser({ ...editableUser, profile_image_url: newProfileImageUrl });

        // Actualizar el usuario globalmente en el contexto
        setUser({
          ...editableUser,
          profile_image_url: newProfileImageUrl,
        });
      }

      alert("Perfil actualizado con éxito");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("No se pudo actualizar el perfil");
    }
  };

  // Manejar el cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Manejar el modo oscuro
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", newDarkMode.toString()); // Guardar el estado en localStorage
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Al cargar el componente, aplicar el modo oscuro si estaba activado previamente
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-md transition-colors mt-10">
      <h1 className="text-2xl font-semibold mb-4">Perfil de usuario</h1>

      {/* Imagen del perfil */}
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img
          src={imageUrl}
          alt="Imagen de perfil"
          className="w-36 h-36 rounded-full object-cover"
        />
        {isEditing && <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4" />}
      </div>

      {/* Mostrar el rol del usuario */}
      <p className="mt-4">Rol: {editableUser.role_id === 1 ? "Administrador" : "Donante"}</p>

      {isEditing ? (
        <div className="mt-4">
          <input
            type="text"
            value={editableUser.name}
            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 mb-2"
            placeholder="Nombre"
          />
          <input
            type="email"
            value={editableUser.email}
            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 mb-2"
            placeholder="Correo"
          />
          <input
            type="text"
            value={editableUser.phone}
            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 mb-2"
            placeholder="Teléfono"
          />
          <button onClick={handleSaveChanges} className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded mr-2">
            Guardar Cambios
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p>Nombre: {editableUser.name} </p>
          <p>Correo: {editableUser.email} </p>
          <p>Teléfono: {editableUser.phone} </p>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded">
            Editar
          </button>

          {/* Botón deslizable para modo oscuro */}
          <div className="flex items-center mt-4">
            <span>Modo oscuro:</span>
            <label className="ml-2 relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300">
                <div
                  className={`${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white dark:bg-gray-900 rounded-full transition-transform`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};