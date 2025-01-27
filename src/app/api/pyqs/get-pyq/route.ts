import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import PYQModel from "@/model/PYQ.model";

export async function GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    

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
    

    if(!session || !session.user){
        return Response.json(
            {
                success : false,
                message:"Not Authentication"
            },
            { status : 401 }
        )
    }

    try {
        const pyqs = await PYQModel.aggregate([
            {$match:{subjectId: new mongoose.Types.ObjectId(subjectId)}}
        ]);

        if(!pyqs || pyqs.length === 0){
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "pyqs not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Subjects playlists found",
                pyqs : pyqs,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred while getting pyqs:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while getting pyqs",
            }),
            { status: 500 }
        );
    }
}