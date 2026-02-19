"use client";
import { Heart, Star } from "lucide-react";
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
          className={`w-3.5 h-3.5 ${i < rating ? "text-pink-500 fill-pink-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function LoveTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <div className="relative rounded-[2rem] bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-6 border-4 border-pink-300 shadow-xl overflow-hidden h-full flex flex-col justify-between">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-transparent rounded-full blur-2xl"></div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-4 text-pink-500 justify-center">
            <Heart className="w-5 h-5 fill-pink-500" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Made with Love
            </span>
          </div>
          <div className="flex justify-end mb-4 relative">
            <div className="px-3 py-1.5 bg-white rounded-full shadow-md border border-pink-200">
              <StarRating rating={testimonial.rating || 5} />
            </div>
          </div>
        </div>
        {hasTextContent && (
          <TruncatedContent
            content={testimonial.content}
            maxLines={contentLines}
            className=" text-gray-800 mb-5 italic text-center"
          />
        )}
        {(hasVideo || hasAudio) && (
          <>
            {hasVideo && (
              <VideoPlayer
                url={testimonial.metadata?.videoUrl || ""}
                playButtonColor="bg-gradient-to-br from-pink-700 to-rose-500"
                playButtonIconColor="text-white"
                controlsColor="text-white"
              />
            )}
            {hasAudio && (
              <AudioPlayer
                url={testimonial.metadata?.audioUrl || ""}
                duration={testimonial.metadata?.audioDurationSeconds}
                playButtonColor="bg-gradient-to-br from-pink-700 to-rose-500"
                playButtonIconColor="text-white"
                controlsColor="text-white"
                backgroundColor="bg-gradient-to-br from-pink-300 to-rose-400"
              />
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 pt-4 mt-4 border-t-2 border-pink-200">
        <Avatar className="w-11 h-11 ring-4 ring-pink-300 shadow-md">
          {testimonial.authorProfilePhoto ? (
            <AvatarImage
              src={testimonial.authorProfilePhoto}
              alt={testimonial.authorName}
            />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white font-bold text-sm shadow-md">
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
