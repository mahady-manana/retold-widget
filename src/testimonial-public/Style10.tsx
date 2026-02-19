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
          className={`w-3.5 h-3.5 ${i < rating ? "text-violet-400 fill-violet-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function SoftTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6 border border-violet-100 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-end mb-4">
          <div className="px-3 py-1.5 bg-white rounded-full shadow-sm border border-violet-100">
            <StarRating rating={testimonial.rating || 5} />
          </div>
        </div>
        {hasTextContent && (
          <TruncatedContent
            content={testimonial.content}
            maxLines={contentLines}
            className=" text-gray-700 mb-5  italic leading-relaxed"
          />
        )}
        {(hasVideo || hasAudio) && (
          <>
            {hasVideo && (
              <VideoPlayer
                url={testimonial.metadata?.videoUrl || ""}
                playButtonColor="bg-gradient-to-br from-violet-800 via-purple-500 to-fuchsia-500"
                playButtonIconColor="text-white"
                controlsColor="text-white"
              />
            )}
            {hasAudio && (
              <AudioPlayer
                url={testimonial.metadata?.audioUrl || ""}
                duration={testimonial.metadata?.audioDurationSeconds}
                playButtonColor="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50"
                playButtonIconColor="text-violet-800"
                controlsColor="text-white"
                backgroundColor="bg-gradient-to-br from-violet-800 via-purple-500 to-fuchsia-500"
              />
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-violet-100">
        <Avatar className="w-11 h-11 ring-2 ring-violet-200">
          {testimonial.authorProfilePhoto ? (
            <AvatarImage
              src={testimonial.authorProfilePhoto}
              alt={testimonial.authorName}
            />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-violet-300 to-purple-300 text-white font-bold text-sm">
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
            {testimonial.authorCompany && ` at ${testimonial.authorCompany}`}
          </p>
        </div>
      </div>
    </div>
  );
}
