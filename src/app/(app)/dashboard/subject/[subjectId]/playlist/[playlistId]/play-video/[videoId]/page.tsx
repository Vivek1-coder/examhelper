'use client'
import Navbarvideo from '@/components/Navbar/Navbarvideo';
import VideoPlayer from '@/components/Videoplayer';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
  const params = useParams();
  const videoId = params?.videoId;
  return (
    <div>
      <div>
      <Navbarvideo/>
      </div>
      <div className='w-full h-1/2'>
      <VideoPlayer videoId={`${videoId}`}/>
      </div>
      
    </div>
  )
}

export default page
