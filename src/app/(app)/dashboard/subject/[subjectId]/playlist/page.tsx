'use client'

import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import AddPlaylist from '@/components/AddPlaylist';
import { useParams, useRouter } from 'next/navigation';
import { Playlist } from '@/model/Playlist.model';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/hooks/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { PlaylistCard } from '@/components/card2/PlaylistCard';
import NavbarQues from '@/components/Navbar/Playlistnavbaar';
import { Loader2, LoaderPinwheel } from 'lucide-react';


const PlaylistPage = () => {
  
  const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [fetching,setIsFetching] = useState(true);
  const [isPublic,setIsPublic] = useState(false);
  const {toast} = useToast();
  
  const params = useParams();
  const subjectId = params?.subjectId;
  const router = useRouter()

  const fetchStatus = async () => {
    try {
      const result = await axios.get<ApiResponse>(`/api/subject/get-status?subjectId=${subjectId}`);
      if (result.data.message === "Public") {
        setIsPublic(true);
      }
    } catch (error) {
      console.error("Failed to fetch subject status", error);
    }finally{
      setIsFetching(false);
    }
  };

  const fetchAllPlaylists = useCallback(
    async(refresh:boolean = false)=>{
      try {
        setIsLoading(true);
        const response = await axios.get<
        ApiResponse>(`/api/playlist/get-playlist?subjectId=${subjectId}`);
        setPlaylistData(response.data.playlists || [])

        if(refresh){
          toast({
            title:"Refreshed playlist",
            description:"Showing refreshed playlists"
          });
        }
        setIsLoading(false)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
          title:"Error",
          description:
          axiosError.response?.data.message || "Failed to fetch playlist",
        variant: "destructive",
        })
        setIsLoading(false);
      }

    },[toast]
  )


  useEffect(()=>{
    fetchStatus();
    fetchAllPlaylists();
  },[fetchAllPlaylists,toast,subjectId])

  

  return (
    
    <div className='relative w-screen h-screen text-white'>
      <div>
       <NavbarQues/>
      </div>
      <div className='absolute top-24 right-11'>
      {!isPublic && !fetching && (<AddPlaylist subjectId={`${subjectId}`} onAdd={fetchAllPlaylists}/>)}
      </div>
      <div className='flex flex-wrap justify-center p-10 mx-5 h-5/6 overflow-y-auto gap-6'>

      {playlistData.length>0 ?
        playlistData.map((playlists)=>(
          <div key={playlists._id as string}>
            
              <PlaylistCard 
              playlistId={playlists._id as string}
              subjectId={playlists.subjectId.toString()}
              thumbnail={`${playlists.thumbnail}`} 
              title={playlists.name}
              onDelete={fetchAllPlaylists}
              nvideos={playlists.totalVideos}
              />
            
          </div>
        )) : loading ?<LoaderPinwheel className="animate-spin"/>:
        <p>No playlists found.</p>
      }
      </div>
      

    </div>
  );
};

export default PlaylistPage;

