import React, { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  isPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [_, setIsPlaying] = useState(false);
  const [action, setAction] = useState<"play" | "pause">("play");

  useEffect(() => {
    if (isPlay) {
      handleButtonClick();
    }
  }, [isPlay]);

  const handleButtonClick = () => {
    if (!audioRef.current) return;

    if (action === "play") {
      audioRef.current.play();
      setIsPlaying(true);
      setAction("pause");
    } else if (action === "pause") {
      audioRef.current.pause();
      setIsPlaying(false);
      setAction("play");
    }
  };

  return (
    <div className="fixed right-4 bottom-0 -translate-y-1/2 z-50">
      <audio ref={audioRef} src={src} loop />

      <button
        onClick={handleButtonClick}
        className=" p-3 md:p-4 w-12 h-12 md:w-auto md:h-auto flex items-center justify-center bg-[#e7e3d8] border-amber-100 rounded-full shadow-lg hover:bg-amber-600 text-sm md:text-base transition-all duration-100 ease-in-out
             hover:opacity-90 active:opacity-80 active:scale-95"
      >
        {action === "play" ? (
          <span className="inline-block filter drop-shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        ) : (
          <span className="inline-block filter drop-shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
