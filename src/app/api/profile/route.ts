
import UserModel from "@/model/User.model";
import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET() {

  try {
    // Connect to the database
    await dbConnect();
    const session = await getServerSession(authOptions)
    // Get the session (assuming you're using NextAuth for authentication)
    const sessionUser:User = session?.user as User

        if(!session || !session.user){
            return Response.json(
                {
                    success : false,
                    message:"Not Authentication"
                },
                { status : 401 }
            )
        }

        const userId = new mongoose.Types.ObjectId(sessionUser._id);

    // Find the user by email
    const user = await UserModel.findById(userId)
    // console.log(sessionUser.email)
        if (!user) {
        return Response.json(
            {
                success:false,
                message:"no user found"
            },
            {status : 404}
        );
        }

    // Send the user profile data (exclude sensitive fields like password)
    return Response.json(
        {
            success:true,
            message:"User details fetched successfully",
            user:user
        },{
            status:404
        }
    );
  } catch (error) {
    console.error('Error in getting user', error);
        return Response.json(
          {
            success: false,
            message: 'Error in getting user',
            
          },
          { status: 500 }
        );
      }
    }

