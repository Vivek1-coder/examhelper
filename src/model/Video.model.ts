import mongoose,{Schema,Document} from "mongoose";  

export interface Video extends Document{
    thumbnail:string,
    title:string,
    videoId:string,
    author:string,
    playlistId:string,
    subjectId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    createdAt:Date

}

export const VideoSchema : Schema<Video> = new Schema({
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    videoId:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    playlistId:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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