
"use client";

import { useToast } from '@/hooks/use-toast';
import './card2.css'
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Trash2, View } from 'lucide-react';
import mongoose from 'mongoose';
import Link from 'next/link';

interface cardprops{
    id:string;
    title:string;
    content:string;
    subjectId:string;
    onDelete?: () => void;
}

export function Notecard({id,title,content,subjectId,onDelete}:cardprops) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the subject "${title}"?`
      );
      if (!confirmed) return;
  
      const response = await axios.delete<ApiResponse>(
        `/api/notes/remove-note?noteId=${id}&subjectId=${subjectId}`
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
    <div className='h-16 w-52 flex items-center justify-between px-2 rounded-2xl gap-2 card border  text-white' >
  
      <a href={`http://drive.google.com/file/d/${content}/view`} target='_blank' >
        <button className='text-blue-500 flex justify-center'>
            <View/>
        </button>
        </a>
        <div className='flex flex-col justify-center w-1/2 h-24 text-center'>
        
        <p className='font-bold text-xl overflow-y-auto '>{title}</p>
       
        
        </div>
       
        <button
          onClick={handleDelete}
          className=" text-red-500 rounded-lg flex justify-center "
        >
          <Trash2 />
        </button>
    </div> 
  );
}
