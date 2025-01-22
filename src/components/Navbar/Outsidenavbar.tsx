'use client';
import Link from 'next/link';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    <header className="header flex items-center justify-between px-16 py-2  md:text-white  bg-gradient-to-r from-black to-gray-100">
      <div className='flex gap-3 items-center'>
      <Link href="/dashboard">
        <Avatar className=" text-black">
          <AvatarFallback>XB</AvatarFallback>
        </Avatar>
      </Link>
      <p className='bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-400 to-violet-800'>Xam Buddy</p>
      </div>
        
      
      <nav className='flex gap-6'>
        <Link
          href="/sign-up"
        >
        <button className='btn bg-blue-500 p-2 rounded-lg w-20 flex justify-center items-center' onClick={()=>{setIsLoading(true)}}>{loading?<Loader className="animate-spin"/>:"Sign Up"}</button>
        </Link>
        <Link
          href="/sign-in"
        >
          <button className='btn bg-blue-500 p-2 rounded-lg w-20 flex justify-center items-center' onClick={()=>{setIsLoading2(true)}}>{loading2?<Loader className="animate-spin"/>:"Sign In"}</button>
        </Link>
        
      </nav>
      
      
      
      
    </header>
  );
};

export default NavbarHome;
