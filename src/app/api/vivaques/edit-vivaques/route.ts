import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function PUT(request:Request){
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
    const quesId = searchParams.get("quesId");
    const {ques,ans} = await request.json()
    if(!quesId){
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
        const result = await mongoose.model('Vivaq').findByIdAndUpdate(quesId,{ques,ans})
        if (!result || result.userId.toString() !== userId.toString()) {
            return Response.json(
            {
                success: false,
                message: "Question not found or you are not authorized to update this Question"
            },
            {
                status: 404
            }
            );
        }
        return Response.json(
            {
                success:true,
                message:"Question Updated successfully",
                
            },{
                status:200
            }
        )
    } catch (error) {
        console.error('Error in updating Question',error);
        return Response.json(
            {
                success: false,
            message: 'Error in updating Question',
          },
          { status: 500 }
        );
      }
    }