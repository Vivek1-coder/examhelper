'use client'

import axios from 'axios';
import React, { useState } from 'react'

const page = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submitpdf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title)
    if (file) {
      formData.append("file", file);
    }
    console.log(title,file);
    try {
      const result = await axios.post('/api/uploadpdf',formData,{headers:{"Content-Type":"multipart/form-data"}})
      console.log(result);
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div>
      <form action="" className="" onSubmit={submitpdf}>
      <input type="text" className="" placeholder='Title' required
        onChange={(e)=>setTitle(e.target.value)}
      />  
      <input type="file" className='' accept='application/pdf'  required
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button type='submit'>Submit</button>
      </form>
    </div>

    
  )
}

export default page