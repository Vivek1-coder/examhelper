import mongoose,{Schema,Document, trusted} from "mongoose";  

export interface Note extends Document{
    name:string,
    content:string,
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
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const NoteModel = (mongoose.models.Note as mongoose.Model<Note>) || (mongoose.model<Note>("Note",NoteSchema))

export default NoteModel;