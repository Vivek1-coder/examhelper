"use client";
import { Card } from "@/components/card2/Card";
import Navbar from "@/components/Navbar/Navbar";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const subjectId = params?.subjectId;

  return (
    <div>
      <div className="absolute top-0 w-full">
        <Navbar />
      </div>
      <div className="w-screen h-screen flex justify-center items-center gap-10">
        <Card
          subjectId={subjectId as string}
          title="notes"
          subjectName="Notes"
          likes={0}
          author="Self"
        />
        <Card
          subjectId={subjectId as string}
          title="pyqs"
          subjectName="Pyqs"
          likes={0}
          author="Self"
        />
        <Card
          subjectId={subjectId as string}
          title="vivaq"
          subjectName="Important ques"
          likes={0}
          author="Self"
        />
        <Card
          subjectId={subjectId as string}
          title="playlist"
          subjectName="Playlist"
          likes={0}
          author="Self"
        />
      </div>
    </div>
  );
};

export default page;
