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
        {/* Usamos las clases dark y bg para cambiar el fondo según el modo */}
        <body className={`${inter.className} bg-white dark:bg-[#141D32] transition-colors`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}