"use client";

import React, { useEffect, useRef, useContext, useState } from "react";
import Sidebar from "src/app/components/Sidebar";
import { UpperBar } from "src/app/components/UpperBar";
import { AuthContext } from "src/app/context/AuthContext";
import { useRouter } from 'next/navigation';

// Declaración global de google para TypeScript
declare global {
    interface Window {
        google: any;
    }
}

const ContactPage = () => {
    const mapRef = useRef(null);
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Redirección si no hay usuario autenticado
    useEffect(() => {
        console.log('Usuario:', authContext?.user);
        console.log('Rol:', authContext?.role);

        if (!authContext?.user) {
            console.log('No se encontró un usuario, redirigiendo al inicio de sesión');
            router.push('/login');
        }
    }, [authContext, router]);

    if (!authContext?.user) {
        return null;
    }

    // Alternar visibilidad del sidebar
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Inicialización del mapa
    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 19.432608, lng: -99.133209 }, // CDMX
                zoom: 15,
            });

            new window.google.maps.Marker({
                position: { lat: 19.438491, lng: -99.173486 }, // Dirección
                map: map,
                title: "Melchor Ocampo 193, Torre A",
            });
        };

        if (window.google) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAkSa_ZhoX94YWxZfoAu6onbfTKdXMwsMQ&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-[#141D32]">
            {/* Barra superior con opción de alternar el sidebar */}
            <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />

            <div className="flex flex-grow">
                {isSidebarOpen && <Sidebar />}
                <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
                    {/* Información de contacto */}
                    <div className="flex flex-col items-center p-6 space-y-4">
                        <h1 className="text-2xl font-bold dark:text-white">Información de Contacto</h1>
                        <div className="text-lg dark:text-white">
                        <p>
                                <strong>Correo:</strong>{" "}
                                <a
                                    href="mailto:sanderoficial@gmail.com"
                                    className="text-blue-500 underline hover:text-blue-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    sanderoficial@gmail.com
                                </a>
                            </p>
                            <p><strong>Dirección:</strong> Melchor Ocampo 193, Torre A, Piso 1, CP 11300, Col. Verónica Anzures</p>
                        </div>
                        {/* Mapa renderizado */}
                        <div ref={mapRef} style={{ width: "100%", height: "400px", marginTop: "20px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;