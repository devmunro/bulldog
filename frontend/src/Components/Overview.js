import React from 'react';
import { useSelector } from 'react-redux';


export default function Overview({ user }) {
 
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Welcome {user.name}, we hope you enjoy your workout!</h2>
      
    </div>
  );
}
