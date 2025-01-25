"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DialogComponentV from "@/components/Add/Dialog2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Vivaq } from "@/model/Vivaq.model";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import NavbarQues from "@/components/Navbar/Quesnavbar";
import EditquesDialog from "@/components/Edit/EditquesDialog";
import { FilePenLine, LoaderPinwheel } from "lucide-react";

const page = () => {
  let [ques, setQues] = useState<Vivaq[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isQuesLoading, setIsQuesLoading] = useState(true);
  const [loading, setIsLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const { toast } = useToast();
  const params = useParams();
  const subjectId = params?.subjectId;

  const fetchStatus = async () => {
    try {
      const result = await axios.get<ApiResponse>(
        `/api/subject/get-status?subjectId=${subjectId}`
      );
      if (result.data.message === "Public") {
        setIsPublic(true);
      }
    } catch (error) {
      console.error("Failed to fetch subject status", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserQuestions = useCallback(
    async (refresh: boolean = false) => {
      try {
        setIsQuesLoading(true);
        const response = await axios.get<ApiResponse>(
          `/api/vivaques/get-vivaques?subjectId=${subjectId}`
        );
        setQues(response.data.ques || []);
        if (refresh) {
          toast({
            title: "Refreshed Questions",
            description: "Showing refreshed questions",
          });
        }
        setIsQuesLoading(false);
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
      setIsQuesLoading(false);
    },
    [toast]
  );

  useEffect(() => {
    fetchStatus();
    fetchUserQuestions();
  }, [fetchUserQuestions, subjectId]);

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 w-full">
        <NavbarQues />
      </div>
      <div className="absolute top-20 right-3">
        {!isPublic && !loading && (
          <DialogComponentV
            subjectId={subjectId as string}
            onAdd={fetchUserQuestions}
          />
        )}
      </div>

      <div className="w-full h-full flex justify-center items-center p-10">
        <div className=" w-1/2 h-1/2 flex flex-col items-center rounded-3xl p-10 overflow-y-auto">
          {ques.length > 0 ? (
            ques.map((q) => (
              <div key={q._id as string} className="text-white w-full">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{q.ques}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-white">{q.ans}</p>

                      {!isPublic && (
                        <button
                          onClick={handleEditClick}
                          className=" text-blue-500 rounded-lg mb-2 w-1/2"
                        >
                          <FilePenLine />
                          {isEditOpen && (
                            <EditquesDialog
                              quesId={q._id as string}
                              initialQues={q.ques}
                              initialAns={q.ans}
                              onClose={handleEditClose}
                              onUpdate={handleEditClick}
                            />
                          )}
                        </button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          ) : isQuesLoading ? (
            <LoaderPinwheel className="animate-spin text-white" />
          ) : (
            <p className="text-white">No Questions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
