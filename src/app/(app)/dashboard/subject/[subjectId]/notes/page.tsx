'use client';

import React, { useState, JSX, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AddNotes from '@/components/AddNotes';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { Note } from '@/model/Note.model';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { Notecard } from '@/components/card2/NoteCard';
import NotesNavbar from '@/components/Navbar/Notesnavbar';
import Gsignin from '@/components/Gsignin';

const Page = () => {
  const [notes,setNotes] = useState<Note[]>([]);
  const { data: session } = useSession();
  const [isPublic,setIsPublic] = useState(false);
  const [resultMessage, setResultMessage] = useState<JSX.Element | null>(null);
  const [isSubjectLoading,setIsSubjectsLoading] = useState(true);
  const {toast} = useToast();
  const params = useParams();
  const subjectId = params?.subjectId;

  
  const fetchStatus = async () => {
      try {
        const result = await axios.get<ApiResponse>(`/api/subject/get-status?subjectId=${subjectId}`);
        if (result.data.message === "Public") {
          setIsPublic(true);
        }
      } catch (error) {
        console.error("Failed to fetch subject status", error);
      }
    };
  
  const refreshData = useCallback(async() => {
    try {
      setIsSubjectsLoading(true);
      const response = await axios.get<ApiResponse>(`/api/notes/get-note?subjectId=${subjectId}`)

      const fetchedNotes = response.data.notes || []
      setNotes(fetchedNotes)
      setIsSubjectsLoading(false);
    } catch (error) {
          setIsSubjectsLoading(false);
          const axiosError = error as AxiosError<ApiResponse>;
          toast({
            title: "Error",
            description:
              axiosError.response?.data.message || "Failed to fetch subjects",
            variant: "destructive",
          });
        }
      }, [toast]);

  useEffect(() => {
    fetchStatus();
    refreshData();
          
      }, [refreshData,subjectId]);
      
  return (
    <div className='w-screen h-screen relative'>
      <div className='absolute top-0 w-full'>
        <NotesNavbar/>
      </div>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-3/4 h-3/4 flex flex-wrap justify-center gap-4'>
        {
          session?.user?.accessToken ? <></> : <>{isSubjectLoading?<></>:<Gsignin/>}</>
        }
        {
          notes.map((note)=>(
            <Notecard key={note._id as string} 
              id={note._id as string}
              title={note.name}
              content={note.content}
              subjectId={subjectId as string}
              onDelete={refreshData}
            />
          ))
        }
        </div>
        
      </div>
      {!isPublic && (<div className='absolute top-16 right-4'><AddNotes onAdd={refreshData}/></div>)}
      
    </div>
  );
};

export default Page;
