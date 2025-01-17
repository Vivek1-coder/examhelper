'use client';
import Link from 'next/link';
import Home from '../../../public/Exambuddy.png'
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';

const Navbar = () => {
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
    <header className="header flex items-center justify-between px-16 py-2  md:text-white bg-gradient-to-r from-black to-gray-100">
      <Link href="/dashboard">
      <Avatar className=' text-black'>
        <AvatarFallback>XB</AvatarFallback>
      </Avatar>
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
      <nav className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <Link
          href="/dashboard/subject"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-white text-center`}
        >
          Subjects
        </Link>
        <Link
          href="#"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-white text-center`}
        >
          Followers
        </Link>
        <Link
          href="#"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-white text-center`}
        >
          Notifications
        </Link>
        <Link
          href="#"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-white text-center`}
        >
          Groups
        </Link>
      </nav>
      
      <Link href="/profile">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </Link>
      
      
      
    </header>
  );
};

export default Navbar;
