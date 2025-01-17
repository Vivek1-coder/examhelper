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

const EditquesDialog = ({
    quesId,
    initialQues = "",
    initialAns = "",
    onClose,
    onUpdate,
  }: {
    quesId?: string;
    initialQues?: string;
    initialAns?: string;
    onClose: () => void;
    onUpdate: () => void ;
  }) => {
    const [ques, setQues] = useState(initialQues);
    const [ans, setAns] = useState(initialAns);
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
  
    const handleSubmit = async () => {
      setIsSaving(true);
      try {
        const url = quesId
          ? `/api/vivaques/edit-vivaques?quesId=${quesId}` // Update endpoint
          : `/api/vivaques/add-vivaques`; // Add endpoint
  
        const method = quesId ? "put" : "post";
        const payload = { ques, ans };
  
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
  
  
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{quesId ? "Edit Subject" : "Add Subject"}</DialogTitle>
            <DialogDescription>
              {quesId
                ? "Update the subject details below."
                : "Add a new subject."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Ques
              </Label>
              <Input
                id="ques"
                value={ques}
                onChange={(e) => setQues(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Ans
              </Label>
              <Input
                id="ans"
                value={ans}
                onChange={(e) => setAns(e.target.value)}
                className="col-span-3"
              />
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
  
  export default EditquesDialog;
  