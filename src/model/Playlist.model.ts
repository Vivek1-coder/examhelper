import mongoose,{Schema,Document} from "mongoose";  

export interface Playlist extends Document{
    name:string,
    thumbnail:string,
    playlistId:string,
    totalVideos:number,
    subjectId:mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    createdAt:Date

}

export const PlaylistSchema : Schema<Playlist> = new Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    playlistId:{
        type:String,
        required:true
    },
    totalVideos:{
        type:Number,
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

const PlaylistModel = (mongoose.models.Playlist as mongoose.Model<Playlist>) || (mongoose.model<Playlist>("Playlist",PlaylistSchema))

export default PlaylistModel;