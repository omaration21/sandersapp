export const API_URL = "https://localhost:5001";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  phone: string;
  password?: string;
  profile_image_url?: string;
}

export interface DonationData {
  id?: number;
  amount: string;
  donor_name?: string;
  donor_id?: number;
  type_id?: number;
  comment?: string;
  sector_name?: string;
  sector_id?: number;
  date?: string;
  type_name?: string;
}

// Function to check if the actual token has expired
function isTokenExpired(token: string): boolean {
  const decoded: TokenPayload = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

// Function to refresh token
async function refreshAccessToken(token: string): Promise<string> {
  const response = await fetch(`${API_URL}/users/refreshToken`, {
    method: "POST",
    body: JSON.stringify(token),
  });

  if (!response.ok) {
    throw new Error("No se pudo refrescar el token");
  }

  const data = await response.json();

  Cookies.set("token", data.token);
  Cookies.set("refreshToken", data.refreshToken);

  return data.token;
}

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  let token = Cookies.get("token");

  if (!token) {
    throw new Error("No se encontró token. Por favor inicie sesión.");
  }

  if (isTokenExpired(token)) {
    const refreshToken = Cookies.get("refreshToken");
    token = await refreshAccessToken(refreshToken || "");
    console.log(token);
  }

  const response = await fetch(`${API_URL}/users/get`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de usuarios");
  }
  return await response.json();
}

// Create a new user
export async function createUser(user: Omit<User, "id">): Promise<void> {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'No se pudo crear el usuario');
  }
}

// Update an existing user
export async function updateUser(id: number, updatedUser: User): Promise<void> {
  let token = Cookies.get("token");

  if (!token) {
    throw new Error("No se encontró token. Por favor inicie sesión.");
  }

  if (isTokenExpired(token)) {
    const refreshToken = Cookies.get("refreshToken");
    token = await refreshAccessToken(refreshToken || "");
  }

  const response = await fetch(`${API_URL}/users/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el usuario");
  }
}

// Delete a user
export async function deleteUser(id: number): Promise<void> {
  let token = Cookies.get("token");

  if (!token) {
    throw new Error("No se encontró token. Por favor inicie sesión.");
  }

  if (isTokenExpired(token)) {
    const refreshToken = Cookies.get("refreshToken");
    token = await refreshAccessToken(refreshToken || "");
  }

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el usuario");
  }
}

// Registrar una nueva donación
export async function registerNewDonation(
  donationData: DonationData
): Promise<void> {
  let token = Cookies.get("token");

  if (!token) {
    throw new Error("No se encontró token. Por favor inicie sesión.");
  }

  if (isTokenExpired(token)) {
    const refreshToken = Cookies.get("refreshToken");
    token = await refreshAccessToken(refreshToken || "");
  }

  const response = await fetch(`${API_URL}/donations/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donationData),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar la nueva donación");
  }
}

// Fetch all donations
export async function fetchDonations(): Promise<DonationData[]> {
  let token = Cookies.get("token");

  if (!token) {
    throw new Error("No token found. Please login.");
  }

  if (isTokenExpired(token)) {
    const refreshToken = Cookies.get("refreshToken");
    token = await refreshAccessToken(refreshToken || "");
  }

  const response = await fetch(`${API_URL}/donations/get`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch donations");
  }

  return await response.json();
}

// Method to get a profile image
export async function fetchProfileImage(
  profile_image_url: string
): Promise<string> {
  try {
    // Hacer la solicitud a la URL de la imagen
    const response = await fetch(`${API_URL}${profile_image_url}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener la imagen de perfil");
    }

    return `${API_URL}${profile_image_url}`;
  } catch (error) {
    console.error("Error fetching profile image: ", error);
    throw error;
  }
}

// Función para actualizar la imagen de perfil
export async function updateProfileImage(userId: number, imageFile: File): Promise<string> {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("No se encontró token. Por favor inicie sesión.");
  }

  const formData = new FormData();
  formData.append("profileImage", imageFile);

  const response = await fetch(`${API_URL}/users/${userId}/uploadProfileImage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar la imagen de perfil");
  }

  const data = await response.json();
  return data.profile_image_url; // Retorna la nueva URL de la imagen de perfil
}

export async function getDonationsByUser(userId: number): Promise<DonationData[]> {
  let token = Cookies.get("token");

  if (!token) {
    throw new Error("No se encontró token. Por favor inicie sesión.");
  }

  if (isTokenExpired(token)) {
    const refreshToken = Cookies.get("refreshToken");
    token = await refreshAccessToken(refreshToken || "");
  }

  const response = await fetch(`${API_URL}/donations/getByUser/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las donaciones");
  }

  return await response.json();
}
