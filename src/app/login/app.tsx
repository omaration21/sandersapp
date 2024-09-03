// src/App.tsx
import React from 'react';
import { DataProvider } from '../context/DataProvider';
import UserList from '../components/UserList'; 

function App() {
    return (
        <DataProvider>
            <div className="App">
                <h1>User List</h1>
                <UserList />
            </div>
        </DataProvider>
    );
}

export default App;