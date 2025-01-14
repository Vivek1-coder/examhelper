'use client'
import { VideoCard } from '@/components/card2/VideoCard'
import NavbarQues from '@/components/Navbar/Navbar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Video } from '@/model/Video.model'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const page = () => {

  const [videos,setVideos] = useState<Video[]>([])
  const {toast} = useToast();

  const params = useParams();
    const subjectId = params?.subjectId;
    const playlistId = params?.playlistId;

  const fetchAllVideos = useCallback(
    async(refresh:boolean= false)=>{
      try {
        const response = await axios.get<ApiResponse>(`/api/playlist/get-videos?subjectId=${subjectId}&playlistId=${playlistId}`)
        setVideos(response.data.videos||[])

        if(refresh){
          toast({
            title:"Refreshed videos",
            description:"Showing refreshed videos"
          });
        }
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>;
                toast({
                  title: "Error",
                  description:
                    axiosError.response?.data.message || "Failed to fetch subjects",
                  variant: "destructive",
                });
                console.error("Error fetching user subjects:", error);
              }
    },[toast]
  )

  useEffect(() => {
    fetchAllVideos()
  }, [fetchAllVideos,toast])
  
  return (
    <div>
      <div>
        <NavbarQues/>
      </div>
      <div className='flex flex-wrap justify-center p-10 mx-5 h-5/6 overflow-y-auto gap-6'>
      {
        videos.map((video)=>(
          <div key={video._id as string}>
            <Link href={`${playlistId}/play-video/${video.videoId}`}>
              <VideoCard 
              thumbnail={video.thumbnail}
              title={video.title}
              author={video.author}
              />
            </Link>
          </div>
        ))
      }
      </div>
    
    </div>
  )
}

export default page
