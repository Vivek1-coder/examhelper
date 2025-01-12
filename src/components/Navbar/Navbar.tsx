'use client';
import Link from 'next/link';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


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
    <header className="header flex items-center justify-between px-16 py-2  md:text-black bg-white w-full">
      <Link href="/dashboard">
        <img
          src="https://st2.depositphotos.com/1378583/5228/v/950/depositphotos_52283153-stock-illustration-hand-book-logo.jpg"
          alt="logo"
          className="w-10 h-10 object-contain"
        />
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
          } text-white md:text-black hover:text-yellow-400 text-center`}
        >
          Subjects
        </Link>
        <Link
          href="#"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-yellow-400 text-center`}
        >
          Followers
        </Link>
        <Link
          href="#"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-yellow-400 text-center`}
        >
          Notifications
        </Link>
        <Link
          href="#"
          className={`${
            isSmallScreen ? '' : 'nav-link'
          } text-white md:text-black hover:text-yellow-400 text-center`}
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
