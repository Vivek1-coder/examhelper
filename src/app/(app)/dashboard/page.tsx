"use client";

import Navbar from "@/components/Navbar/Navbar2";
import Typewriter from "@/components/TypingAnimation/Typewriter";
import React from "react";
import Image from "next/image";
import Home from "../../../../public/Exambuddy.png";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  return (
    <div className="relative ">
      <div className="absolute top-0 w-full text-white ">
        <Navbar />
      </div>
     
      <div className="flex max-md:flex-col justify-center items-center">
        <div className="w-full md:w-1/2 flex justify-center max-md:items-center mr-1 ">
          <div className="w-full rounded-xl ml-6 text-center p-6 md:bg-black sm:shadow-md sm:shadow-white  text-white  max-md:mt-32 ">
            <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-500">
              Welcome {session?.user.name || session?.user.username}!!!
            </p>

            <h1 className="text-5xl font-extrabold mt-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
                XAM BUDDY
              </span>
            </h1>
            <br />
            <p className="mt-4 text-lg">
              Your ultimate companion to make preparation
            </p>

            <div className="font-bold text-2xl ">
              <Typewriter
                words={[
                  "Structured",
                  "Well Planned",
                  "Distractionless",
                  "Stress Free",
                ]}
              />
            </div>
          </div>
        </div>

        <Image src={Home} alt="Home" className="w-full md:w-1/2 h-screen" />
      </div>
    </div>
  );
};

export default Dashboard;
