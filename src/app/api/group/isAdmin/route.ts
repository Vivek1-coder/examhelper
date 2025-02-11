import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import GroupModel from "@/model/Group.model";

export async function GET(request:Request){
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("subjectId");
        
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return new Response(
                JSON.stringify({ success: false, message: "Not authenticated" }),
                { status: 401 }
            );
        }
        
        const userId = new mongoose.Types.ObjectId(session.user._id);

        const group = await GroupModel.findOne({
            subjectId: new mongoose.Types.ObjectId(subjectId as string),
            admin:userId
        });

        if (!group) {
            return new Response(
                JSON.stringify({ success: true, message: "Not Admin" }),
                { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: "Admin" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error while getting admin status" }),
            { status: 500 }
        );
    }
}