
"use client";

import { useToast } from '@/hooks/use-toast';
import './card.css'
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Trash2 } from 'lucide-react';
import mongoose from 'mongoose';
import Link from 'next/link';

interface cardprops{
    thumbnail:string;
    title:string;
    nvideos:number;
    playlistId:string;
    subjectId:string;
    onDelete?: () => void;
}

export function PlaylistCard({thumbnail,title,nvideos,playlistId,subjectId,onDelete}:cardprops) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the subject "${title}"?`
      );
      if (!confirmed) return;
  
      const response = await axios.delete<ApiResponse>(
        `/api/playlist/remove-playlist?playlistId=${playlistId}&subjectId=${subjectId}`
      );
  
      if (response.data.success) {
        toast({
          title: "Deleted",
          description: `"${title}" was successfully deleted.`,
        });
        if (onDelete) onDelete(); // Trigger the refresh callback
      } else {
        console.error("Backend error:", response.data.message);
        throw new Error(response.data.message || "Failed to delete subject.");
      }
    } catch (error: any) {
      console.error("Frontend error:", error.response || error.message);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          (error instanceof Error ? error.message : "An error occurred."),
        variant: "destructive",
      });
    }
  };
  


  return (
    <div className='h-56 w-56 flex flex-col rounded-2xl gap-2 card border justify-center' >
      <Link href={`playlist/${playlistId}`}>
        <div className='flex w-full h-20'>
        <img className = " rounded-t-lg w-full" src={`${thumbnail}`} alt="" />
        </div>
        
        <div className='flex flex-col justify-center w-full h-24 text-center gap-2 '>
        
        <p className='font-bold h-12 w-full text-lg overflow-y-auto '>{title}</p>
        <p className='font-light text-sm'>Videos : {nvideos}</p>
       
        
        </div>
        </Link>
        <button
          onClick={handleDelete}
          className=" text-red-500 rounded-lg flex justify-center "
        >
          <Trash2 />
        </button>
    </div> 
  );
}
