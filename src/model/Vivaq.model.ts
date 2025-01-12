import mongoose,{Schema,Document} from "mongoose";  

export interface Vivaq extends Document{
    name:string,
    content:string,
    createdAt:Date

}

export const VivaqSchema : Schema<Vivaq> = new Schema({
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

const VivaqModel = (mongoose.models.Vivaq as mongoose.Model<Vivaq>) || (mongoose.model<Vivaq>("Vivaq",VivaqSchema))

export default VivaqModel;