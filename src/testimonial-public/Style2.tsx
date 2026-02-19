"use client";

import { Star } from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import { TruncatedContent } from "./TruncatedContent";
import VideoPlayer from "./VideoPlayer";
import { type TestimonialItemType } from "./styled-type";

function Avatar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
}
function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      className="aspect-square h-full w-full object-cover"
      src={src}
      alt={alt}
    />
  );
}
function AvatarFallback({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full ${className}`}
    >
      {children}
    </div>
  );
}
function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
        />
      ))}
    </div>
  );
}

export default function DarkTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <>
      <div className="h-full flex flex-col justify-between relative rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 border border-gray-700">
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div>
          <div className="flex justify-end mb-4 relative">
            <div className="px-3 py-1.5 bg-gray-800/80 rounded-full border border-gray-600">
              <StarRating rating={testimonial.rating || 5} />
            </div>
          </div>
          {hasTextContent && (
            <TruncatedContent
              content={testimonial.content}
              maxLines={contentLines}
              className=" text-gray-300 mb-5 leading-7 italic border-l-4 border-cyan-500 pl-4 bg-gray-800/50 py-2 pr-3 rounded-r-lg"
            />
          )}
          {(hasVideo || hasAudio) && (
            <>
              {hasVideo && (
                <VideoPlayer
                  url={testimonial.metadata?.videoUrl || ""}
                  playButtonColor="from-black to-blue-900"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                />
              )}
              {hasAudio && (
                <AudioPlayer
                  url={testimonial.metadata?.audioUrl || ""}
                  duration={testimonial.metadata?.audioDurationSeconds}
                  playButtonColor="from-black to-blue-900"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                  backgroundColor="bg-gradient-to-br from-gray-800 border border-gray-600 via-gray-800 to-gray-900"
                />
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-700 relative">
          <Avatar className="w-11 h-11 ring-2 ring-cyan-500/50">
            {testimonial.authorProfilePhoto ? (
              <AvatarImage
                src={testimonial.authorProfilePhoto}
                alt={testimonial.authorName}
              />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold text-sm">
                {testimonial.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-semibold text-white text-sm">
              {testimonial.authorName}
            </p>
            <p className="text-xs text-gray-400">
              {testimonial.authorTitle}
              {testimonial.authorCompany && ` at ${testimonial.authorCompany}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
