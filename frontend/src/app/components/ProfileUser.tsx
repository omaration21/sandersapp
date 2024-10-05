"use client";

import React from "react";
import { User } from "../context/AuthContext";

export const ProfileUser = ({user}: {user: User}) => {
    return (
        <div>
            <h1>Perfil de usuario</h1>
            <p>Nombre: {user.name} </p>
            <p>Correo: {user.email} </p>
            <p>Teléfono: {user.phone} </p>
        </div>
    );
};