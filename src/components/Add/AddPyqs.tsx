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
import React, { useState,JSX } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useParams} from "next/navigation";
import { Loader2, SquarePlus } from "lucide-react";
import { ApiResponse } from "@/types/ApiResponse";

const AddPyqs = ({ onAdd }: { onAdd: () => void }) => {
    const [name, setName] = useState("");
    const [semester, setSemester] = useState(1);
    const [year, setYear] = useState(2015);
    const [pyqfile, setpyqfile] = useState<File | null>(null);
    const { data: session } = useSession();
    const [resultMessage, setResultMessage] = useState<JSX.Element | null>(null);
    const [isCreating, setIsCreating] = useState(false);
  
      const params = useParams();
      const subjectId = params?.subjectId;
   
      const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCreating(true);
      
        if (!session) {
          setResultMessage(<p>Please log in to upload files.</p>);
          return;
        }
      
        const file = pyqfile;
        if (!file) {
          setResultMessage(<p>Please select a file to upload.</p>);
          return;
        }
      
        const metadata = {
          name: name,
        };
      
        const body = new FormData();
        body.append(
          "metadata",
          new Blob([JSON.stringify(metadata)], {
            type: "application/json",
          })
        );
        body.append("file", file);
      
        try {
          // Upload the file to Google Drive
          const uploadResponse = await fetch(
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            {
              method: "POST",
              body: body,
              headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            }
          );
      
          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            const fileId = uploadData.id;
      
            // Set the file to be publicly viewable
            const permissionsResponse = await fetch(
              `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${session?.user?.accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  role: "reader",
                  type: "anyone",
                }),
              }
            );
      
            if (permissionsResponse.ok) {
              // Save the file ID and metadata in your database
              await axios.post<ApiResponse>(
                `/api/pyqs/add-pyq?subjectId=${subjectId}`,
                {
                  name,
                  content: fileId,
                  year,
                  semester,
                }
              );
      
              setResultMessage(
                <p className="text-green-600">
                  Uploaded successfully and set to public!
                </p>
              );

              onAdd()
            } else {
              const errorData = await permissionsResponse.json();
              console.error("Error setting file permissions:", errorData);
              setResultMessage(
                <p className="text-red-600">
                  Error setting file permissions: {errorData.error.message}
                </p>
              );
            }
          } else {
            const errorData = await uploadResponse.json();
            console.error("Error uploading file:", errorData);
            setResultMessage(
              <p className="text-red-600">
                Error uploading file: {errorData.error.message}
              </p>
            );
          }
        } catch (error) {
          console.error("Error:", error);
          setResultMessage(
            <p className="text-red-600">An unexpected error occurred.</p>
          );
        } finally {
          setIsCreating(false);
        }
      };
      
  
    return (
      <div className="m-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full h-16 ">
              <SquarePlus style={{ height: "40px", width: "40px", color: "green" }}/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Notes</DialogTitle>
              <DialogDescription>Add a new note to the subject.If error occurs signout and signIn using google.</DialogDescription>
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
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="semester" className="text-right">
                  Sem
                </Label>
                <Input
                  id="semester"
                  value={semester}
                  type="number"
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="playlistLink" className="text-right">
                  File
                </Label>
                <Input
                  id="pyqfile"
                  type="file"
                  onChange={(e) => setpyqfile(e.target.files ? e.target.files[0] : null)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleFileUpload}>
                {isCreating ? <Loader2 className="animate-spin"/> : "Add"}
              </Button>
              {resultMessage}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  
  export default AddPyqs;
  
