"use client";
import { Star } from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import { type TestimonialItemType } from "./styled-type";
import { TruncatedContent } from "./TruncatedContent";
import VideoPlayer from "./VideoPlayer";

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
          className={`w-3.5 h-3.5 ${i < rating ? "text-rose-400 fill-rose-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function RetroTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <div className="relative rounded-lg bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 p-6 border-4 border-rose-300 shadow-md h-full flex flex-col justify-between">
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-rose-400 rounded-full"></div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full"></div>
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-pink-400 rounded-full"></div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-400 rounded-full"></div>
      <div className="relative">
        <div>
          <div className="flex justify-end mb-4">
            <div className="px-3 py-1.5 bg-white rounded-full border-2 border-rose-300">
              <StarRating rating={testimonial.rating || 5} />
            </div>
          </div>
          {hasTextContent && (
            <TruncatedContent
              content={testimonial.content}
              maxLines={contentLines}
              className="text-gray-800 mb-5  font-medium"
            />
          )}
          {(hasVideo || hasAudio) && (
            <>
              {hasVideo && (
                <VideoPlayer
                  url={testimonial.metadata?.videoUrl || ""}
                  playButtonColor="bg-gradient-to-br from-rose-500 to-pink-500"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                />
              )}
              {hasAudio && (
                <AudioPlayer
                  url={testimonial.metadata?.audioUrl || ""}
                  duration={testimonial.metadata?.audioDurationSeconds}
                  playButtonColor="bg-gradient-to-br from-rose-500 to-pink-500"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                  backgroundColor="bg-gradient-to-br from-rose-300 to-pink-400"
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 pt-4 mt-4 border-t-2 border-rose-200">
        <Avatar className="w-11 h-11 ring-2 ring-rose-400 border-2 border-white">
          {testimonial.authorProfilePhoto ? (
            <AvatarImage
              src={testimonial.authorProfilePhoto}
              alt={testimonial.authorName}
            />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-rose-400 to-pink-400 text-white font-bold text-sm">
              {testimonial.authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="font-bold text-gray-900 text-sm">
            {testimonial.authorName}
          </p>
          <p className="text-xs text-gray-600">
            {testimonial.authorTitle}
            {testimonial.authorCompany && ` at ${testimonial.authorCompany}`}
          </p>
        </div>
      </div>
    </div>
  );
}
