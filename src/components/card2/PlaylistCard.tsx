
"use client";

import './card.css'

interface cardprops{
    thumbnail:string;
    title:string;
    nvideos:number;
}

export function PlaylistCard({thumbnail,title,nvideos}:cardprops) {
  return (
    <div className='h-56 w-56 flex flex-col rounded-2xl gap-2 card border ' >
        <div className='flex w-full h-20'>
        <img className = " rounded-t-lg w-full" src={`${thumbnail}`} alt="" />
        </div>
        <div className='flex flex-col justify-center w-full text-center  gap-2 p-2 overflow-y-scroll'>
        <p className='font-bold text-lg'>{title}</p>
        <p className='font-light text-sm'>Videos : {nvideos}</p>
        </div>
    </div> 
  );
}
