import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationsPage from '../app/dashboard/donor/donations/page';

// Simular el Sidebar
jest.mock('../app/components/Sidebar', () => () => <div>Sidebar Mock</div>);

describe('DonationsPage', () => {
  test('renders the donor registration form', () => {
    render(<DonationsPage />);

    // Verificar que el formulario y los campos se rendericen correctamente
    expect(screen.getByTestId('donor-form')).toBeInTheDocument(); // Usar el testId para el formulario
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número Telefónico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});