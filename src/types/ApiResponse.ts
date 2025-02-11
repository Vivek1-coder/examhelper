import { Note } from "@/model/Note.model";
import { Playlist } from "@/model/Playlist.model";
import { PYQ } from "@/model/PYQ.model";
import { Subject } from "@/model/Subject.model";
import { User } from "@/model/User.model";
import { Video } from "@/model/Video.model";
import { Vivaq } from "@/model/Vivaq.model";

export interface ApiResponse{
    success: boolean;
    message: string;
    adminName?:string;
    groupName?:string;
    members ?: Array<string>;
    subjects?:Array<Subject>;
    ques?:Array<Vivaq>;
    playlists?:Array<Playlist>;
    pyqs?:Array<PYQ>;
    notes?:Array<Note>;
    videos?:Array<Video>;
    user?:Array<User>;
}      