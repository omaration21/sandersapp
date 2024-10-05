"use client";

import Sidebar from "../../../components/Sidebar";
import { useContext } from "react";
import { ProfileUser } from "../../../components/ProfileUser";
import { AuthContext } from "src/app/context/AuthContext";

const SettingsPage = () => {
    const authContext = useContext(AuthContext);

    if (!authContext || !authContext.user) {
        return <div>No estás autenticado</div>;
    }

    const { user } = authContext;

    return (
        <div className="flex h-screen bg-gray-100">
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