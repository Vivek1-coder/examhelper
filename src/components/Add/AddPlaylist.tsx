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
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SquarePlus } from "lucide-react";

const AddPlaylist = ({
  subjectId,
  onAdd,
}: {
  subjectId: string;
  onAdd: () => void;
}) => {
  const [name, setName] = useState("");
  const [playlistLink, setPlaylistLink] = useState<string>("");
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractPlaylistId = (url: string): string | null => {
    const urlParts = url.split("?");
    if (urlParts.length > 1) {
      const queryString = urlParts[1];
      const params = queryString.split("&");
      for (let param of params) {
        const [key, value] = param.split("=");
        if (key === "list") {
          return value;
        }
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    const id = extractPlaylistId(playlistLink);

    if (!id) {
      toast({
        title: "Invalid Link",
        description: "Please provide a valid playlist link.",
        variant: "destructive",
      });
      setIsCreating(false);
      return;
    }

    setError(null);

    try {
      const response = await axios.post(
        `/api/playlist/add-playlist?subjectId=${subjectId}&playlistId=${id}`,
        {
          name,
        }
      );

      toast({
        title: "Success",
        description: response.data.message,
      });
      onAdd();
      setName("");
      setPlaylistLink("");
    } catch (error) {
      console.error("Error during adding playlist:", error);

      const axiosError = error as AxiosError;
      const errorMessage =
        (axiosError.response?.data as { message: string }).message ||
        "There was a problem in adding a new playlist. Please try again.";

      toast({
        title: "Playlist not added",
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
          <Button variant="outline" className="rounded-full h-16 ">
            <SquarePlus
              style={{ height: "40px", width: "40px", color: "green" }}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Playlist</DialogTitle>
            <DialogDescription>
              Add a new playlist to the subject.If videos are more than 50 make
              more than one public playlists from them.
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
              <Label htmlFor="playlistLink" className="text-right">
                Playlist Link
              </Label>
              <Input
                id="playlistLink"
                value={playlistLink}
                onChange={(e) => setPlaylistLink(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              {isCreating ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPlaylist;
