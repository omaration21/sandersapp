import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aplicación Fundación Sanders',
  description: 'Generado por la aplicación de la Fundación Sanders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="es">
        <body className={inter.className} style={{ backgroundColor: '#1F244D' }}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}