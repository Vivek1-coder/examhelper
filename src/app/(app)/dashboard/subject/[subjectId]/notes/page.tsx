import React from 'react'
import Navbar from '@/components/Navbar/Notesnavbar';
const page = () => {
  return (
    <div>
        <div className='relative w-screen h-screen'>
      <div className='absolute top-0 w-full'>
       <Navbar/>
      </div>

        </div>
      
    </div>
  )
}

export default page