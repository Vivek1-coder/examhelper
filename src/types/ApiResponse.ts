import { Note } from "@/model/Note.model";
import { Playlist } from "@/model/Playlist.model";
import { Subject } from "@/model/Subject.model";
import { Video } from "@/model/Video.model";
import { Vivaq } from "@/model/Vivaq.model";

export interface ApiResponse{
    success: boolean;
    message: string;
    subjects?:Array<Subject>;
    ques?:Array<Vivaq>;
    playlists?:Array<Playlist>;
    notes?:Array<Note>;
    videos?:Array<Video>;

}      