import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import NoteModel from "@/model/Note.model";
import PYQModel from "@/model/PYQ.model";

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

    try {
        const userId = new mongoose.Types.ObjectId(user._id);
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("subjectId");
        const pyqId = searchParams.get("pyqId");
    
        if (!subjectId || !pyqId) {
            console.error("Missing subjectId or pyqId:", { subjectId, pyqId });
            return new Response(
              JSON.stringify({
                success: false,
                message: "Subject ID or pyq ID not provided",
              }),
              { status: 400 }
            );
          }
    
          const pyq= await PYQModel.findById(new mongoose.Types.ObjectId(pyqId));
    
          if (!pyq) {
            console.error("Playlist not found for ID:", pyq);
            return new Response(
              JSON.stringify({
                success: false,
                message: "note not found",
              }),
              { status: 404 }
            );
          }
          if (
            pyq.userId.toString() !== userId.toString() ||
            pyq.subjectId.toString() !== subjectId
          ) {
            console.error("Authorization error:", {
              userId: userId.toString(),
              playlistUserId: pyq.userId.toString(),
              playlistSubjectId: pyq.subjectId.toString(),
            });
            return new Response(
              JSON.stringify({
                success: false,
                message: "You are not authorized to delete this pyq",
              }),
              { status: 403 }
            );
          }
      
          console.log("Deleting pyqs");
          await NoteModel.findByIdAndDelete(pyqId);
      
          return new Response(
            JSON.stringify({
              success: true,
              message: `Pyqs deleted successfully.`,
            }),
            { status: 200 }
          );
    } catch (error) {
        console.error('Internal server error', error);
        return new Response(
        JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
}