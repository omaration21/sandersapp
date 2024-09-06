// src/components/UserList.tsx
import React from 'react';
import { useData } from '../context/DataProvider';

const UserList: React.FC = () => {
    const { users, loading, error } = useData();

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users: {error}</p>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.nombre} - {user.correo}</li>
            ))}
        </ul>
    );
};

export default UserList;