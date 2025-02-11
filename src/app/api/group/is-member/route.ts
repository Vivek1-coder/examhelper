import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import GroupModel from "@/model/Group.model";
import UserModel from "@/model/User.model";

export async function GET(request:Request){
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("subjectId");
        const session = await getServerSession(authOptions);
                if (!session || !session.user) {
                    return new Response(
                        JSON.stringify({ success: false, message: "Not authenticated" }),
                        { status: 401 }
                    );
                }
        
        const userId = new mongoose.Types.ObjectId(session.user._id);

        const group = await GroupModel.findOne({
            subjectId:subjectId,
            members: userId,
           
          });

        

        if(!group){
            return new Response(
                JSON.stringify({success:true,message:"Not member"}),
                {status:200}
            );
        }

        const AdminId = group?.admin;
        const Admin = await UserModel.findById(AdminId);

        const adminusername = Admin?.username;
        const groupName = group?.groupName;
        console.log("Admin ",adminusername)
        return new Response(
            JSON.stringify({success:true,message:"Member",adminName:adminusername,groupName:groupName}),
            {status:200}
        );
        
    } catch (error) {
        console.error("Error fetching group members:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error while checking member" }),
            { status: 500 }
        );
    }
}