import mongoose,{Schema,Document, trusted} from "mongoose";  
import { User, UserSchema } from "./User.model";

export interface Group extends Document{
    groupName:string,
    members: User[],
    createdAt:Date
}

const GroupSchema: Schema<Group> = new Schema({
    groupName:{
        type:String,
        required:[true,"Group name is required"],
        unique:true,
        index:true
    },
    members:[UserSchema],
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const GroupModel = (mongoose.models.Group as mongoose.Model<Group>) || (mongoose.model<Group>("Group",GroupSchema))

export default GroupModel;
