import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import GroupModel from "@/model/Group.model";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { name } = await request.json();
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("subjectId");

        const session = await getServerSession(authOptions);
        const user: User = session?.user as User;

        if (!session || !session.user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Not Authenticated",
                }),
                { status: 401 }
            );
        }

        const adminId = new mongoose.Types.ObjectId(user._id);
        if (!mongoose.Types.ObjectId.isValid(subjectId as string)) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Invalid subjectId",
                }),
                { status: 400 }
            );
        }

        // await GroupModel.collection.dropIndex("members.username_1");
        

        const newGroup = new GroupModel({
            groupName: name,
            admin: adminId,
            subjectId: new mongoose.Types.ObjectId(subjectId as string),
            members: [adminId], // ✅ ObjectId only
        });
        

        await newGroup.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: `${name} created successfully`,
            }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Internal server error while creating group", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message || "Error while creating new group",
            }),
            { status: 500 }
        );
    }
}
