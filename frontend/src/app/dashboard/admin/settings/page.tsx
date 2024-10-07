"use client";

import { useContext, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ProfileUser } from "../../../components/ProfileUser";
import { AuthContext } from "src/app/context/AuthContext";
import { UpperBar } from "../../../components/UpperBar";

const SettingsPage = () => {
    const authContext = useContext(AuthContext);

    // Estado para controlar la visibilidad del sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Asegurándonos de que el authContext y el user no sean nulos antes de renderizar
    if (!authContext?.user) {
        return <div>No estás autenticado</div>;
    }

    const { user } = authContext;

    // Función para alternar la visibilidad del sidebar
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Renderizamos UpperBar */}
            <UpperBar user={user} onToggleSidebar={handleToggleSidebar} />

            {/* Sidebar */}
            {isSidebarOpen && (
                <Sidebar />
            )}

            {/* Contenido principal con margen izquierdo dinámico */}
            <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-grow p-8 text-black`}>  
                <h1 className="text-2xl font-semibold mb-6">Configuración</h1>
                {/* Renderiza el componente ProfileUser con el objeto user */}
                <ProfileUser />
            </div>
        </div>
    );
};

export default SettingsPage;