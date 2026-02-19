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
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function GlassTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <>
      <div className="h-full relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/50 p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 border-t border-white/30">
              <Avatar className="w-11 h-11 ring-2 ring-white/60 shadow-md">
                {testimonial.authorProfilePhoto ? (
                  <AvatarImage
                    src={testimonial.authorProfilePhoto}
                    alt={testimonial.authorName}
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-400 text-white font-bold text-sm">
                    {testimonial.authorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {testimonial.authorName}
                </p>
                <p className="text-xs text-gray-500">
                  {testimonial.authorTitle}
                  {testimonial.authorCompany &&
                    ` at ${testimonial.authorCompany}`}
                </p>
              </div>
            </div>
            <div>
              <div className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-white/40">
                <StarRating rating={testimonial.rating || 5} />
              </div>
            </div>
          </div>

          {hasTextContent && (
            <TruncatedContent
              content={
                <>
                  <span className="text-3xl text-purple-400 mr-2">"</span>
                  {testimonial.content}
                  <span className="text-3xl text-purple-400 ml-1">"</span>
                </>
              }
              maxLines={contentLines}
              className=" text-gray-700 mb-5  italic leading-relaxed"
            />
          )}

          {(hasVideo || hasAudio) && (
            <>
              {hasVideo && (
                <VideoPlayer
                  url={testimonial.metadata?.videoUrl || ""}
                  playButtonColor="bg-gradient-to-br from-blue-400 via-purple-400"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                />
              )}
              {hasAudio && (
                <AudioPlayer
                  url={testimonial.metadata?.audioUrl || ""}
                  duration={testimonial.metadata?.audioDurationSeconds}
                  playButtonColor="bg-gradient-to-br from-blue-400"
                  playButtonIconColor="text-white"
                  controlsColor="text-white"
                  backgroundColor="bg-gradient-to-br from-blue-400/10 via-purple-400"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
