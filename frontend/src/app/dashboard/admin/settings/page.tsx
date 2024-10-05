"use client";

import Sidebar from "../../../components/Sidebar";
import { useContext } from "react";
import { ProfileUser } from "../../../components/ProfileUser";
import { AuthContext } from "src/app/context/AuthContext";
import { UpperBar } from "../../../components/UpperBar";

const SettingsPage = () => {
    const authContext = useContext(AuthContext);

    // Asegurándonos de que el authContext y el user no sean nulos antes de renderizar
    if (!authContext?.user) {
        return <div>No estás autenticado</div>;
    }

    const { user } = authContext;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Renderizamos UpperBar */}
            <UpperBar user={user} onToggleSidebar={() => console.log("Toggle Sidebar")} />

            {/* Sidebar */}
            <Sidebar role={user.role_id === 1 ? 'Admin' : 'Donor'} />

            {/* Contenido principal con margen izquierdo */}
            <div className="ml-64 flex-grow p-8 text-black">  
                <h1 className="text-2xl font-semibold mb-6">Configuración</h1>
                {/* Renderiza el componente ProfileUser con el objeto user */}
                <ProfileUser user={user} />
            </div>
        </div>
    );
};

export default SettingsPage;