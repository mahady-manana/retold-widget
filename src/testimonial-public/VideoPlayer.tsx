"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  width?: string;
  height?: string;
  playButtonColor?: string; // e.g., "from-indigo-500 via-purple-500 to-pink-500"
  playButtonIconColor?: string; // e.g., "text-white"
  controlsColor?: string; // e.g., "text-white"
  className?: string;
}

export default function VideoPlayer({
  url,
  width = "100%",
  height = "100%",
  playButtonColor = "from-indigo-500 via-purple-500 to-pink-500",
  playButtonIconColor = "text-white",
  controlsColor = "text-white",
  className = "",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div
      className={`relative rounded-2xl bg-black ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        src={url}
        width={width}
        height={height}
        playing={playing}
        muted={muted}
        controls={false} // We'll create custom controls
        className="h-full rounded-xl w-full"
      />

      {/* Big Center Play Button (shown when paused or hovered) */}
      {(!playing || hovered) && (
        <button
          onClick={handlePlayPause}
          className={`absolute inset-0 m-auto w-15 h-15 rounded-full bg-gradient-to-br ${playButtonColor} flex items-center justify-center transition-all duration-300 ${
            playing && !hovered ? "opacity-0 scale-75" : "opacity-100 scale-100"
          } hover:scale-110`}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className={`w-6 h-6 ${playButtonIconColor} ml-0.5`} />
          ) : (
            <Play
              className={`w-6 h-6 ${playButtonIconColor} ml-1`}
              fill="currentColor"
            />
          )}
        </button>
      )}

      {/* Bottom Controls Bar (shown on hover) */}
      <div
        className={`absolute bottom-0 rounded-b-xl left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Play/Pause Button */}

          {/* Volume Control */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-full hover:bg-white/20 transition-colors ${controlsColor}`}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Duration (optional, can be enhanced with actual duration) */}
          <span className={`text-xs ${controlsColor} opacity-80`}>
            {playing ? "Playing" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  );
}
