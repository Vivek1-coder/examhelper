'use client'
import { Card } from '@/components/card2/Card'
import { Cardcomponent } from '@/components/card2/Card2'
import DialogComponentV from '@/components/Dialog2'
import Navbar from '@/components/Navbar/Navbar'
import { useToast } from '@/hooks/use-toast'
import mongoose from 'mongoose'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

const page = () => {
    
  const params = useParams();
  const subjectId = params?.subjectId;

   
    
  return (
    <div>
      <div className="absolute top-0 w-full">
        <Navbar/>
      </div>
      <div className='w-screen h-screen flex justify-center items-center gap-10'>
        
       
        <Card
        subjectId={subjectId as string}
          title='notes'
          subjectName="Notes"
          likes={0}
          author="Self"
        />
        <Card
        subjectId={subjectId as string}
          title='pyqs'
          subjectName="Pyqs"
          likes={0}
          author="Self"
        />
        <Card
        subjectId={subjectId as string}
          title='vivaq'
          subjectName="Important ques"
          likes={0}
          author="Self"
        />
        <Card
        subjectId={subjectId as string}
          title='playlists'
          subjectName="Playlist"
          likes={0}
          author="Self"
        />
      </div>
    </div>
  )
}

export default page

