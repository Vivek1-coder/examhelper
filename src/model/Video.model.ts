import mongoose,{Schema,Document} from "mongoose";  

export interface Video extends Document{
    name:string,
    content:string,
    subjectId:mongoose.Schema.Types.ObjectId,
    createdAt:Date

}

export const VideoSchema : Schema<Video> = new Schema({
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
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

const VideoModel = (mongoose.models.Video as mongoose.Model<Video>) || (mongoose.model<Video>("Video",VideoSchema))

export default VideoModel;