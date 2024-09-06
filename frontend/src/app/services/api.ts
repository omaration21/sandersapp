// src/services/api.ts
export const API_URL = 'http://localhost:5001';

export interface User {
    id: number;
    nombre: string;
    correo: string;
    clave: string;
    cargo: number;
    cel: number;
}

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
}