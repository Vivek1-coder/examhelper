'use client'
import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {
    const params = useParams();
    const subjectId = params?.subjectId;
  return (
    <div>
      welcome
    {subjectId}
    </div>
  )
}

export default page
