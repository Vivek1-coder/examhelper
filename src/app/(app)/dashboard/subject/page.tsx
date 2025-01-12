'use client'
import DialogComponent from "@/components/Dialog";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { Subject } from "@/model/Subject.model";
import { useRouter } from "next/navigation";
import { Cardcomponent } from "@/components/card2/Card2";
import Navbar from "@/components/Navbar/Navbar2";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// import Checkbox from "@/components/check";

// import { NavbarComponent } from "@/components/Navbar";


const Subjectpage = () => {
  let [subjects, setSubjects] = useState<Subject[]>([]);
  const [isSubjectAdded,setIsSubjectAdded] = useState(false);
  let [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const [isAllSubjects,setIsAllSubjects] = useState(false);
  
  const fetchAllSubjects = useCallback(
    async(refresh:boolean = false)=>{
      try {
        const response = await axios.get<ApiResponse>("/api/subject/get-all-subjects");
        setAllSubjects(response.data.subjects || [])

        if (refresh) {
          toast({
            title: "Refreshed Subjects",
            description: "Showing refreshed subjects",
          });
        }
        setIsSubjectAdded(!isSubjectAdded);

      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch subjects",
          variant: "destructive",
        });
        console.error("Error fetching user subjects:", error);
      }
      
    },
    [toast]
  );

  const fetchUserSubjects = useCallback(
    async (refresh: boolean = false) => {
      try {
        const response = await axios.get<ApiResponse>("/api/subject/get-user-subjects");
        setSubjects(response.data.subjects || []);
        if (refresh) {
          toast({
            title: "Refreshed Subjects",
            description: "Showing refreshed subjects",
          });
        }
        setIsSubjectAdded(!isSubjectAdded)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch subjects",
          variant: "destructive",
        });
        console.error("Error fetching user subjects:", error);
      }
     
    },
    [toast]
  );

  const handleUserSubject = (subjectId:string) => {
    try {
      router.replace(`/dashboard/subject/${subjectId}`)
    } catch (error) {
      console.error("Error in directing")
    }
  }

  const handleCheckboxChange = (isChecked:boolean)=>{
    if(isChecked){
      setIsAllSubjects(true);
    }
    if(!isChecked){
      setIsAllSubjects(false);
    }
  }

  useEffect(() => {
    fetchUserSubjects();
  }, [fetchUserSubjects,isAllSubjects,isSubjectAdded]);

  useEffect(()=>{
    fetchAllSubjects();
  },[fetchAllSubjects,isAllSubjects,isSubjectAdded])

  return (
    <>
       <section className=' h-screen relative  '>
        <div className="absolute top-0 w-full ">
        <Navbar/>
        </div>
        
        <div className='w-full flex flex-col justify-center items-center h-full'>
        <div className=' flex w-4/5 h-3/4 justify-center rounded-3xl bg-black p-3 overflow-y-auto'>
          {isAllSubjects ? (
           <div className="flex flex-wrap text-white rounded-lg justify-center gap-8" style={{padding:'20px'}}>
              {allSubjects.length > 0 ? (
              
                allSubjects.map((subject) => (
                
                    <Cardcomponent
                      key={subject._id as string}
                      subjectId={subject._id as string}
                      subjectName={subject.name}
                      likes={0}
                      author={subject.authorName}
                    />

                  
                ))
              ) : (
                <p>No subjects found.</p>
              )}
              
              
            </div>
          ) : (
            <div >
            {subjects.length > 0 ? (
                <div className="flex flex-wrap md:text-white rounded-lg justify-center gap-8" style={{padding:'20px'}}>
               { subjects.map((subject) => (
                
                  <Cardcomponent
                  key={subject._id as string}
                  subjectId={subject._id as string}
                  subjectName={subject.name}
                  likes={0}
                  author="Self"
                  />

                
                ))}
                </div>
            ) : (
              <p>No subjects found.</p>
            )}
            
            
            
            
          </div>
            
          )}

          <div className="absolute top-14 left-3 ">
              <DialogComponent/>
              </div>

          </div>
          
       
        <div className="grid grid-cols-2 items-center gap-2 mt-4">
                
                
                <p>Want to see all public subjects : </p>
                <Switch
               
                checked={isAllSubjects}
                onCheckedChange={handleCheckboxChange}
                
              />
                <Label htmlFor="isPublic" className="text-right">
                ({isAllSubjects ? 'All Public' : 'Your'})
                </Label>
            
        </div>
        </div>

        
        
        </section>
    </>
  );
};

export default Subjectpage;
