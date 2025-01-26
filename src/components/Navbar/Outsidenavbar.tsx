'use client';
import Link from 'next/link';
import './Navbar.css';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader } from 'lucide-react';

const NavbarHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [loading,setIsLoading] = useState(false);
    const [loading2,setIsLoading2] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
    updateScreenSize(); // Initialize screen size
    setIsLoading(false);
    setIsLoading2(false);
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <header className="header w-full flex items-center justify-between px-8 md:px-16 py-2 text-white bg-opacity-10  bg-gradient-to-r from-transparent to-gray-200">
      <div className='flex gap-3 items-center'>
        <Avatar className=" text-white ">
          <AvatarFallback className='bg-black'>XB</AvatarFallback>
        </Avatar>
      <p className='bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-yellow-300 to-pink-500 max-sm:hidden'>XAM BUDDY</p>
      </div>
        
      
      <nav className='flex gap-3 md:gap-6'>
        <Link
          href="/sign-up"
        >
        <button className='btn bg-black p-2 rounded-lg w-20 flex justify-center items-center hover:scale-105 hover:bg-gray-900' onClick={()=>{setIsLoading(true)}}>{loading?<Loader className="animate-spin"/>:"Sign Up"}</button>
        </Link>
        <Link
          href="/sign-in"
        >
          <button className='btn bg-black p-2 rounded-lg w-20 flex justify-center items-center hover:scale-105 hover:bg-gray-900' onClick={()=>{setIsLoading2(true)}}>{loading2?<Loader className="animate-spin"/>:"Sign In"}</button>
        </Link>
        
      </nav>
      
      
      
      
    </header>
  );
};

export default NavbarHome;
