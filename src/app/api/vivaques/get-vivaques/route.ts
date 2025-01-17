import SubjectModel from "@/model/Vivaq.model";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import VivaqModel from "@/model/Vivaq.model";

export async function GET(request: Request) {
    await dbConnect();

    // Parse query parameters from the URL
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    if (!subjectId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing subjectId parameter" }),
            { status: 400 }
        );
    }

    // Get session
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    // Check if the user is authenticated
    if (!session || !session.user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not Authenticated",
            }),
            { status: 401 }
        );
    }

    

    try {
        // Fetch questions for the given subjectId
        const ques = await VivaqModel.aggregate([
            { $match: { subjectId: new mongoose.Types.ObjectId(subjectId) } },
        ]);

        if (!ques || ques.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Questions not found",
                }),
                { status: 404 }
            );
        }
       
        return new Response(
            JSON.stringify({
                success: true,
                message: "User questions found",
                ques: ques,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred while getting questions:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while getting subjects",
            }),
            { status: 500 }
        );
    }
}
