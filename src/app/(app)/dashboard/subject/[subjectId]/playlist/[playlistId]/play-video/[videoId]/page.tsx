"use client";
import Navbarvideo from "@/components/Navbar/Playvideonavbar";
import VideoPlayer from "@/components/Videoplayer";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const videoId = params?.videoId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
      
  }, []);

  return (
    <div className="h-screen w-full relative text-white overflow-x-clip">
      <div className="absolute top-0 w-screen">
        <Navbarvideo />
      </div>
      <div className="w-full h-1/2 absolute top-16 ">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <VideoPlayer videoId={`${videoId}`} />
        )}
      </div>
    </div>
  );
};

export default page;
