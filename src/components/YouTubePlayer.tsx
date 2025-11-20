// src/components/YouTubePlayer.tsx
import React from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const opts = {
    height: window.innerWidth < 720 ? window.innerWidth * 0.5 : 420,
    width:
      window.innerWidth < 720 ? window.innerWidth - 48 : window.innerWidth / 2,
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
    },
  };

  const onReady = (event: { target: any }) => {
    console.log("Player is ready:", event.target);
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default YouTubePlayer;
