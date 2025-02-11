import SubjectModel from "@/model/Subject.model";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import GroupModel from "@/model/Group.model";
import { NextResponse } from "next/server"; // Import NextResponse for API responses

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            { status: 401 }
        );
    }

    const user: User = session.user as User;
    if (!user._id) {
        return NextResponse.json(
            {
                success: false,
                message: "User ID not found in session",
            },
            { status: 400 }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        // Fetch subjects where the user is the author
        const subjects = await SubjectModel.find({ author: userId }).sort({ name: -1 });

        // Find groups where the user is a member
        const userGroups = await GroupModel.find({ members: userId });

        // Extract all member IDs from those groups
        const memberIds = new Set();
        userGroups.forEach(group => {
            group.members.forEach(member => memberIds.add(member.toString()));
        });

        // Find subjects where the author is one of the group members
        const subjects2 = await SubjectModel.find({ author: { $in: Array.from(memberIds) } });

        // console.log("User Subjects:", subjects2);

        // Merge subjects (avoid duplicates)
        const mergedSubjects = [...subjects, ...subjects2].filter(
            (subject, index, self) =>
                index === self.findIndex(s => s.id.toString() === subject.id.toString())
        );

        return NextResponse.json(
            {
                success: true,
                message: "User subjects found",
                subjects: mergedSubjects,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred while getting subjects:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error occurred while getting subjects",
            },
            { status: 500 }
        );
    }
}
