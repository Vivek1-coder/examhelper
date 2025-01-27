import dbConnect from "@/lib/dbConnect";
import { getServerSession} from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import PYQModel from "@/model/PYQ.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    const { name, content, semester, year } = await request.json();

    // Validate required fields
    if (!subjectId || !name || !content || !semester || !year) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.error("Unauthenticated request");
      return new Response(
        JSON.stringify({
          success: false,
          message: "User is not authenticated",
        }),
        { status: 401 }
      );
    }

    // Validate ObjectIds
    let userId, subjectObjectId;
    try {
      userId = new mongoose.Types.ObjectId(session.user._id);
      subjectObjectId = new mongoose.Types.ObjectId(subjectId);
    } catch (error) {
      console.error("Invalid ObjectId:", error);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid userId or subjectId",
        }),
        { status: 400 }
      );
    }

    // Create new PYQ entry
    const newPYQ = new PYQModel({
      name,
      content,
      year,
      sem: semester,
      subjectId: subjectObjectId,
      userId,
    });

    await newPYQ.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "PYQ added successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal server error", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}
