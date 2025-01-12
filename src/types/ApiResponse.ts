import { Subject } from "@/model/Subject.model";
import { Vivaq } from "@/model/Vivaq.model";

export interface ApiResponse{
    success: boolean;
    message: string;
    subjects?:Array<Subject>;
    ques?:Array<Vivaq>;
    
}      