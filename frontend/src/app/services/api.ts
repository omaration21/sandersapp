export const API_URL = 'http://localhost:5001';

export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    phone: string;
    password?: string;
  }

// Obtener todos los usuarios
export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users/get`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  }

// Crear un nuevo usuario
export async function createUser(user: Omit<User, 'id'>): Promise<void> {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
}

// Actualizar usuario
export async function updateUser(id: number, updatedUser: User): Promise<void> {
    const response = await fetch(`${API_URL}/users/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  }

// Eliminar un usuario
export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
}
