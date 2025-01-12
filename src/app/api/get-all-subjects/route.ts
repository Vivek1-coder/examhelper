

import SubjectModel from "@/model/Subject.model";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request:Request) {
    await dbConnect()

    try {
        const subjects = await SubjectModel.aggregate([
            {$match : {isPublic:true}},
            {$sort:{'name':-1}}
        ])
        
        if(!subjects || subjects.length == 0){
            return Response.json(
                {
                    success:false,
                    message:"Subjects not found"
                }
            )
        }

        return Response.json(
            {
                success:true,
                message:"User message found",
                subjects:subjects
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