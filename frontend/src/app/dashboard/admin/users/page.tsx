"use client";

import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../../components/Sidebar";
import { fetchUsers, deleteUser, createUser, updateUser } from "../../../services/api";
import { UpperBar } from "src/app/components/UpperBar";
import { AuthContext } from "src/app/context/AuthContext";

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  phone: string;
  password?: string; 
  profile_image_url: string;
}

const roles = [
  { id: 1, name: "Administrador" },
  { id: 2, name: "Usuario" },
];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false); 
  const [isEditingUser, setIsEditingUser] = useState(false); 
  const [userToEdit, setUserToEdit] = useState<User | null>(null); 
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    role_id: 0,
    phone: '',
    password: '',
    profile_image_url: '',
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    getUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await deleteUser(id);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleCreateUser = () => {
    setIsCreatingUser(true);
  };

  const handleSaveNewUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.password || newUser.role_id === 0) {
      alert("Please fill all fields, including selecting a role.");
      return;
    }

    try {
      await createUser(newUser);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      setIsCreatingUser(false); 
      setNewUser({ id: 0, name: "", email: "", role_id: 0, phone: "", password: "" , profile_image_url: ""});
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user");
    }
  };

  // Función para manejar la edición de un usuario
  const handleEditUser = (user: User) => {
    setUserToEdit(user); 
    setIsEditingUser(true); 
  };

  // Función para guardar los cambios en el usuario editado
  const handleSaveEditedUser = async () => {
    if (!userToEdit) return;

    try {
      await updateUser(userToEdit.id, userToEdit); 
      const updatedUsers = await fetchUsers(); 
      setUsers(updatedUsers);
      setIsEditingUser(false); 
      setUserToEdit(null); 
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user");
    }
  };

  // Estado para controlar la visibilidad del sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Función para alternar la visibilidad del sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
    {authContext?.user && <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />}
    {isSidebarOpen && (<Sidebar role="Admin" />)}
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Gestion de Usuario</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 text-gray-900">Nombre</th>
                <th className="text-left p-4 text-gray-900">Email</th>
                <th className="text-left p-4 text-gray-900">Rol ID</th>
                <th className="text-left p-4 text-gray-900">Telefono</th>
                <th className="text-left p-4 text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{user.name}</td>
                  <td className="p-4 text-gray-900">{user.email}</td>
                  <td className="p-4 text-gray-900">{user.role_id}</td>
                  <td className="p-4 text-gray-900">{user.phone}</td>
                  <td className="p-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={() => handleEditUser(user)} // Llama a la función para editar
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario para Crear Usuario */}
        {isCreatingUser && (
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Crear Nuevo Usuario</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <select
              value={newUser.role_id}
              onChange={(e) => setNewUser({ ...newUser, role_id: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            >
              <option value={0}>Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <button onClick={handleSaveNewUser} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <button onClick={() => setIsCreatingUser(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        )}

        {/* Formulario para Editar Usuario */}
        {isEditingUser && userToEdit && (
          <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Editar Usuario</h3>
            <input
              type="text"
              placeholder="Name"
              value={userToEdit?.name || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={userToEdit?.email || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={userToEdit?.phone || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            />
            <select
              value={userToEdit?.role_id || 0}
              onChange={(e) => setUserToEdit({ ...userToEdit, role_id: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-2"
            >
              <option value={0}>Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <button onClick={handleSaveEditedUser} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <button onClick={() => setIsEditingUser(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        )}

        {!isCreatingUser && !isEditingUser && (
          <button
            onClick={handleCreateUser}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Create New User
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
