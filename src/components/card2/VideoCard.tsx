
"use client";

import './card.css'

interface cardprops{
    thumbnail:string;
    title:string;
    author:string;
}

export function VideoCard({thumbnail,title,author}:cardprops) {
  return (
    
    <div className='h-56 w-56 flex flex-col rounded-2xl gap-2 card border ' >
        <div className='flex w-full h-20'>
        <img className = " rounded-t-lg w-full" src={`${thumbnail}`} alt="" />
        </div>
        <div className='flex flex-col justify-center w-full text-center  gap-2 p-2 '>
        <p className='font-bold text-lg h-20 overflow-y-auto'>{title}</p>
        <p className='font-light text-sm'>Channel : {author}</p>
        </div>
        
    </div> 
    
  );
}
