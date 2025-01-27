'use client'
import React from 'react';
import Navbar from "@/components/Navbar/Navbar2";
import LogoutButton from '@/components/Signout';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const Page = () => {
  const { data: session } = useSession();
  return (
    <div className="relative w-screen bg-black text-gray-200 font-sans p-0 m-0 text-sm">
      
      <div><Navbar/></div>
    <div className='flex max-md:flex-col justify-between p-4'>
    <div className="profile-nav mt-8 w-full md:w-2/5 h-1/3">
        <div className="w-full h-full bg-yellow-500 text-white rounded-lg py-8 text-center">
          <div className="inline-block rounded-full border-2 transform hover:scale-105">
              <Avatar className='w-40 h-40'>
            <AvatarImage src={session?.user.image} />
            <AvatarFallback>XB</AvatarFallback>
          </Avatar>
          </div>
          <h1 className="text-2xl font-bold mt-2">{session?.user.name || session?.user.username}</h1>
          <p className="text-xs">User&apos;s Bio</p>
          <br />
          <LogoutButton/>
        </div>

      </div>

      <div className="profile-info mt-8 w-full md:w-1/2 h-1/3">
        <div className="bio-graph-heading w-full h-full flex flex-col justify-center items-center p-5 bg-yellow-500 text-white text-center italic rounded-lg">
       
          <h1 className="text-2xl font-light mb-5">Personal Details</h1>
          <div className="bio-row w-1/2 float-left mb-3 px-4">
            <p className="font-semibold">Username:</p>
            <p>{session?.user.name || session?.user.username}</p>
          </div>
          <div className="bio-row w-1/2 float-left mb-3 px-4">
            <p className="font-semibold">Email:</p>
            <p>{session?.user.email}</p>
          </div>
          <div className="bio-row w-1/2 float-left mb-3 px-4">
            <p className="font-semibold">College:</p>
            <p>College Name</p>
          </div>
          <div className="bio-row w-1/2 float-left mb-3 px-4">
            <p className="font-semibold">Location:</p>
            <p>India</p>
          </div>
        
        </div>
       
      </div>
      
      </div>

      <div className="profile-activity mt-4  max-md:h-screen">
        <div className="activity-summary m-3 rounded-lg bg-red-400 text-white text-center py-4">
          <h4 className="text-lg font-light">Activity Summary</h4>
          <p className="text-xs">Recent Activity Overview</p>
        </div>
      </div>
    
    </div>
  );
}

export default Page;
