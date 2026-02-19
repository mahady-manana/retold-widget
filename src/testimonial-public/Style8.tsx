"use client";
import { Award, Star } from "lucide-react";
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
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
        />
      ))}
    </div>
  );
}

export default function PremiumTestimonial({
  testimonial,
  contentLines,
}: TestimonialItemType) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;

  return (
    <div className="h-full flex flex-col justify-between relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 border border-yellow-500/30">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full"></div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mb-4 text-yellow-500">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Verified Review
            </span>
          </div>
          <div className="flex justify-end mb-4 relative">
            <div className="px-3 py-1.5 bg-slate-800/80 rounded-full border border-yellow-500/30">
              <StarRating rating={testimonial.rating || 5} />
            </div>
          </div>
        </div>
        {hasTextContent && (
          <TruncatedContent
            content={testimonial.content}
            maxLines={contentLines}
            className="text-gray-200 mb-5 italic border-l-4 border-yellow-500 pl-4 bg-slate-800/50 py-2 pr-3 rounded-r-lg"
          />
        )}
        {(hasVideo || hasAudio) && (
          <>
            {hasVideo && (
              <VideoPlayer
                url={testimonial.metadata?.videoUrl || ""}
                playButtonColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                playButtonIconColor="text-white"
                controlsColor="text-white"
              />
            )}
            {hasAudio && (
              <AudioPlayer
                url={testimonial.metadata?.audioUrl || ""}
                duration={testimonial.metadata?.audioDurationSeconds}
                playButtonColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                playButtonIconColor="text-white"
                controlsColor="text-white"
                backgroundColor="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-neutral-600"
              />
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700">
        <Avatar className="w-11 h-11 ring-2 ring-yellow-500/50">
          {testimonial.authorProfilePhoto ? (
            <AvatarImage
              src={testimonial.authorProfilePhoto}
              alt={testimonial.authorName}
            />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-500 text-slate-900 font-bold text-sm">
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
  );
}
