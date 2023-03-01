import React from 'react';

export default function DashboardHeader({ handleLogout }) {
  return (
    <div className="flex  justify-between items-center bg-gray-800 px-2 md:px-4 py-3 md:py-4 ">
      <h2 className="text-white text-base md:text-2xl font-bold ml-10">Dashboard</h2>
      <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold">
        Logout
      </button>
    </div>
  );
}
