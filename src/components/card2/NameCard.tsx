"use client";

import { useToast } from '@/hooks/use-toast';
import './card3.css'
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Award, SquareX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';


interface cardprops{
    membername:string;
    admin:string;
    onDelete?: () => void;
}

export function NameCard({membername ,admin,onDelete}:cardprops) {
  const { toast } = useToast();
  const [isAdmin,setIsAdmin] = useState(false);
 
  const [isAdminName,setIsAdminName] = useState(false);
  const [isSelf,setIsSelf] = useState(false);
  const [loading,setIsLoading] = useState(true);

  const params = useParams();
  const subjectId = params?.subjectId;

  const checkAdmin = async() =>{
    try {
        setIsLoading(true);
        const response = await axios.get<ApiResponse> (
          `/api/group/isgroup-created?subjectId=${subjectId}`
        )
     
        if(response.data.message === "Admin"){
          setIsAdmin(true);
          
        }
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        toast({
            title:"Error",
            description:"Error occured while removing",
            variant:'destructive'
        })
    }
  }

  const { data: session } = useSession();
  const AdminName = session?.user.name || session?.user.username

  const checkSelf = () => 
 { if(AdminName === membername){
    setIsSelf(true);
  }
   }

   const checkAdminName = () => {
    if(admin === membername && admin !== ""){
      setIsAdminName(true);
    }
   }
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to remove ${membername} from your group(It will not be able to contribute to this subject) ?`
      );
      if (!confirmed) return;
  
      const response = await axios.post<ApiResponse>(
        `/api/group/remove-member?subjectId=${subjectId}&&name=${membername}`
      );
  
      if (response.data.success) {
        toast({
          title: "Deleted",
          description: `"${membername}" was successfully removed.`,
        });
        if (onDelete) onDelete(); // Trigger the refresh callback
      } else {
        console.error("Backend error:", response.data.message);
        throw new Error(response.data.message || "Failed to delete subject.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Frontend error:", error.message);
        toast({
          title: "Error",
          description: error.message || "An error occurred.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }
    
  };
  
  useEffect(() => {
    checkAdmin();
    checkSelf();
    checkAdminName();
    console.log("admin in front ",admin);
  }, [subjectId,membername,AdminName]);

  return (
    <div className='h-16 w-52 flex items-center justify-between px-2 rounded-2xl gap-2 border  text-black m-3 text-center' >
  
      
        <div className='flex flex-col justify-center w-1/2 h-24 text-center'>
        
        <span className='font-bold text-xl overflow-y-auto '>{isSelf?"You":membername}</span>
       
        
        
        </div>
        <div>
        {isAdminName && (<span className=" text-blue-500 rounded-lg flex justify-center "><Award/></span>)}
        </div>
        {isAdmin&& !isSelf && !loading && (
          <button
            onClick={handleDelete}
            className=" text-red-500 rounded-lg flex justify-center "
          >
            <SquareX/>
          </button>
        )}
    </div> 
  );
}
