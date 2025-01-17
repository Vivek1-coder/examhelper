import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import VideoModel from "@/model/Video.model";
import PlaylistModel from "@/model/Playlist.model";

export async function DELETE(request: Request) {
  try {
    // Connect to the database
    await dbConnect();
    console.log("Database connection established.");

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      console.error("User not authenticated.");
      return new Response(
        JSON.stringify({ success: false, message: "Not Authenticated" }),
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");
    const playlistId = searchParams.get("playlistId");

    if (!subjectId || !playlistId) {
      console.error("Missing subjectId or playlistId:", { subjectId, playlistId });
      return new Response(
        JSON.stringify({
          success: false,
          message: "Subject ID or Playlist ID not provided",
        }),
        { status: 400 }
      );
    }

    console.log("Fetching playlist with ID:", playlistId);
    const playlist = await PlaylistModel.findById(playlistId);

    if (!playlist) {
      console.error("Playlist not found for ID:", playlistId);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Playlist not found",
        }),
        { status: 404 }
      );
    }

    if (
      playlist.userId.toString() !== userId.toString() ||
      playlist.subjectId.toString() !== subjectId
    ) {
      console.error("Authorization error:", {
        userId: userId.toString(),
        playlistUserId: playlist.userId.toString(),
        playlistSubjectId: playlist.subjectId.toString(),
      });
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to delete this playlist",
        }),
        { status: 403 }
      );
    }

    console.log("Deleting playlist and associated videos...");
    await PlaylistModel.findByIdAndDelete(playlistId);

    const deletedVideos = await VideoModel.deleteMany({
      playlistId,
      subjectId: new mongoose.Types.ObjectId(subjectId),
      userId,
    });

    console.log(
      `Successfully deleted playlist and ${deletedVideos.deletedCount} videos.`
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: `Playlist and ${deletedVideos.deletedCount} videos deleted successfully.`,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in DELETE operation:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while processing the request.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
