import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose, { Types } from "mongoose";
import GroupModel from "@/model/Group.model";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("subjectId");
        const { name } = await request.json();

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
            admin: userId,
        });

        if (!group) {
            return new Response(
                JSON.stringify({ success: false, message: "Not authorized to add members" }),
                { status: 403 }
            );
        }


        const member = await UserModel.findOne({ username: name });
        if (!member) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                { status: 404 }
            );
        }

        
        // Check if user is already in the group
        if (group.members.some((m) => m.toString() === member.id.toString())) {
            return new Response(
                JSON.stringify({ success: false, message: "User is already a member" }),
                { status: 400 }
            );
        }

        

        
        // Add member and save
        group.members.push(member.id);
        await group.save();

        return new Response(
            JSON.stringify({ success: true, message: "Member added successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred while adding member:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }),
            { status: 500 }
        );
    }
}
