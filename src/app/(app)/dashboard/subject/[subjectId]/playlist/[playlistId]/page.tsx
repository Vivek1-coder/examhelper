'use client'
import { VideoCard } from '@/components/card2/VideoCard'
import NavbarQues from '@/components/Navbar/VideoNavbar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Video } from '@/model/Video.model'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import { Loader2, LoaderPinwheel } from 'lucide-react'
import { setLazyProp } from 'next/dist/server/api-utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const page = () => {

  const [videos,setVideos] = useState<Video[]>([])
  const [loading,setLoading] = useState(true)
  const {toast} = useToast();

  const params = useParams();
    const subjectId = params?.subjectId;
    const playlistId = params?.playlistId;

  const fetchAllVideos = useCallback(
    async(refresh:boolean= false)=>{
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(`/api/playlist/get-videos?subjectId=${subjectId}&playlistId=${playlistId}`)
        setVideos(response.data.videos||[])

        if(refresh){
          toast({
            title:"Refreshed videos",
            description:"Showing refreshed videos"
          });
        }
        setLoading(false);
      } catch (error) {
         const axiosError = error as AxiosError<ApiResponse>;
                toast({
                  title: "Error",
                  description:
                    axiosError.response?.data.message || "Failed to fetch subjects",
                  variant: "destructive",
                });
                console.error("Error fetching user subjects:", error);
                setLoading(false);
              }
    },[toast]
  )

  useEffect(() => {
    fetchAllVideos()
  }, [fetchAllVideos,toast])
  
  return (
    <div className='relative h-screen text-white'>
      <div className='absolute top-0 w-full'>
        <NavbarQues/>
      </div>
      <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="flex flex-wrap w-4/5 h-3/4 justify-center rounded-3xl p-3 overflow-y-auto gap-8">
      { videos.length > 0 ?
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
        )) : loading ?<LoaderPinwheel className="animate-spin"/>:
        <p>No videos found.</p>
      }

      </div>
      
      </div>
    
    </div>
  )
}

export default page
