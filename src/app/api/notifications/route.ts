import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";


import { authOptions } from "../auth/[...nextauth]/options";
import NotificationModel from "@/model/Notification.model";

export async function GET() {
    await dbConnect();
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify({ success: true, notifications }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Error fetching notifications" }), { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = "vy212205@gmail.com"; // Replace with your actual admin email

        if (!session || session.user.email !== adminEmail) {
            return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 403 });
        }
        
        const { message } = await request.json();
        if (!message) {
            return new Response(JSON.stringify({ success: false, message: "Message is required" }), { status: 400 });
        }

        const newNotification = new NotificationModel({ message });
        await newNotification.save();

        return new Response(JSON.stringify({ success: true, message: "Notification sent successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/notifications:", error);
        return new Response(JSON.stringify({ success: false, message: "Error sending notification", error: error}), { status: 500 });
    }
}
