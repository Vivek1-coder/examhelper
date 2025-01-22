import mongoose,{Schema, Document} from "mongoose"; 
import { Subject, SubjectSchema } from "./Subject.model";

export interface User extends Document{
    username:string,
    email:string,
    college:string,
    avatar:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    subjects:Subject[]
}


const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        lowercase:true,
        unique:true,
        index:true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    college : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : [true, 'Password is required ']
    },
    avatar:{
        type:String,
        required:false
    },
    verifyCode:{
        type:String,
        required:[true,"Verification code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify Code Expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    subjects:[SubjectSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel