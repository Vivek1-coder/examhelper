import mongoose,{Schema,Document} from "mongoose";  

export interface PYQ extends Document{
    name:string,
    year:string,
    sem:number,
    subjectId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    content:string,
    createdAt:Date

}

export const PYQSchema : Schema<PYQ> = new Schema({
    name:{
        type:String,
        required:true
    },
    year:{
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
    sem:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const PYQModel = (mongoose.models.PYQ as mongoose.Model<PYQ>) || (mongoose.model<PYQ>("PYQ",PYQSchema))

export default PYQModel;