"use client";

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: 'Admin' | 'Donor' }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext || !authContext.user || authContext.role !== role) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
