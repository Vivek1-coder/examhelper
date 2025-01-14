import dbConnect from "@/lib/dbConnect";
import PlaylistModel from "@/model/Playlist.model";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect()

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    if (!subjectId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing subjectId parameter"}),
            { status: 400 }
        );
    }

    try {
        // Fetch questions for the given subjectId
        const playlists = await PlaylistModel.aggregate([
            { $match: { subjectId: new mongoose.Types.ObjectId(subjectId) } },
        ]);

        if (!playlists || playlists.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Playlists not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Subjects playlists found",
                playlists: playlists,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error occurred while getting playlists:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while getting playlists",
            }),
            { status: 500 }
        );
    }
}
