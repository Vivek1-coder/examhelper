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

const DialogComponent = ({ onAdd }: { onAdd: () => void }) => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      const response = await axios.post<ApiResponse>("/api/subject/add-subject", {
        name,
        isPublic,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      onAdd(); // Trigger a refresh after adding the subject

      // Optionally close the dialog or reset the form
      setName(""); // Reset the name field
      setIsPublic(true); // Reset the public switch to default

    } catch (error) {
      console.error("Error during adding subject:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      const errorMessage =
        axiosError.response?.data.message || "There was a problem adding the subject. Please try again.";

      toast({
        title: "Subject not added",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSwitchChange = () => {
    setIsPublic(!isPublic);
  };

  return (
    <div className="m-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full h-16 w-16 text-green-600 bg-gray-300" >
            <FolderPlus style={{ height: "40px", width: "40px", color: "green" }}/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>
            <DialogDescription>Add a new subject you want to add.</DialogDescription>
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
            <Button type="submit" onClick={handleSubmit} disabled={isCreating}>
              {isCreating ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
