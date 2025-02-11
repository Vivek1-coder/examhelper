import mongoose,{Schema,Document} from "mongoose";  
import { User} from "./User.model";

export interface Group extends Document{
    groupName:string,
    admin : mongoose.Schema.Types.ObjectId,
    subjectId:mongoose.Schema.Types.ObjectId,
    members: mongoose.Schema.Types.ObjectId[],
    createdAt:Date
}

const GroupSchema: Schema<Group> = new Schema({
    groupName:{
        type:String,
        required:[true,"Group name is required"],
        unique:true,
        index:true
    },
    admin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    subjectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subject",
            required:true
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",default:[]}],
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
})

const GroupModel = (mongoose.models.Group as mongoose.Model<Group>) || (mongoose.model<Group>("Group",GroupSchema))

export default GroupModel;
