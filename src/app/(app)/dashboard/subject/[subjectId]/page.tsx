"use client";
import { Card } from "@/components/card2/Card";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const subjectId = params?.subjectId;

  return (
    <div>
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <div className="w-screen md:h-screen flex flex-wrap justify-center items-center gap-10 max-md:py-28">
        <Card
          subjectId={subjectId as string}
          title="notes"
          subjectName="Notes"
          likes={0}
        />
        <Card
          subjectId={subjectId as string}
          title="pyqs"
          subjectName="Pyqs"
          likes={0}
        />
        <Card
          subjectId={subjectId as string}
          title="vivaq"
          subjectName="Important ques"
          likes={0}
         
        />
        <Card
          subjectId={subjectId as string}
          title="playlist"
          subjectName="Playlist"
          likes={0}
          
        />
      </div>
    </div>
  );
};

export default Page;
