import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import GroupModel from "@/model/Group.model";

export async function GET() {
    await dbConnect();

    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new Response(
                JSON.stringify({ success: false, message: "Not authenticated" }),
                { status: 401 }
            );
        }

        const userId = new mongoose.Types.ObjectId(session.user._id);

        // Find all groups where the user is an admin or a member
        const groups = await GroupModel.find({
            $or: [{ admin: userId }, { members: userId }]
        }).select("groupName");

        // Extract only group names
        const groupNames = groups.map(group => group.groupName);

        return new Response(
            JSON.stringify({ success: true, groupNames }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching groups:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }),
            { status: 500 }
        );
    }
}
