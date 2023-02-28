import React from 'react';

export default function DashboardHeader({ handleLogout }) {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4">
      <h2 className="text-white text-lg md:text-2xl font-bold">Dashboard</h2>
      <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold">
        Logout
      </button>
    </div>
  );
}
