
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from '@/components/ui/switch'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from "next/navigation"
import { ListPlus } from "lucide-react"



const DialogComponentV = ({ subjectId,onAdd }: { subjectId: string,onAdd:()=>void }) => {

    const [ques,setQues] = useState('')
    const [ans,setAns] = useState('')
    const {data:session} = useSession()
    
    const  {toast} = useToast()
    const router = useRouter()
    const [isCreating,setIsCreating] = useState(false)
   
    const handleSubmit = async()=>{
      setIsCreating(true);
        try {

            const response = await axios.post<ApiResponse>('/api/vivaques/add-vivaques',{
                name:ques,content:ans,subjectId
            })

            toast({
              title:'Success',
              description:response.data.message
            })
            
            onAdd();
        
            

        } catch (error) {
          console.error('Error during adding subject:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem in adding a new subject. Please try again.');

      toast({
        title: 'Subject not added',
        description: errorMessage,
        variant: 'destructive',
      });

        }finally{
          setIsCreating(false)
        }
    }

    

      return (
        <div className="m-2">
          <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full text-blue-600" ><ListPlus/></Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Question</DialogTitle>
              <DialogDescription>
                Add important question and answer..
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ques" className="text-right">
                  Question
                </Label>
                <Textarea id="ques" value={ques} 
                onChange={(e) => {
                    setQues(e.target.value);
                }}
                  className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ans" className="text-right">
                  Answer
                </Label>
                <Textarea id="ans" value={ans} 
                onChange={(e) => {
                    setAns(e.target.value);
                }}
                  className="col-span-3" />
              </div>
                
              </div>
           
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>{isCreating?'Adding...':'Add'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      )
    }
    
    export default DialogComponentV;
    