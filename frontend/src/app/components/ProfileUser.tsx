"use client";

import React, { useState } from "react";
import { useAuth, User } from "../context/AuthContext";  // Importa User y useAuth
import { updateUser, updateProfileImage } from "../services/api";
import { API_URL } from "../services/api";

export const ProfileUser = () => {
  const { user, setUser } = useAuth();  // Accede a setUser para actualizar el usuario globalmente
  const [editableUser, setEditableUser] = useState<User | null>(user);  // Cambiamos el tipo a 'User | null'
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);  // Estado para la imagen seleccionada

  // Asegúrate de que 'editableUser' esté definido antes de usar sus propiedades
  if (!editableUser) {
    return <div>Cargando...</div>;  // O muestra algún contenido mientras se carga el usuario
  }

  const imageUrl = `${API_URL}${editableUser.profile_image_url}`;

  const handleSaveChanges = async () => {
    try {
      await updateUser(editableUser.id, editableUser);
  
      if (selectedImage) {
        const newProfileImageUrl = await updateProfileImage(editableUser.id, selectedImage);
        setEditableUser({ ...editableUser, profile_image_url: newProfileImageUrl });  // Actualiza la URL de la imagen
  
        // Actualiza el usuario globalmente en el contexto
        setUser({
          ...editableUser,  // Usa editableUser directamente
          profile_image_url: newProfileImageUrl,  // Actualiza la URL de la imagen
        });
      }
  
      alert("Perfil actualizado con éxito");
      setIsEditing(false);  // Termina el modo de edición
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("No se pudo actualizar el perfil");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Perfil de usuario</h1>
      {/* Imagen del perfil */}
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img
          src={imageUrl}
          alt="Imagen de perfil"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        {isEditing && (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        )}
      </div>

      {/* Mostrar el rol del usuario */}
      <p>
        Rol: {editableUser.role_id === 1 ? "Administrador" : "Donante"}
      </p>

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
        </div>
      )}
    </div>
  );
};