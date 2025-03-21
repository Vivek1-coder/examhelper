import mongoose,{Schema,Document} from "mongoose";  

export interface Note extends Document{
    name:string,
    content:string,
    subjectId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    createdAt:Date

}

export const NoteSchema : Schema<Note> = new Schema({
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const NoteModel = (mongoose.models.Note as mongoose.Model<Note>) || (mongoose.model<Note>("Note",NoteSchema))

export default NoteModel;