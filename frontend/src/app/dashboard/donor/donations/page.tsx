"use client";

import React, { useContext, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { AuthContext } from '../../../context/AuthContext';
import { registerNewDonation } from '../../../services/api';

const DonationsPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
  {
    return <div>Cargando...</div>
  }

  const { user } = authContext;

  const [formData, setFormData] = useState({
    amount: '',
    comment: '',
    sector_id: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : Number(value), // Permitir vacío si no hay valor
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user)
    {
      console.error('No se encontró un usuario logueado');
      return;
    }

    const donationData = {
      amount: formData.amount,
      donor_id: user.id,
      // A donation from user (donor) always will in web manner
      type_id: 2,
      comment: formData.comment,
      sector_id: formData.sector_id,
    }

    try
    {
      await registerNewDonation(donationData);
      console.log('Donación registrada exitsamente');
    }
    catch(error)
    {
      console.log('Form Submitted: ', formData);
      console.error('Error al registrar la donación:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="Donor"/>
      <div className="flex-1 p-10">
        <form data-testid="donor-form" onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#202451]">Registro de donación</h2>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-[#202451]">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 custom-input text-black"
              placeholder="Introduce el monto"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-[#202451]">Comentario</label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              placeholder="Describe tu donación"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sector_id" className="block text-sm font-medium text-[#202451]">Sector deseado</label>
            <select
              id="sector_id"
              name="sector_id"
              value={formData.sector_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
            >
              <option value={1}>Water</option>
              <option value={2}>Sexuality</option>
              <option value={3}>Education</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#202451] text-white font-semibold rounded-md hover:bg-[#778DA9] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationsPage;