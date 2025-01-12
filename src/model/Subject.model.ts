import mongoose,{Schema,Document} from "mongoose";  
import { Note,NoteSchema } from "./Note.model";    
import { PYQ, PYQSchema } from "./PYQ.model";
import { Video, VideoSchema } from "./Video.model";
import { Vivaq, VivaqSchema } from "./Vivaq.model";

export interface Subject extends Document{
    name:string,
    author:mongoose.Schema.Types.ObjectId,
    authorName:string,
    isPublic: boolean,
    createdAt:Date

}

export const SubjectSchema : Schema<Subject> = new Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    authorName:{
        type:String,
        require:true,
        default:"Mr Unknown"
    },
    isPublic:{
        type:Boolean,
        default:true,
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const SubjectModel = (mongoose.models.Subject as mongoose.Model<Subject>) || (mongoose.model<Subject>("Subject",SubjectSchema))

export default SubjectModel;