import React from 'react'
import RegisterForm from './UserForms/userRegistration'

export default function Home() {
  return (
    <div className='h-screen' >
      
      <div className="bg-[#2B2946] h-1/2" ></div>
      <div className="bg-black h-1/2"></div>
      <div className='absolute bg-white inset-40 ring-4 shadow-2xl	'>

        <RegisterForm/>
      </div>
    </div>
  )
}
