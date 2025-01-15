import NavbarQues from '@/components/Navbar/Navbar'
import Navbar from '@/components/Navbar/Navbar2'
import Typewriter from '@/components/TypingAnimation/Typewriter'
import React from 'react'
// import { NavbarComponent } from '@/components/Navbar'

const Dashboard = () => {
  return (
    <div className='relative'>
      <div className="absolute top-0 w-full ">
        <Navbar/>
        </div>
      
        <div className='flex justify-center items-center'>
      <div className=" w-1/2 rounded-xl ml-6 text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <p className="text-xl font-medium tracking-wide">
        Take charge of your studies with ease!
      </p>
      <h1 className="text-5xl font-extrabold mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
          EXAM BUDDY
        </span>
      </h1>
      <p className="mt-4 text-lg">
        Your ultimate companion to make preparation
      </p>
      <div className='font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-50 to-red-500 '><Typewriter words={['Structured','Well Planned','Distractionless','Stress Free']}/></div>
    </div>
    <div className='w-1/2 h-screen flex items-center justify-center'>
        <img src="https://st2.depositphotos.com/1378583/5228/v/950/depositphotos_52283153-stock-illustration-hand-book-logo.jpg" className='w-1/2'/>
        </div>
    </div>
    </div>
  )
}

export default Dashboard
