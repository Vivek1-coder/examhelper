"use client";
import Link from "next/link";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";


const NotesNavbar = () => {
   const params = useParams();
       const subjectId = params?.subjectId;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
    updateScreenSize(); // Initialize screen size
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <header className="header flex items-center justify-between px-16 py-2  md:text-white  bg-gradient-to-r from-black to-gray-100">
      <Link href="/dashboard">
        <Avatar className=" text-black">
          <AvatarFallback>XB</AvatarFallback>
        </Avatar>
      </Link>

      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
              <a href={`/dashboard/subject/${subjectId}/vivaq`}><DropdownMenuItem>Imp ques</DropdownMenuItem></a>
              <a href={`/dashboard/subject/${subjectId}/pyqs`}><DropdownMenuItem>Pyqs</DropdownMenuItem></a>
              <a href={`/dashboard/subject/${subjectId}/playlist`}><DropdownMenuItem>Playlist</DropdownMenuItem></a>
                
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Notes</BreadcrumbPage>
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

export default NotesNavbar;
