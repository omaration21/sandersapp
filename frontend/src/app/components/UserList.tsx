// src/components/UserList.tsx
import React from 'react';
import { useData } from '../context/DataProvider';

const UserList: React.FC = () => {
    const { users, loading, error } = useData();

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error cargando usuarios: {error}</p>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    );
};

export default UserList;