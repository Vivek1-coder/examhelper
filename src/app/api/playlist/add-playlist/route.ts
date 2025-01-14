import dbConnect from '@/lib/dbConnect';
import PlaylistModel from '@/model/Playlist.model';
import VideoModel from '@/model/Video.model';
import { NextApiRequest, NextApiResponse } from 'next';

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    const subjectId = searchParams.get("subjectId");
    const { name } = await req.json();

    if (!process.env.YOUTUBE_API) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing YouTube API key in environment variables" }),
        { status: 500 }
      );
    }
    if (!playlistId || !subjectId || !name) {
        console.error('Missing parameters', { playlistId, subjectId, name });
        return new Response(
          JSON.stringify({ success: false, message: "Missing required parameters" }),
          { status: 400 }
        );
      }
    

    const response = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${playlistId}&maxResults=50&key=${process.env.YOUTUBE_API}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch playlist data');
    }

    const data = await response.json();
    const items = data.items || [];
    const totalVideos = data.pageInfo?.totalResults || 0;

    if (items.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "No videos found in the playlist" }),
        { status: 404 }
      );
    }

    const newPlaylist = new PlaylistModel({
      name,
      thumbnail: items[0]?.snippet?.thumbnails?.default?.url || '',
      playlistId,
      totalVideos,
      subjectId,
    });

    await newPlaylist.save();

    try {
        const videos = items.map((item: any) => ({
            thumbnail: item?.snippet?.thumbnails?.default?.url || '',
            title: item?.snippet?.title || 'Untitled',
            videoId: item?.snippet?.resourceId?.videoId || '',
            playlistId,
            subjectId,
            author: item?.snippet?.videoOwnerChannelTitle || 'Unknown',
          }));
        
          // Filter out invalid videos (e.g., missing videoId or title)
          const validVideos = videos.filter((video: { videoId: string; title: string }) => video.videoId && video.title);
        
          if (validVideos.length === 0) {
            throw new Error('No valid videos to insert');
          }
        
          // Insert videos in bulk
          
        
          // Log the result of the bulk operation
         
        try {
            const result = await VideoModel.insertMany(validVideos, { ordered: false });
            console.log('Videos inserted successfully:', result.length);
        } catch (error) {
            console.error('Internal server error in adding bulk videos', error);
        return new Response(
        JSON.stringify({
            success: false,
            message: 'Internal server error in adding bulk videos',
      }),
      { status: 500 }
    );
        }
    } catch (error) {
        console.error('Internal server error in adding videos', error);
        return new Response(
        JSON.stringify({
            success: false,
            message: 'Internal server error in adding videos',
      }),
      { status: 500 }
    );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "New playlist added successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Internal server error', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
}







    // return new Response(
    //     JSON.stringify({
    //         success:true,
    //         message:"Playlist Added Successfully",
    //         data: await response.json()

    //     })
    // )
//   } catch (error) {
//     console.error("Error occurred while adding playlist:", error);
//     return new Response(
//         JSON.stringify({
//             success: false,
//             message: "Error occurred while adding playlist",
//         }),
//         { status: 500 }
//     );
// }
// }