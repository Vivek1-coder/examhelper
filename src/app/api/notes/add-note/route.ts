import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import NoteModel from "@/model/Note.model";

export async function POST(request:Request){
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");
    const {name,content} =await request.json();
    
    const session = await getServerSession(authOptions)
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

    const newNote = new NoteModel({
      name,
      content,
      subjectId,
      userId
    })
    
    await newNote.save();

    return new Response(
      JSON.stringify({
        success:true,
        message:"Note added successfully"
      }),
      {status:200}
    )

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