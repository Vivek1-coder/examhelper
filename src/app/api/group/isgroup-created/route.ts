import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import GroupModel from "@/model/Group.model";

export async function GET(request:Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("subjectId");

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
        const group = await GroupModel.aggregate([
            {$match:{subjectId: new mongoose.Types.ObjectId(subjectId as string),admin: userId }}
        ])

        if(!group || group.length === 0){
            return new Response(
                JSON.stringify({
                    success:false,
                    message: "Not authenticated to add member"
                }),{
                    status:200
                }
            )
        }

        return new Response(
            JSON.stringify({
                success:true,
                message: "Admin"
            }),
            {
                status: 200
            }
        )
    


    } catch (error) {
        console.error("Error occured while adding member : ",error);
        return new Response(
            JSON.stringify({
                success:false,
                message: "Error occured while adding member"
            }),
            {
                status: 500
            }
        )
    }
}