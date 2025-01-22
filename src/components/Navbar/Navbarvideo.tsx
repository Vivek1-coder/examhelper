'use client';
import Link from 'next/link';
import './Navbar.css';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from 'next-auth/react';



const Navbarvideo = () => {
  const { data: session, status } = useSession();
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
                <BreadcrumbPage>Playing video</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
      </Breadcrumb>
      
      <Link href="/profile">
      <Avatar>
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </Link>
      
      
      
    </header>
  );
};

export default Navbarvideo;
