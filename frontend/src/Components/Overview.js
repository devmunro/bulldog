import React from 'react'
import ExerciseCatergories from './exerciseCatergories'

export default function Overview({user}) {


  console.log(user)
  return (
    <div className='h-screen'>
      <ExerciseCatergories />
    </div>
  )
}
