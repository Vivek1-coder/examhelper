import dbConnect from "@/lib/dbConnect";
import SubjectModel from "@/model/Subject.model";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(request:Request) {
    await dbConnect();

        const {name,isPublic} = await request.json();
        const session = await getServerSession(authOptions)
        const user:User = session?.user as User

        if(!session || !session.user){
            return Response.json(
                {
                    success : false,
                    message:"Not Authentication"
                },
                { status : 401 }
            )
        }

        const userId = new mongoose.Types.ObjectId(user._id);
        const authorName = user.name || user.username;
        try{
            const newSubject = new SubjectModel({
                name,
                author:userId,
                authorName,
                notes:[],
                pyqs:[],
                playlists:[],
                vivaques:[],
                isPublic
            })
            await newSubject.save();
            
            return Response.json(
                {
                    success:true,
                    message:"New subject added successfully."
                },
                {
                    status:200
                }
            )

    } catch (error) {
        console.error('Error in adding subject', error);
        return Response.json(
          {
            success: false,
            message: 'Error in adding subject',
          },
          { status: 500 }
        );
      }
    }