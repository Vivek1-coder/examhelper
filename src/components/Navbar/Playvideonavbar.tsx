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
import { useParams } from "next/navigation";


const NavbarQues = () => {
   const params = useParams();
    const subjectId = params?.subjectId;
    const playlistId = params?.playlistId;

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  

  useEffect(() => {
    const updateScreenSize = () => setIsSmallScreen(window.innerWidth <= 768);
    updateScreenSize(); // Initialize screen size
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isSmallScreen]);

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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
              <a href={`/dashboard/subject/${subjectId}/notes`}><DropdownMenuItem>Notes</DropdownMenuItem></a>
              <a href={`/dashboard/subject/${subjectId}/pyqs`}><DropdownMenuItem>Pyqs</DropdownMenuItem></a>
              <a href={`/dashboard/subject/${subjectId}/vivaq`}><DropdownMenuItem>Imp ques</DropdownMenuItem></a>
                
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/subject/${subjectId}/playlist`}>Playlists</BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/dashboard/subject/${subjectId}/playlist/${playlistId}`}>Videos</BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Playing Video...</BreadcrumbPage>
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
