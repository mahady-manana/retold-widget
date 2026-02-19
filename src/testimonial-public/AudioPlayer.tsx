"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

interface AudioPlayerProps {
  url: string;
  duration?: number;
  playButtonColor?: string; // e.g., "from-pink-500 to-rose-500"
  playButtonIconColor?: string; // e.g., "text-white"
  controlsColor?: string; // e.g., "text-gray-600"
  backgroundColor?: string; // e.g., "bg-white"
  className?: string;
}

export default function AudioPlayer({
  url,
  playButtonColor = "from-pink-500 to-rose-500",
  playButtonIconColor = "text-white",
  controlsColor = "text-gray-600",
  backgroundColor = "bg-white",
  className = "",
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  // Soundwave bar heights
  const barHeights = [
    12, 20, 14, 24, 18, 28, 16, 22, 14, 26, 12, 20, 16, 24, 14,
  ];

  return (
    <div
      className={`relative w-full overflow-hidden pt-5 rounded-2xl ${backgroundColor} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hidden ReactPlayer */}
      <ReactPlayer
        src={url}
        width={0}
        height={0}
        playing={playing}
        muted={muted}
      />

      {/* Content Container */}
      <div className="flex flex-col items-center p-4 pt-10 justify-center gap-3 h-full">
        {/* Soundwave Animation (shown always, animated only when playing) */}
        <div className="flex items-end justify-center gap-1 h-12 mb-2">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className={`w-1.5 rounded-full ${backgroundColor === "bg-white" ? "bg-white/80" : "bg-white/60"} ${playing ? "animate-soundwave" : ""}`}
              style={{
                height: playing ? "100%" : `${height * 0.5}px`,
                animationDelay: `${index * 0.1}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>

        {/* Big Center Play Button */}
        <button
          onClick={handlePlayPause}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${playButtonColor} flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
            playing ? "scale-90 opacity-80" : "scale-100 opacity-100"
          }`}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className={`w-8 h-8 ${playButtonIconColor} ml-0.5`} />
          ) : (
            <Play
              className={`w-8 h-8 ${playButtonIconColor} ml-1`}
              fill="currentColor"
            />
          )}
        </button>

        {/* Controls Bar */}
        <div
          className={`flex items-center gap-3 transition-opacity duration-300 ${
            hovered || !playing ? "opacity-100" : "opacity-80"
          }`}
        >
          {/* Volume Control */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-full absolute top-2 right-2 hover:bg-black/5 transition-colors ${controlsColor}`}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Add custom CSS for soundwave animation */}
      <style>{`
        @keyframes soundwave {
          0%,
          100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-soundwave {
          animation: soundwave 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
