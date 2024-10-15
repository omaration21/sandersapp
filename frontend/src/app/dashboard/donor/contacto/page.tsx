"use client";

import React, { useEffect, useRef, useContext, useState } from "react";
import Sidebar from "src/app/components/Sidebar";
import { UpperBar } from "src/app/components/UpperBar";
import { AuthContext } from "src/app/context/AuthContext";
import { useRouter } from 'next/navigation';


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

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 19.432608, lng: -99.133209 }, 
                zoom: 15,
            });
    
            new window.google.maps.Marker({
                position: { lat: 19.438491, lng: -99.173486 }, 
                map: map,
                title: "Melchor Ocampo 193, Torre A",
            });
        };
    
        const loadGoogleMapsScript = (apiKey: string) => {
            if (!document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap"]`)) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            } else {
                console.log("Google Maps API ya está cargada.");
                initMap(); 
            }
        };
    
        const fetchApiKey = async () => {
            try {
                const response = await fetch('https://localhost:5001/api/google-maps-key'); 
                const data = await response.json();
                loadGoogleMapsScript(data.apiKey);
            } catch (error) {
                console.error('Error fetching Google Maps API key:', error);
            }
        };
    
        fetchApiKey();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-[#141D32]">
            <UpperBar user={authContext.user} onToggleSidebar={handleToggleSidebar} />

            <div className="flex flex-grow">
                {isSidebarOpen && <Sidebar />}
                <div className={`flex-1 p-10 ${isSidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
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
                        <div ref={mapRef} style={{ width: "100%", height: "400px", marginTop: "20px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;