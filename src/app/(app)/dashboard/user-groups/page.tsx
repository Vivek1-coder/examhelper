"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar2";

export default function GroupsPage() {
    const [groupNames, setGroupNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch("/api/group/fetch-groups");
                const data = await response.json();

                if (data.success) {
                    // Capitalizing each group name
                    const formattedNames = data.groupNames.map((name: string) =>
                        name.replace(/\b\w/g, (char) => char.toUpperCase())
                    );
                    setGroupNames(formattedNames);
                } else {
                    setError("Failed to fetch groups");
                }
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);


    return (
        <section className="h-screen relative">
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-20 pb-10 px-4">
            <h1 className="text-3xl font-bold text-gray-100 mb-6">📌 Your Groups</h1>

            {loading && <p className="text-gray-400">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}

            {!loading && !error && groupNames.length === 0 && (
                <p className="text-gray-400">You are not part of any groups yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {groupNames.map((groupName, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 bg-opacity-75 backdrop-blur-lg shadow-lg rounded-xl p-6 flex items-center justify-center transition-transform transform hover:scale-105 hover:bg-opacity-90"
                    >
                        <p className="text-lg font-semibold text-white">{groupName}</p>
                    </div>
                ))}
            </div>
        </div>
        </section>
    );
}
