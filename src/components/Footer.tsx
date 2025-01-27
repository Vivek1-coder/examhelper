
import instaIcon from "../../public/insta.svg"
import githubIcon from "../../public/github.svg"
import linkedInIcon from "../../public/linkedIn.svg"
import Image from "next/image";
import React from 'react'

const Footer = () => {
  return (
    <div className='md:fixed md:bottom-0 bg-gray-500 w-full text-center md:flex  justify-between px-10 text-white bg-opacity-10 p-1'>
      <p>Copyright <span className='font-bold'><a href="https://github.com/Vivek1-coder">@Vivek1-coder</a></span> </p>
      <div className='flex flex-wrap gap-5 md:w-88 text-white justify-center items-center '>
      <p className='md:font-semibold'>Follow me on : </p>
      <a href="https://linkedin.com/in/vivek1-coder/" target='_blank' className="hover:scale-105"><Image src={linkedInIcon} alt="Instagram" width={18} height={18} /></a>
      <a href="https://github.com/Vivek1-coder" target='_blank' className="hover:scale-105"><Image src={githubIcon} alt="Instagram" width={18} height={18} /></a>
      <a href="https://www.instagram.com/the.developer18/" target='_blank' className="hover:scale-105"><Image src={instaIcon} alt="Instagram" width={18} height={18} /></a>
    </div>
    </div>
  )
}

export default Footer
