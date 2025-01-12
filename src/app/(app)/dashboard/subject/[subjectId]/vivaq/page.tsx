'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import DialogComponentV from '@/components/Dialog2';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Vivaq } from '@/model/Vivaq.model';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';


const page = () => {
    let [ques,setQues] = useState<Vivaq[]>([]);

    const {toast} = useToast();
    const params = useParams();
    const subjectId = params?.subjectId;

    const fetchUserQuestions = useCallback(
      async (refresh: boolean = false) => {
        try {
          const response = await axios.get<ApiResponse>("/api/get-vivaques");
          setQues(response.data.ques || []);
          if (refresh) {
            toast({
              title: "Refreshed Questions",
              description: "Showing refreshed questions",
            });
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          toast({
            title: "Error",
            description:
              axiosError.response?.data.message || "Failed to fetch questions",
            variant: "destructive",
          });
          console.error("Error fetching user questions:", error);
        }
       
      },
      [toast]
    );

    useEffect(()=>{
      fetchUserQuestions();
    },[fetchUserQuestions])
  return (
    <div>
      <DialogComponentV subjectId={subjectId as string}/>
      
      {
        ques.length > 0 ? 
        ques.map((q)=>(
          <div key={q._id as string} className='text-black'>
            <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{q.ques}</AccordionTrigger>
            <AccordionContent>
              {q.ans}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
          </div>
        )) : <p>No notes found</p>
      }
        

      
    </div>
  )
}

export default page
