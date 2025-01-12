
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



const DialogComponent = () => {

    const [name,setName] = useState('')
    const [isPublic,setIsPublic] = useState(true)
    const {data:session} = useSession()
    const  {toast} = useToast()
    const router = useRouter()
    const [isCreating,setIsCreating] = useState(false)
   
    const handleSubmit = async()=>{
      setIsCreating(true);
        try {
          
            const response = await axios.post<ApiResponse>('/api/add-subject',{
                name,isPublic
            })

            toast({
              title:'Success',
              description:response.data.message
            })
            
        
            

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

    const handleSwitchChange = async()=>{
        try {
           setIsPublic(!isPublic)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          console.log(axiosError)
          
        }
      }

      return (
        <div className="m-2">
          <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full" style={{backgroundColor:"red"}}>+ ADD</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Subject</DialogTitle>
              <DialogDescription>
                Add a new subject you want to..
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={name} 
                onChange={(e) => {
                    setName(e.target.value);
                }}
                  className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isPublic" className="text-right">
                {isPublic ? 'Public' : 'Private'}
                </Label>
                <div className="mb-4">
              <Switch
               
                checked={isPublic}
                onCheckedChange={handleSwitchChange}
                
              />
            </div>
                
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
    
    export default DialogComponent;
    