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
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Users } from "lucide-react";
import { useParams } from "next/navigation";

const AddGroup = ({ onAdd }: { onAdd: () => void }) => {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const params = useParams();
  const subjectId = params?.subjectId;

  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      const response = await axios.post<ApiResponse>(
        `/api/group/make-group?subjectId=${subjectId}`,
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
            <DialogTitle>Group Title</DialogTitle>
            <DialogDescription>
              Give a name to your group. Then, add members using their username.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddGroup;
