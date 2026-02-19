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
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function ModernTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <>
      <div className="h-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px]">
        <div className="h-full relative bg-white/95 backdrop-blur-sm rounded-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11 ring-2 ring-indigo-300 shadow-md">
                {testimonial.authorProfilePhoto ? (
                  <AvatarImage
                    src={testimonial.authorProfilePhoto}
                    alt={testimonial.authorName}
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white font-bold text-sm shadow-md">
                    {testimonial.authorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonial.authorName}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonial.authorTitle}
                  {testimonial.authorCompany &&
                    ` at ${testimonial.authorCompany}`}
                </p>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full shadow-sm">
              <StarRating rating={testimonial.rating || 5} />
            </div>
          </div>

          {hasTextContent && (
            <TruncatedContent
              content={testimonial.content}
              maxLines={contentLines}
              className=" text-gray-700 mb-5  italic border-l-4 border-indigo-400 pl-4 bg-gradient-to-r from-indigo-50/50 to-transparent py-2 pr-3 rounded-r-lg"
            />
          )}
          {(hasVideo || hasAudio) && (
            <>
              {hasVideo && (
                <VideoPlayer
                  url={testimonial.metadata?.videoUrl || ""}
                  playButtonColor="from-indigo-500 via-purple-500 to-pink-500"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                />
              )}
              {hasAudio && (
                <AudioPlayer
                  url={testimonial.metadata?.audioUrl || ""}
                  duration={testimonial.metadata?.audioDurationSeconds}
                  playButtonColor="from-pink-500 to-rose-500"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                  backgroundColor="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
