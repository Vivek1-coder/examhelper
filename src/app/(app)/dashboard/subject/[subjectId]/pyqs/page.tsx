'use client';

import React, { useState, JSX, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AddNotes from '@/components/AddNotes';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';

import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { Notecard } from '@/components/card2/NoteCard';
import NotesNavbar from '@/components/Navbar/Notesnavbar';
import { PYQ } from '@/model/PYQ.model';
import AddPyqs from '@/components/AddPyqs';
import PyqsNavbar from '@/components/Navbar/Pyqnavbar';
import { PyqCard } from '@/components/card2/PyqCard';
import Gsignin from '@/components/Gsignin';
import { LoaderPinwheel } from 'lucide-react';

const Page = () => {
  const [pyqs,setPyqs] = useState<PYQ[]>([]);
  const { data: session } = useSession();
  const [resultMessage, setResultMessage] = useState<JSX.Element | null>(null);
  const [isPyqLoading,setIsPyqLoading] = useState(true);
  const [isPublic,setIsPublic] = useState(false);
  const [loading,setIsLoading] = useState(true);
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
    }finally{
      setIsLoading(false);
    }
  };

  const {toast} = useToast();
  const refreshData = useCallback(async() => {
    try {
      setIsPyqLoading(true);
      const response = await axios.get<ApiResponse>(`/api/pyqs/get-pyq?subjectId=${subjectId}`)

      const fetchedPyqs = response.data.pyqs || []
      setPyqs(fetchedPyqs)
      setIsPyqLoading(false);
    } catch (error) {
          setIsPyqLoading(false);
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
        <PyqsNavbar/>
      </div>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-3/4 h-3/4 flex flex-wrap justify-center gap-4'>
        {
          isPyqLoading&&(<LoaderPinwheel className='animate-spin text-white'/>)
        }
        {
          !session?.user?.accessToken&&!isPublic&&!isPyqLoading&&(<Gsignin/>)
        }
        {
          pyqs.map((pyq)=>(
            <PyqCard key={pyq._id as string} 
              id={pyq._id as string}
              title={`${pyq.year} || ${pyq.sem}`}
              content={pyq.content}
              subjectId={subjectId as string}
              onDelete={refreshData}
            />
          ))
        }
        </div>
        
      </div>
      {!isPublic && !loading && (<div className='absolute top-16 right-4'><AddPyqs onAdd={refreshData}/></div>)}
    </div>
  );
};

export default Page;
