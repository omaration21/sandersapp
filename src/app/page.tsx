import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </div>
        <nav className="mt-5">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Users
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Settings
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            Reports
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 1</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 2</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 3</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Card 4</h3>
            <p className="mt-2">Content goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
