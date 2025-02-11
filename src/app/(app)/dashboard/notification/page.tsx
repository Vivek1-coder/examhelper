"use client"
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<{ message: string; createdAt: Date }[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function fetchNotifications() {
            const res = await fetch("/api/notifications");
            const data = await res.json();
            if (data.success) {
                setNotifications(data.notifications);
            }
        }
        
        async function checkAdmin() {
            const session = await getSession();
            if (session?.user?.email === "vy212205@gmail.com") {
                setIsAdmin(true);
            }
        }

        fetchNotifications();
        checkAdmin();
    }, []);

    async function sendNotification() {
        const res = await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: newMessage })
        });
        const data = await res.json();
        if (data.success) {
            setNotifications([{ message: newMessage, createdAt: new Date() }, ...notifications]);
            setNewMessage("");
        }
    }

    return (
        <div className="p-6 text-white bg-gray-900 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">📢 Notifications</h1>
    
        {isAdmin && (
            <div className="mb-6 w-full max-w-md">
                <input
                    type="text"
                    className="p-3 border border-gray-700 bg-gray-800 text-white w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Enter notification message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                    onClick={sendNotification} 
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md shadow-md transition-all duration-200"
                >
                    🚀 Send Notification
                </button>
            </div>
        )}
    
        <div className="w-full max-w-lg">
            {notifications.length > 0 ? (
                <ul className="space-y-3 w-full">
                    {notifications.map((notif, index) => (
                        <li 
                            key={index} 
                            className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 transition hover:bg-gray-700"
                        >
                            <p className="text-md">{notif.message}</p>
                            <p className="text-sm text-gray-400">{new Date(notif.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-center">No notifications yet.</p>
            )}
        </div>
    </div>
    
    );
}
