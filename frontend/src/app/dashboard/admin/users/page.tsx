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
  profile_image_url?: string;
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
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmed) {
      try {
        await deleteUser(id);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      } catch (error) {
        console.error("No se pudo eliminar el usuario:", error);
        alert("No se pudo eliminar el usuario");
      }
    }
  };

  const handleCreateUser = () => {
    setIsCreatingUser(true);
  };

  const handleSaveNewUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.password || newUser.role_id === 0) {
      alert("Por favor, completa todos los campos, incluyendo seleccionar un rol.");
      return;
    }

    try {
      await createUser(newUser);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      setIsCreatingUser(false); 
      setNewUser({ id: 0, name: "", email: "", role_id: 0, phone: "", password: "" , profile_image_url: ""});
    } catch (error) {
      console.error("No se pudo crear el usuario:", error);
      alert("No se pudo crear el usuario");
    }
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user); 
    setIsEditingUser(true); 
  };

  const handleSaveEditedUser = async () => {
    if (!userToEdit) return;

    try {
      await updateUser(userToEdit.id, userToEdit); 
      const updatedUsers = await fetchUsers(); 
      setUsers(updatedUsers);
      setIsEditingUser(false); 
      setUserToEdit(null); 
    } catch (error) {
      console.error("No se pudo actualizar el usuario:", error);
      alert("No se pudo actualizar el usuario");
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {authContext?.user && <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />}
      {isSidebarOpen && (<Sidebar />)}

      <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
        <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100">Nombre</th>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100">Email</th>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100">Rol ID</th>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100">Teléfono</th>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 text-gray-900 dark:text-gray-100">{user.name}</td>
                  <td className="p-4 text-gray-900 dark:text-gray-100">{user.email}</td>
                  <td className="p-4 text-gray-900 dark:text-gray-100">{user.role_id}</td>
                  <td className="p-4 text-gray-900 dark:text-gray-100">{user.phone}</td>
                  <td className="p-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={() => handleEditUser(user)}
                    >
                      Editar
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

        {isCreatingUser && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Crear Nuevo Usuario</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <select
              value={newUser.role_id}
              onChange={(e) => setNewUser({ ...newUser, role_id: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            >
              <option value={0}>Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <button onClick={handleSaveNewUser} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Guardar
            </button>
            <button onClick={() => setIsCreatingUser(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
        )}

        {isEditingUser && userToEdit && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Editar Usuario</h3>
            <input
              type="text"
              placeholder="Name"
              value={userToEdit?.name || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={userToEdit?.email || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={userToEdit?.phone || ''}
              onChange={(e) => setUserToEdit({ ...userToEdit, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            />
            <select
              value={userToEdit?.role_id || 0}
              onChange={(e) => setUserToEdit({ ...userToEdit, role_id: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2"
            >
              <option value={0}>Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <button onClick={handleSaveEditedUser} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Guardar
            </button>
            <button onClick={() => setIsEditingUser(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
        )}

        {!isCreatingUser && !isEditingUser && (
          <button
            onClick={handleCreateUser}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Crear Nuevo Usuario
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersPage;