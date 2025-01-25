
"use client";
import subjectLogo from "../../../public/subjectLogo.jpg"
import Image from "next/image";
import './card2.css'

interface cardprops{
    subjectName:string;
    subjectId:string;
    author:string;
    likes:number;
    title:string;
}

export function Card({subjectName,subjectId,author,likes,title}:cardprops) {
  return (
    <a href={`/dashboard/subject/${subjectId}/${title}`}>
    <div className='h-56 w-56 flex flex-col rounded-2xl gap-2 card border text-white' >
        <div className='flex w-full h-20'>
        <Image src={subjectLogo} className="rounded-t-lg"  alt="" />
        </div>
        <div className='flex flex-col justify-center w-full text-center  gap-2 p-2 '>
        <p className='font-bold text-lg'>{subjectName}</p>
        <br />
        <p className='font-light text-sm'>Likes : {likes}</p>
        </div>
        
    </div> 
    </a>
  );
}
