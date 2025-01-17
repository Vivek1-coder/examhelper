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
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";
import { FolderPlus } from "lucide-react";

const DialogComponentEdit = ({
    subjectId,
    initialName = "",
    initialIsPublic = true,
    onClose,
    onUpdate,
  }: {
    subjectId?: string;
    initialName?: string;
    initialIsPublic?: boolean;
    onClose: () => void;
    onUpdate: () => void ;
  }) => {
    const [name, setName] = useState(initialName);
    const [isPublic, setIsPublic] = useState(initialIsPublic);
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
  
    const handleSubmit = async () => {
      setIsSaving(true);
      try {
        const url = subjectId
          ? `/api/subject/edit-subject?subjectId=${subjectId}` // Update endpoint
          : `/api/subject/add-subject`; // Add endpoint
  
        const method = subjectId ? "put" : "post";
        const payload = { name, isPublic };
  
        const response = await axios[method](url, payload);
  
        toast({
          title: "Success",
          description: response.data.message,
        });
  
        onUpdate(); // Refresh the subject list
        onClose(); // Close the dialog
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage =
          axiosError.response?.data.message || "An error occurred.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    };
  
    const handleSwitchChange = () => {
      setIsPublic(!isPublic);
    };
  
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{subjectId ? "Edit Subject" : "Add Subject"}</DialogTitle>
            <DialogDescription>
              {subjectId
                ? "Update the subject details below."
                : "Add a new subject."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isPublic" className="text-right">
                {isPublic ? "Public" : "Private"}
              </Label>
              <div className="mb-4">
                <Switch checked={isPublic} onCheckedChange={handleSwitchChange} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogComponentEdit;
  