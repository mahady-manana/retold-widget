"use client";

import { MessageSquare, Star } from "lucide-react";
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
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function MinimalTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <>
      <div className="h-full flex flex-col justify-between bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Testimonial
            </span>
          </div>
          <StarRating rating={testimonial.rating || 5} />
        </div>
        {hasTextContent && (
          <TruncatedContent
            content={testimonial.content}
            maxLines={contentLines}
            className="text-gray-700 mb-6 leading-relaxed"
          />
        )}
        {(hasVideo || hasAudio) && (
          <>
            {hasVideo && (
              <VideoPlayer
                url={testimonial.metadata?.videoUrl || ""}
                playButtonColor="bg-gradient-to-br from-black via-neutral-800"
                playButtonIconColor="text-white"
                controlsColor="text-white"
              />
            )}
            {hasAudio && (
              <AudioPlayer
                url={testimonial.metadata?.audioUrl || ""}
                duration={testimonial.metadata?.audioDurationSeconds}
                playButtonColor="bg-gradient-to-br from-black/40 via-neutral-800"
                playButtonIconColor="text-white"
                controlsColor="text-white"
                backgroundColor="bg-gradient-to-br from-black/30 via-neutral-800/20"
              />
            )}
          </>
        )}
        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
          <Avatar className="w-10 h-10">
            {testimonial.authorProfilePhoto ? (
              <AvatarImage
                src={testimonial.authorProfilePhoto}
                alt={testimonial.authorName}
              />
            ) : (
              <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold text-sm">
                {testimonial.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium text-gray-900 text-sm">
              {testimonial.authorName}
            </p>
            <p className="text-xs text-gray-500">
              {testimonial.authorTitle}
              {testimonial.authorCompany && ` • ${testimonial.authorCompany}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
