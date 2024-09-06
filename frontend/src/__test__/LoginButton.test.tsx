import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../app/page'; 
import { useRouter } from 'next/navigation';

// Mock de useRouter de Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('HomePage', () => {
  // Crear un mock del useRouter
  const mockPush = jest.fn();
  const mockedUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    // Simular que useRouter retorna un objeto con la función push
    mockedUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('navigates to login page when login button is clicked', () => {
    render(<HomePage />);

    // Verificar que el botón de login está presente en el documento
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Simular el clic en el botón de login
    fireEvent.click(loginButton);

    // Verificar si router.push fue llamado con la ruta correcta
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});