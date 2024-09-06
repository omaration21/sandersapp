import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationsPage from '../app/dashboard/donor/donations/page';
import { useRouter } from 'next/navigation';

// Mock de useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DonationsPage with Sidebar', () => {
  // Configurar el mock del useRouter
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the donor registration form and sidebar', () => {
    render(<DonationsPage />);

    // Verificar que el formulario de donaciones se renderice correctamente
    expect(screen.getByTestId('donor-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número Telefónico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    // Verificar que el Sidebar se renderiza correctamente
    expect(screen.getByText(/Donor Dashboard/i)).toBeInTheDocument(); // Verificar título del dashboard
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument(); // Verificar el enlace de "Dashboard"
    expect(screen.getByRole('link', { name: /Donations/i })).toBeInTheDocument(); // Verificar el enlace de "Donations"
    expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument(); // Verificar el enlace de "Settings"
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument(); // Verificar el botón de "Logout"
  });
});