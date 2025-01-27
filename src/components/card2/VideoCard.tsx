
"use client";

import './card2.css'
import Image from 'next/image'

interface cardprops{
    thumbnail:string;
    title:string;
    author:string;
}

export function VideoCard({thumbnail,title,author}:cardprops) {
  return (
    
    <div className='h-56 w-56 flex flex-col rounded-2xl gap-2 card border ' >
        <div className='flex w-full h-20'>
        <Image
          className="rounded-t-lg w-full"
          src={thumbnail} // Ensure `thumbnail` is an absolute path or starts with `/` if local
          alt=""
          layout="responsive" // You can adjust layout to "intrinsic" or "fixed" if needed
          width={500} // Replace with the actual width of your image
          height={300} // Replace with the actual height of your image
        />
        </div>
        <div className='flex flex-col justify-center w-full text-center  gap-2 p-2 '>
        <p className='font-bold text-lg h-20 overflow-y-auto'>{title}</p>
        <p className='font-light text-sm'>Channel : {author}</p>
        </div>
        
    </div> 
    
  );
}
