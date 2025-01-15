import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(request:Request){
    await dbConnect();

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
    
    const userId = new mongoose.Types.ObjectId(user._id)
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");
    const {name,isPublic} = await request.json()
    if(!subjectId){
        return Response.json(
            {
                success:false,
                message:"Subject Id not present"
            },
            {
                status:404
            }
        )
    }

    try {
        const result = await mongoose.model('Subject').findByIdAndUpdate(subjectId,{name:name,isPublic:isPublic})
        if (!result || result.author.toString() !== userId.toString()) {
            return Response.json(
            {
                success: false,
                message: "Subject not found or you are not authorized to delete this subject"
            },
            {
                status: 404
            }
            );
        }
        return Response.json(
            {
                success:true,
                message:"Subject Deleted successfully",
                
            },{
                status:200
            }
        )
    } catch (error) {
        console.error('Error in deleting subject',error);
        return Response.json(
            {
                success: false,
            message: 'Error in deleting subject',
          },
          { status: 500 }
        );
      }
    }