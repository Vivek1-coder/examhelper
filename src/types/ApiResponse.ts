import { Subject } from "@/model/Subject.model";

export interface ApiResponse{
    success: boolean;
    message: string;
    subjects?:Array<Subject>;
}      