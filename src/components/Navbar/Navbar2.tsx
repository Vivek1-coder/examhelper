'use client';
import Link from 'next/link';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react';


const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
    updateScreenSize(); // Initialize screen size
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <header className="header flex items-center justify-between px-16 py-2  md:text-white bg-opacity-10 bg-gradient-to-r from-transparent to-gray-200">
      <Link href="/dashboard">
      <div className='flex gap-3 items-center'>
        <Avatar className=" text-white hover:scale-105">
          <AvatarFallback className='bg-black'>XB</AvatarFallback>
        </Avatar>
      <p className='bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-yellow-300 to-pink-500 max-sm:hidden'>XAM BUDDY</p>
      </div>
      </Link>
      <button
        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`menu ${isMenuOpen ? 'active' : ''} `}>
        <Link
          href="/dashboard/subject"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-white hover:text-slate-950 text-center hover:scale-105`}
        >
          Subjects
        </Link>
        <Link
          href="/dashboard/todo"
          className={`${
            isSmallScreen ? '' : 'nav-link ' 
          } text-white md:text-white hover:text-slate-950 text-center hover:scale-105`}
        >
          Todos
        </Link>
        <Link
          href="/dashboard/notification"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-white hover:text-slate-950 text-center hover:scale-105`}
        >
          Notifications
        </Link>
        <Link
          href="/dashboard/user-groups"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-white hover:text-slate-950 text-center hover:scale-105`}
        >
          Groups
        </Link>
      </nav>
      
      <Link href="/profile">
      <Avatar className='hover:scale-105'>
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </Link>
      
      
      
    </header>
  );
};

export default Navbar;
