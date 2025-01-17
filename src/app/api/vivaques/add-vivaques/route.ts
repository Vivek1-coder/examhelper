import dbConnect from "@/lib/dbConnect"
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import VivaqModel from "@/model/Vivaq.model";

export async function POST(request:Request) {
    await dbConnect();
    const {name,content,subjectId} = await request.json();

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

    try{
        const newVivaq =new VivaqModel({
            ques:name,
            ans:content,
            subjectId,
            userId
        })
        await newVivaq.save();

        return Response.json(
            {
                success:true,
                message:"New note added successfully."
            },
            {
                status:200
            }
        )
    }catch (error) {
        console.error('Error in adding note', error);
        return Response.json(
          {
            success: false,
            message: 'Error in adding note',
          },
          { status: 500 }
        );
      }
}