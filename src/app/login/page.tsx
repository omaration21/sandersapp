"use client";

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authContext) {
      authContext.login(email, password);

      if (authContext.user && authContext.role) {
        console.log('Usuario autenticado:', authContext.user);
        console.log('Rol del usuario:', authContext.role);

        if (authContext.role === 'Admin') {
          router.push('/dashboard/admin');
        } else if (authContext.role === 'Donor') {
          router.push('/dashboard/donor');
        }
      } else {
        console.log('Error en la autenticación');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center"style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/nopales.jpg')`}}>
      
      <div className="w-full max-w-md bg-[rgba(255,255,255,0.5)] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#202451]">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#202451]">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg text-[#202451]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-[#202451]">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#202451] text-[rgba(255,255,255,0.5)] py-2 rounded-lg hover:bg-[#778DA9] text-[#202451]"
            >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;