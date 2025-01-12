import dbConnect from "@/lib/dbConnect"
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import VivaqModel from "@/model/Vivaq.model";

async function POST(request:Request) {
    await dbConnect();
    const {name,content,subjectId} = await request.json();

    try{
        const newVivaq =new VivaqModel({
            name,
            content,
            subject:subjectId
        })
        await newVivaq.save();

        return Response.json(
            {
                success:true,
                message:"New note added successfully."
            },
            {
                status:200
            }
        )
    }catch (error) {
        console.error('Error in adding note', error);
        return Response.json(
          {
            success: false,
            message: 'Error in adding note',
          },
          { status: 500 }
        );
      }
}