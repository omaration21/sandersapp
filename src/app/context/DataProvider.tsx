"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchUsers, User } from "../services/api";

interface DataContextProps {
    users: User[];
    loading: boolean;
    error: string | null;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: {children: ReactNode}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            }
            catch (error) {
                setError((error as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    return (
        <DataContext.Provider value={{ users, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextProps => {
    const context = useContext(DataContext);
    if ( context === undefined ) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}