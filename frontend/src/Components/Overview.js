import React from 'react'
import ExerciseCatergories from './exerciseCatergories'
import { useSelector } from 'react-redux';
export default function Overview({user}) {



  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className='h-screen'>
       <h2 className='text-white'>Welcome {user.name}, we hope you enjoy your workout!</h2>
      <ExerciseCatergories />
     
    </div>
  )
}
