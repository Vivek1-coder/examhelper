import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import NoteModel from "@/model/Note.model";

export async function DELETE(request:Request) {
    await dbConnect();

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
    const noteId = searchParams.get("noteId");

    if (!subjectId || !noteId) {
        console.error("Missing subjectId or noteId:", { subjectId, noteId });
        return new Response(
          JSON.stringify({
            success: false,
            message: "Subject ID or note ID not provided",
          }),
          { status: 400 }
        );
      }
      const notId = new mongoose.Types.ObjectId(noteId);
      const note= await NoteModel.findById(notId);

      if (!note) {
        console.error("Playlist not found for ID:", note);
        return new Response(
          JSON.stringify({
            success: false,
            message: "note not found",
          }),
          { status: 404 }
        );
      }
      if (
        note.userId.toString() !== userId.toString() ||
        note.subjectId.toString() !== subjectId
      ) {
        console.error("Authorization error:", {
          userId: userId.toString(),
          playlistUserId: note.userId.toString(),
          playlistSubjectId: note.subjectId.toString(),
        });
        return new Response(
          JSON.stringify({
            success: false,
            message: "You are not authorized to delete this note",
          }),
          { status: 403 }
        );
      }
  
      console.log("Deleting notes");
      await NoteModel.findByIdAndDelete(noteId);
  
      return new Response(
        JSON.stringify({
          success: true,
          message: `Notes deleted successfully.`,
        }),
        { status: 200 }
      );

}