export const API_URL = 'https://localhost:5001';

export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    phone: string;
    password?: string;
}

export interface DonationData {
  // Optional: Include ID when retrieving donations
  id?: number;
  amount: number;
  donor_name?: string;
  donor_id?: number;
  type_id?: number;
  comment?: string;
  sector_name?: string;
  sector_id?: number;
   // Optional: Date field
  date?: string;
}

// Fetch all users
export async function fetchUsers(): Promise<User[]> {

    const token = localStorage.getItem('token');

    if (!token)
    {
      throw new Error('No se encontró token. Por favor inicie sesión.')
    }

    const response = await fetch(`${API_URL}/users/get`, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de usuarios');
    }
    return await response.json();
}

// Create a new user
export async function createUser(user: Omit<User, 'id'>): Promise<void> {
  
  const token = localStorage.getItem('token');

  if (!token)
  {
    throw new Error('No se encontró token. Por favor inicie sesión.')
  }
  
  const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('No se pudo crear el usuario');
    }
}

// Update an existing user
export async function updateUser(id: number, updatedUser: User): Promise<void> {
  
  const token = localStorage.getItem('token');

    if (!token)
    {
      throw new Error('No se encontró token. Por favor inicie sesión.')
    }

  const response = await fetch(`${API_URL}/users/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar el usuario');
    }
}

// Delete a user
export async function deleteUser(id: number): Promise<void> {
    
  const token = localStorage.getItem('token');

    if (!token)
    {
      throw new Error('No se encontró token. Por favor inicie sesión.')
    }
  
  const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
    }
}

// Registrar una nueva donación
export async function registerNewDonation(donationData: DonationData): Promise<void>
{
  const token = localStorage.getItem('token');

  if (!token)
  {
    throw new Error('No se encontró token. Por favor inicie sesión.')
  }

  const response = await fetch(`${API_URL}/donations/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(donationData)
  });

  if (!response.ok)
  {
    throw new Error('No se pudo registrar la nueva donación');
  }
}

// Fetch all donations
export async function fetchDonations(): Promise<DonationData[]> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please login.');
  }

  const response = await fetch(`${API_URL}/donations/get`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch donations');
  }

  return await response.json();
}