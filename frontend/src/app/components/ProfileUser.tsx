"use client";

import React, { useState, useEffect } from "react";
import { useAuth, User } from "../context/AuthContext";
import { updateUser, updateProfileImage } from "../services/api";
import { API_URL } from "../services/api";

export const ProfileUser = () => {
  const { user, setUser } = useAuth();
  const [editableUser, setEditableUser] = useState<User | null>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Estado para la imagen seleccionada
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para modo oscuro

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
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div>
      <h1>Perfil de usuario</h1>
      {/* Imagen del perfil */}
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img
          src={imageUrl}
          alt="Imagen de perfil"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        {isEditing && <input type="file" accept="image/*" onChange={handleImageChange} />}
      </div>

      {/* Mostrar el rol del usuario */}
      <p>Rol: {editableUser.role_id === 1 ? "Administrador" : "Donante"}</p>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={editableUser.name}
            onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            placeholder="Nombre"
          />
          <input
            type="email"
            value={editableUser.email}
            onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            placeholder="Correo"
          />
          <input
            type="text"
            value={editableUser.phone}
            onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            placeholder="Teléfono"
          />
          <button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            Guardar Cambios
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <p>Nombre: {editableUser.name} </p>
          <p>Correo: {editableUser.email} </p>
          <p>Teléfono: {editableUser.phone} </p>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
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
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700">
                <div
                  className={`${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};