
"use client";

import './card.css'

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
    <div className='h-56 w-56 flex flex-col rounded-2xl gap-2 card border ' >
        <div className='flex w-full h-20'>
        <img className = " rounded-t-lg" src="https://static.vecteezy.com/system/resources/previews/014/572/370/non_2x/line-icon-for-subject-vector.jpg" alt="" />
        </div>
        <div className='flex flex-col justify-center w-full text-center  gap-2 p-2 '>
        <p className='font-bold text-lg'>{subjectName}</p>
        <p className='font-light text-sm'>Author : {author}</p>
        <p className='font-light text-sm'>Likes : {likes}</p>
        </div>
        
    </div> 
    </a>
  );
}
