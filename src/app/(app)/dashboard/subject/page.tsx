"use client";

import DialogComponent from "@/components/Dialog";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { Subject } from "@/model/Subject.model";
import { useRouter } from "next/navigation";
import CardComponent from "@/components/card2/Card2";
import Navbar from "@/components/Navbar/Navbar2";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const Subjectpage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [isAllSubjects, setIsAllSubjects] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubjectLoading,setIsSubjectsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      setIsSubjectsLoading(true);
      const response = isAllSubjects
        ? await axios.get<ApiResponse>("/api/subject/get-all-subjects")
        : await axios.get<ApiResponse>("/api/subject/get-user-subjects");

      const fetchedSubjects = response.data.subjects || [];
      isAllSubjects ? setAllSubjects(fetchedSubjects) : 
      
      setSubjects(fetchedSubjects);
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
  }, [isAllSubjects, toast]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsAllSubjects(isChecked);
  };

  return (
    <>
      <section className="h-screen relative">
        <div className="absolute top-0 w-full">
          <Navbar />
        </div>

        <div className="w-full flex flex-col justify-center items-center h-full">
          <div className="flex w-4/5 h-3/4 justify-center rounded-3xl p-3 overflow-y-auto">

            {isAllSubjects ? (
              <div
                className="flex flex-wrap text-white rounded-lg justify-center gap-8"
                style={{ padding: "20px" }}
              >
                {allSubjects.length > 0 ? (
                  allSubjects.map((subject) => (
                    <CardComponent
                      key={subject._id as string}
                      subjectId={subject._id as string}
                      subjectName={subject.name}
                      likes={0}
                      author={subject.authorName}
                      isPublic={true}
                      onUpdate={refreshData}
                      onDelete={refreshData} // Trigger refresh after deletion
                    />
                  ))
                ) : (
                  isSubjectLoading?<Loader2 className="animate-spin text-white"/>:
                  <p>No subjects found.</p>
                )}
              </div>
            ) : (
              <div>
                {subjects.length > 0 ? (
                  <div
                    className="flex flex-wrap text-white rounded-lg justify-center gap-8"
                    style={{ padding: "20px" }}
                  >
                    {subjects.map((subject) => (
                      <CardComponent
                        key={subject._id as string}
                        subjectId={subject._id as string}
                        subjectName={subject.name}
                        likes={0}
                        author="Self"
                        isPublic={false}
                        onUpdate={refreshData}
                        onDelete={refreshData} // Trigger refresh after deletion
                      />
                    ))}
                  </div>
                ) : (
                  isSubjectLoading?<Loader2 className="animate-spin text-white"/>:
                  <p>No subjects found.</p>
                )}
              </div>
            )}

            <div className="absolute top-20 right-3">
              <DialogComponent onAdd={refreshData} /> {/* Trigger refresh after adding */}
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-2 mt-4 text-white">
            <p>Want to see all public subjects:</p>
            <Switch checked={isAllSubjects} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="isPublic" className="text-right">
              ({isAllSubjects ? "All Public" : "Your"})
            </Label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subjectpage;
