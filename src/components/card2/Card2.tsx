"use client";

import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { DeleteIcon, FilePenLine, Star, Trash2 } from "lucide-react";
import "./card.css"
import { useState } from "react";
import DialogComponent from "../Dialog";
import DialogComponentEdit from "../EditDialog";
interface CardProps {
  subjectName: string;
  subjectId: string;
  author: string;
  likes: number;
  isPublic: boolean;
  onUpdate: () => void;
  onDelete?: () => void; // Callback to trigger data refresh
}

export default function CardComponent({
  subjectName,
  subjectId,
  author,
  likes,
  isPublic,
  onDelete,
  onUpdate
}: CardProps) {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete the subject "${subjectName}"?`
      );
      if (!confirmed) return;

      const response = await axios.delete<ApiResponse>(
        `/api/subject/delete-subject?subjectId=${subjectId}`
      );

      if (response.data.success) {
        toast({
          title: "Deleted",
          description: `"${subjectName}" was successfully deleted.`,
        });
        if (onDelete) onDelete(); // Trigger the refresh callback
      } else {
        throw new Error(response.data.message || "Failed to delete subject.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="flex flex-col rounded-lg gap-2 card h-52 overflow-y-auto"
      style={{ width: "140px" }}
    >
      <div className="flex w-full h-20">
        <img
          className="rounded-t-lg"
          src="https://static.vecteezy.com/system/resources/previews/014/572/370/non_2x/line-icon-for-subject-vector.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col h-28 justify-center w-full text-center gap-2 overflow-y-auto">
        <a href={`/dashboard/subject/${subjectId}`}>
          <p className="font-bold text-lg">{subjectName}</p>
          <p className="font-light text-sm">Author: {author}</p>
          <p className="font-light text-sm">Likes: {likes}</p>
        </a>
      </div>


      {isPublic ? (
        <button className="text-red-800 rounded-lg m-2 flex justify-center"><Star/></button>
      ) : (
        <div className="flex w-full justify-between">
          <button
          onClick={handleDelete}
          className=" text-red-500 rounded-lg ml-2 mb-2 w-1/2"
        >
          <Trash2/>
        </button>
        <button 
          onClick={handleEditClick}
          className=" text-blue-500 rounded-lg mb-2 w-1/2"
        >
          <FilePenLine/>
        </button>
        {isEditOpen && (
        <DialogComponentEdit
          subjectId={subjectId}
          initialName={subjectName}
          initialIsPublic={isPublic}
          onClose={handleEditClose}
          onUpdate={onUpdate}
        />
      )}
        </div>
      )}
      
    </div>
  );
}
 