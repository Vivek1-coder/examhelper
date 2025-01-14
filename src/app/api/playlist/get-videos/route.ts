import dbConnect from "@/lib/dbConnect";
import VideoModel from "@/model/Video.model";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect()

    const {searchParams} = new URL(request.url);
    const subjectId = searchParams.get("subjectId");
    const playlistId = searchParams.get("playlistId");

    if (!subjectId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing subjectId parameter"}),
            { status: 400 }
        );
    }
    if (!playlistId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing playlistId parameter"}),
            { status: 400 }
        );
    }
    try {
        // Fetch questions for the given subjectId
        const videos = await VideoModel.aggregate([
            { $match: { subjectId: new mongoose.Types.ObjectId(subjectId), playlistId: playlistId } },
        ]);

        if (!videos || videos.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Videos not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Subjects playlists found",
                videos:videos,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred while getting playlists:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while getting videos",
            }),
            { status: 500 }
        );
    }
}

