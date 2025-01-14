import NavbarQues from '@/components/Navbar/Navbar'
import Navbar from '@/components/Navbar/Navbar2'
import React from 'react'
// import { NavbarComponent } from '@/components/Navbar'

const Dashboard = () => {
  return (
    <div className='relative'>
      <div className="absolute top-0 w-full ">
        <Navbar/>
        </div>
      
      <div className='flex justify-center items-center'>
        <div className='text-center w-1/2 h-screen flex justify-center items-center '>
        <div className='bg-gray-500 p-5 rounded-lg'>
          <p className='font-medium text-xl'>Manage Your Exam preparations</p>
          <br />
          <p className='font-bold text-2xl'>Exam Buddy</p>

        </div>
        </div>
        <div className='w-1/2 h-screen flex items-center justify-center'>
        <img src="https://st2.depositphotos.com/1378583/5228/v/950/depositphotos_52283153-stock-illustration-hand-book-logo.jpg" className='w-1/2'/>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
