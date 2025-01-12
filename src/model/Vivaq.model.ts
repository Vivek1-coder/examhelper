import mongoose,{Schema,Document} from "mongoose";  

export interface Vivaq extends Document{
    ques:string,
    ans:string,
    subjectId:mongoose.Schema.Types.ObjectId,
    createdAt:Date

}

export const VivaqSchema : Schema<Vivaq> = new Schema({
    ques:{
        type:String,
        required:true
    },
    ans:{
        type:String
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const VivaqModel = (mongoose.models.Vivaq as mongoose.Model<Vivaq>) || (mongoose.model<Vivaq>("Vivaq",VivaqSchema))

export default VivaqModel;