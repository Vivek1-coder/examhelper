import NavbarQues from '@/components/Navbar/Navbar'
import Navbar from '@/components/Navbar/Navbar2'
import Typewriter from '@/components/TypingAnimation/Typewriter'
import React from 'react'
import Image from 'next/image'
import Home from '../../../../public/Exambuddy.png'
// import { NavbarComponent } from '@/components/Navbar'

const Dashboard = () => {
  return (
    <div className='relative'>
      <div className="absolute top-0 w-full ">
        <Navbar/>
        </div>
      
        <div className='flex justify-center items-center'>
      <div className=" w-1/2 flex justify-center">
      <div className='w-3/4 rounded-xl ml-6 text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'>
      <p className="text-xl font-medium tracking-wide">
        Take charge of your studies with ease!
      </p>
      <h1 className="text-5xl font-extrabold mt-4">
        
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
          XAM BUDDY
        </span>
      </h1>
      <p className="mt-4 text-lg">
        Your ultimate companion to make preparation
      </p>
      <div className='font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-50 to-red-500 '><Typewriter words={['Structured','Well Planned','Distractionless','Stress Free']}/></div>
    </div>
      </div>
      
      
     <Image src={Home} alt="Home" className='w-1/2 h-screen'/>
    
        </div>
    </div>
    
  )
}

export default Dashboard
