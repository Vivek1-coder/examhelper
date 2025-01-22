import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NoteModel from "@/model/Note.model";

export async function GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    console.log("Session:", session);

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");
    if(!subjectId){
        return Response.json(
            {
                success : false,
                message:"No subjectId"
            },
            { status : 401 }
        )
    }
    

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

    try {
        const notes = await NoteModel.aggregate([
            {$match:{subjectId: new mongoose.Types.ObjectId(subjectId)}}
        ]);

        if(!notes || notes.length === 0){
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Notes not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Subjects playlists found",
                notes : notes,
            }),
            { status: 200 }
        );
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