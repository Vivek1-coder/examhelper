'use client';
import Link from 'next/link';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"




const NavbarQues = () => {
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
    <header className="header flex items-center justify-between px-3 md:px-16 py-2  md:text-white  bg-gradient-to-r from-transparent to-gray-200">
     <Link href="/dashboard">
      <div className='flex gap-3 items-center'>
        <Avatar className=" text-white hover:scale-105">
          <AvatarFallback className='bg-black'>XB</AvatarFallback>
        </Avatar>
      <p className='bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-yellow-300 to-pink-500 max-sm:hidden'>XAM BUDDY</p>
      </div>
      </Link>
    
      
      <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/subject">Subjects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Resource Type</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
      </Breadcrumb>
      
      <Link href="/profile">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </Link>
      
      
      
    </header>
  );
};

export default NavbarQues;
