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
import { Loader2 } from 'lucide-react';


const PlaylistPage = () => {
  
  const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {toast} = useToast();
  const params = useParams();
  const subjectId = params?.subjectId;
  const router = useRouter()

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPlaylistLink(e.target.value);
  //   setError(null); // Clear any previous errors
  // };

  const fetchAllPlaylists = useCallback(
    async(refresh:boolean = false)=>{
      try {
        setLoading(true);
        const response = await axios.get<
        ApiResponse>(`/api/playlist/get-playlist?subjectId=${subjectId}`);
        setPlaylistData(response.data.playlists || [])

        if(refresh){
          toast({
            title:"Refreshed playlist",
            description:"Showing refreshed playlists"
          });
        }
        setLoading(false)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
          title:"Error",
          description:
          axiosError.response?.data.message || "Failed to fetch playlist",
        variant: "destructive",
        })
        setLoading(false);
      }

    },[toast]
  )


  useEffect(()=>{
    fetchAllPlaylists();
  },[fetchAllPlaylists,toast])

  

  return (
    
    <div className='relative w-screen h-screen text-white'>
      <div>
       <NavbarQues/>
      </div>
      <div className='absolute top-24 right-11'>
      <AddPlaylist subjectId={`${subjectId}`} onAdd={fetchAllPlaylists} />
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
        )) : loading ?<Loader2 className="animate-spin"/>:
        <p>No playlists found.</p>
      }
      </div>
      

    </div>
  );
};

export default PlaylistPage;



// <form onSubmit={handleSubmit}>
//   <input
//     type="text"
//     value={playlistLink}
//     onChange={handleInputChange}
//     placeholder="Enter YouTube Playlist URL"
   
//     required
//   />
//   <button type="submit">Extract Playlist ID</button>
// </form>
// <h1>Playlist Videos</h1>
// {playlistData && playlistData.items ? (
//   <ul>
//     {playlistData.items.map((item: any) => (

//       <li key={item.id}>
//         <a href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}>
//         <p>{item.snippet.title}</p>
//         <img src={item.snippet.thumbnails.default.url} alt="" />
//         </a>
//                 <iframe 
//       width="560" 
//       height="315" 
//       src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
//       title="YouTube video player" 
      
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//       allowFullScreen

// >
// </iframe>
        
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p>No data available</p>
// )}