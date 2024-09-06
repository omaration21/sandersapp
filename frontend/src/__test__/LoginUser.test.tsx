import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/login/page';
import { AuthContext } from '../app/context/AuthContext';
import { useRouter } from 'next/navigation';

// Mock de useRouter de Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  // Mock del contexto de autenticación
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();
  const mockPush = jest.fn();
  const mockUser = null; // No hay usuario logueado inicialmente
  const mockRole = null; // El rol también es nulo al iniciar

  // Crear una constante para el mock de useRouter
  const mockedUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockedUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <AuthContext.Provider value={{ login: mockLogin, logout: mockLogout, user: mockUser, role: mockRole }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Verificar si los campos de email y password se renderizan correctamente
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error when login fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); 

    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AuthContext.Provider value={{ login: mockLogin, logout: mockLogout, user: mockUser, role: mockRole }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Simular la entrada de datos en los campos de email y password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    // Simular la acción de submit del formulario
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Verificar si se muestra el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error en la autenticación/i)).toBeInTheDocument();
    });

    // Verificar si login fue llamado con los argumentos correctos
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');

    consoleSpy.mockRestore();
  });

  test('redirects to home page on successful login', async () => {
    mockLogin.mockResolvedValueOnce(null); // Simular que la autenticación fue exitosa

    render(
      <AuthContext.Provider value={{ login: mockLogin, logout: mockLogout, user: mockUser, role: mockRole }}>
        <LoginPage />
      </AuthContext.Provider>
    );

    // Simular la entrada de datos en los campos de email y password
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });

    // Simular la acción de submit del formulario
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Verificar si login fue llamado con los argumentos correctos
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
    });

    // Verificar si se llamó a router.push para redirigir al usuario
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});