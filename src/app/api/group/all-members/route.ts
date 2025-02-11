/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import GroupModel from "@/model/Group.model";

export async function GET(request: Request) {
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

        // Find the group where the user is an admin or a member
        const group = await GroupModel.findOne({
            subjectId: new mongoose.Types.ObjectId(subjectId as string),
            $or: [{ admin: userId }, { members: userId }],
        }).populate({ path: "members", select: "username email", model: "User" }); // Get only usernames and emails

        if (!group) {
            return new Response(
                JSON.stringify({ success: false, message: "Group not found or not authorized" }),
                { status: 404 }
            );
        }
        
        const members = group.members;
        const memberNames = members.map((member: any) => member.username);
        // const memberNames = group.members.map(member => member.);
        // console.log(memberNames); // Output: ['vivek', 'vivek2']
        // console.log(typeof(memberNames[0]))
        // console.log(memberNames);

        return new Response(
            JSON.stringify({ success: true, message:"User fetched successfully",members:memberNames}),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching group members:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error" }),
            { status: 500 }
        );
    }
}
