"use client";

import { useContext, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ProfileUser } from "../../../components/ProfileUser";
import { AuthContext } from "src/app/context/AuthContext";
import { UpperBar } from "../../../components/UpperBar";

const SettingsPage = () => {
    const authContext = useContext(AuthContext);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (!authContext?.user) {
        return <div>No estás autenticado</div>;
    }

    const { user } = authContext;

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-white dark:bg-[#141D32] transition-colors">
            <UpperBar user={user} onToggleSidebar={handleToggleSidebar} />

            {/* Sidebar */}
            {isSidebarOpen && (
                <Sidebar />
            )}

            <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-grow p-8 text-black dark:text-white`}>  
                <h1 className="text-2xl font-semibold mb-6">Configuración</h1>
                <ProfileUser />
            </div>
        </div>
    );
};

export default SettingsPage;