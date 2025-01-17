import { LaptopMinimal, Minimize, Minimize2 } from 'lucide-react';
import { useState } from 'react';

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  const toggleTheatreMode = () => {
    setIsTheatreMode(!isTheatreMode);
    setIsMiniPlayer(false); // Disable mini player when switching to theatre mode
  };

  const toggleMiniPlayer = () => {
    setIsMiniPlayer(!isMiniPlayer);
    setIsTheatreMode(false); // Disable theatre mode when switching to mini player
  };

  return (
    <div className="relative">
      <div
        className={`flex justify-center w-full transition-all duration-300 ${isTheatreMode ? 'w-full' : isMiniPlayer ? 'w-52 h-52' : 'w-full'}`}
        style={{
          position: isMiniPlayer ? 'fixed' : 'relative',
          bottom: isMiniPlayer ? '50px' : 'auto',
          right: isMiniPlayer ? '50px' : 'auto',
        }}
      >
        <iframe
          className={`border-slate-950 rounded-lg ${isTheatreMode ? 'w-full h-screen' : ''}`}
          width={isMiniPlayer ? "180" : "560"}
          height={isMiniPlayer ? "100" : "315"}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Buttons for switching modes */}
      <div className="absolute top-0 right-0 p-2">
        <button
          className=" text-blue-500 p-2 m-2 rounded"
          onClick={toggleTheatreMode}
        >
          {isTheatreMode ? <Minimize/> : <LaptopMinimal/>}
        </button>
        <button
          className=" text-blue-500 p-2 m-2 rounded"
          onClick={toggleMiniPlayer}
        >
          {isMiniPlayer ? <Minimize/> : <Minimize2/>}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
