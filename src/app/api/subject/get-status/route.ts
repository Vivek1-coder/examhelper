import dbConnect from "@/lib/dbConnect";
import SubjectModel from "@/model/Subject.model";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import GroupModel from "@/model/Group.model";

export async function GET(request:Request) {
    dbConnect();
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

        if (!subjectId) {
            throw new Error("subjectId is required");
        }
        const subject = await SubjectModel.findById(new mongoose.Types.ObjectId(subjectId));
        const subjectuserId = subject?.author?.toString();

        let message = "";
        if(subjectuserId === userId.toString()){
            message = "Private";
        } else {
            message = "Public";
        }

        const group = await GroupModel.findOne({
            subjectId: new mongoose.Types.ObjectId(subjectId as string),
            $or: [{ admin: userId }, { members: userId }],
        })

        if(group){
            message = "Private";
        }
        return new Response(
            JSON.stringify(
                {
                    success:true,
                    message:message
                }
            ),
            {status:200}
        )
    } catch (error) {
        console.error("Error occurred while getting notes:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while getting notes",
            }),
            { status: 500 }
        );
    }


}