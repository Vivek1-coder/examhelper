import React from 'react'

const Footer = () => {
  return (
    <div className='absolute bottom-0 bg-gray-600 w-full text-center flex justify-between px-10'>
      <p>Copyright <span className='font-bold'><a href="https://github.com/Vivek1-coder">@Vivek1-coder</a></span> </p>
      <div className='flex gap-2 md:w-88 text-black justify-center items-center'>
      <p className='md:font-semibold'>Follow me on : </p>
      <a href="https://linkedin.com/in/vivek1-coder/">@LinkedIn</a>
      <a href="https://github.com/Vivek1-coder">@Github</a>
      <a href="https://www.instagram.com/viv.ek_18055/">@Instagram</a>
    </div>
    </div>
  )
}

export default Footer
