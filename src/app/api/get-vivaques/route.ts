

import SubjectModel from "@/model/Vivaq.model";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import VivaqModel from "@/model/Vivaq.model";

export async function GET(request:Request) {
    await dbConnect()
    const subjectId = request.json()
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

    try {
        const ques = await VivaqModel.aggregate([
            {$match : {subject:subjectId}},
        ])

        if(!ques || ques.length == 0){
            return Response.json(
                {
                    success:false,
                    message:"Questions not found"
                }
            )
        }

        return Response.json(
            {
                success:true,
                message:"User questions found",
                ques:ques
            },
            {status:200}
        )
    } catch (error) {
        console.log("Error occured while getting messages",error)
        return Response.json(
            {
                success : false,
                message:"Error occured while getting subjects"
            },
            { status : 401 }
        )
    } 
    
}