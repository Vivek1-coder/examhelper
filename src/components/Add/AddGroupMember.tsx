'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { FolderPlus, User, Users } from "lucide-react";
import { useParams } from "next/navigation";

const AddGroupMember = ({ onAdd }: { onAdd: () => void }) => {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [userExist, setUserExist] = useState(true);

  const params = useParams();
  const subjectId = params?.subjectId;

  const checkUsernameUnique = async () => {
    if (name) {
     
      setUsernameMessage("");
      try {
        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${name}`
        );
        setUsernameMessage(response.data.message);
        console.log(usernameMessage)
        if(usernameMessage !== 'Username already taken'){
          setUserExist(false);
        }
        
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message || "Error checking username"
        );
      } 
    }
  };

  const handleSubmit = async () => {
    setIsCreating(true);
   await checkUsernameUnique();
    try {
      const response = await axios.post<ApiResponse>(
        `/api/group/add-group-members?subjectId=${subjectId}`,
        {
          name
        }
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      onAdd(); // Trigger a refresh after adding the subject
    
    } catch (error) {
      console.error("Error during making group:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      const errorMessage =
        axiosError.response?.data.message ||
        "There was a problem making the group. Please try again.";

      toast({
        title: "Group not create",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
      setUserExist(true);
    }
  };




  


  return (
    <div className="m-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full h-16 w-16 text-green-600 bg-gray-300"
          >
            <Users
              style={{ height: "40px", width: "40px", color: "green" }}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a member</DialogTitle>
            <DialogDescription>
              Write down the username of the member you want to add to your group.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Username
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => 
                    setName(e.target.value)
                  }
                className="col-span-3"
              />
              {
                !userExist && <p className="text-red-500">"User does not exist"</p>
              }
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={isCreating}>
              {isCreating ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddGroupMember;
