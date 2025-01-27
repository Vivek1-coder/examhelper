import dbConnect from '@/lib/dbConnect';
import PlaylistModel from '@/model/Playlist.model';
import VideoModel from '@/model/Video.model';
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from 'mongoose';


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

type YouTubePlaylistItem = {
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
    videoOwnerChannelTitle: string;
  };
};

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    const subjectId = searchParams.get("subjectId");
    const { name } = await req.json();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authentication"
        },
        { status: 401 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

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
      userId
    });

    await newPlaylist.save();

    try {
      const videos = items.map((item: YouTubePlaylistItem) => ({
        thumbnail: item?.snippet?.thumbnails?.default?.url || '',
        title: item?.snippet?.title || 'Untitled',
        videoId: item?.snippet?.resourceId?.videoId || '',
        playlistId: newPlaylist._id,
        subjectId,
        userId,
        author: item?.snippet?.videoOwnerChannelTitle || 'Unknown',
      }));

      // Filter out invalid videos (e.g., missing videoId or title)
      const validVideos = videos.filter((video: { videoId: string; title: string }) => video.videoId && video.title);

      if (validVideos.length === 0) {
        throw new Error('No valid videos to insert');
      }

      await VideoModel.insertMany(validVideos, { ordered: false });

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
