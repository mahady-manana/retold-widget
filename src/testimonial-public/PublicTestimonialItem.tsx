"use client";

import { Mic, Play, Star, Video, X } from "lucide-react";
import { useState } from "react";
import Style1 from "./Style1";
import Style10 from "./Style10";
import Style11 from "./Style11";
import Style12 from "./Style12";
import Style13 from "./Style13";
import Style14 from "./Style14";
import Style15 from "./Style15";
import Style2 from "./Style2";
import Style3 from "./Style3";
import Style4 from "./Style4";
import Style5 from "./Style5";
import Style6 from "./Style6";
import Style7 from "./Style7";
import Style8 from "./Style8";
import Style9 from "./Style9";

// ============================================================================
// INLINE MINIMAL UI COMPONENTS (No external dependencies - fully portable)
// ============================================================================

function Avatar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full ${className}`}
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
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}
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
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

// Modal Component (fully self-contained)
function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// TESTIMONIAL INTERFACE (Self-contained, no external types)
// ============================================================================

export interface PublicTestimonial {
  _id: string;
  authorName: string;
  authorTitle: string;
  authorEmail?: string;
  authorCompany?: string;
  authorProfilePhoto?: string;
  content: string;
  rating?: number;
  metadata?: {
    audioUrl?: string;
    audioKey?: string;
    audioDurationSeconds?: number;
    videoUrl?: string;
    videoKey?: string;
    videoDurationSeconds?: number;
  };
  createdAt: Date | string;
}

interface PublicTestimonialItemProps {
  testimonial: PublicTestimonial;
  variant?:
    | "default"
    | "style-1"
    | "style-2"
    | "style-3"
    | "style-4"
    | "style-5"
    | "style-6"
    | "style-7"
    | "style-8"
    | "style-9"
    | "style-10"
    | "style-11"
    | "style-12"
    | "style-13"
    | "style-14"
    | "style-15"
    | string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatDuration(seconds?: number | null) {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ============================================================================
// DEFAULT STYLE (Original)
// ============================================================================

function DefaultTestimonial({
  testimonial,
  isVideoModalOpen,
  setIsVideoModalOpen,
  isAudioModalOpen,
  setIsAudioModalOpen,
}: {
  testimonial: PublicTestimonial;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  isAudioModalOpen: boolean;
  setIsAudioModalOpen: (open: boolean) => void;
}) {
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent =
    testimonial.content && testimonial.content.trim().length > 0;
  const createdAt = new Date(testimonial.createdAt);

  return (
    <>
      <div className="flex gap-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors">
        <Avatar className="w-12 h-12 flex-shrink-0">
          {testimonial.authorProfilePhoto ? (
            <AvatarImage
              src={testimonial.authorProfilePhoto}
              alt={testimonial.authorName}
            />
          ) : (
            <AvatarFallback className="text-gray-600 font-medium">
              {testimonial.authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <p className="font-medium text-gray-900">
                {testimonial.authorName}
              </p>
              <p className="text-sm text-gray-600">
                {testimonial.authorTitle}
                {testimonial.authorCompany
                  ? ` • ${testimonial.authorCompany}`
                  : ""}
              </p>
            </div>
          </div>

          <div className="mb-2">
            <StarRating rating={testimonial.rating || 5} />
          </div>

          {/* Media Testimonials (Video/Audio) */}
          {(hasVideo || hasAudio) && (
            <div className="flex gap-3 mb-2 flex-wrap">
              {/* Video Testimonial - Thumbnail */}
              {hasVideo && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center relative"
                  type="button"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play
                      className="w-6 h-6 text-blue-600 ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
                    <Video className="w-2.5 h-2.5" />
                    {formatDuration(testimonial.metadata?.videoDurationSeconds)}
                  </div>
                </button>
              )}

              {/* Audio Testimonial */}
              {hasAudio && (
                <button
                  onClick={() => setIsAudioModalOpen(true)}
                  className="group w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center relative"
                  type="button"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mic className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs flex items-center gap-1">
                    <Mic className="w-2.5 h-2.5" />
                    {formatDuration(testimonial.metadata?.audioDurationSeconds)}
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Text Testimonial */}
          {hasTextContent && (
            <p className="text-sm text-gray-700 mb-2">
              "{testimonial.content}"
            </p>
          )}

          <p className="text-xs text-gray-500">
            {createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Video Modal */}
      <Modal open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}>
        <div className="bg-black rounded-lg overflow-hidden">
          <video
            controls
            autoPlay
            src={testimonial.metadata?.videoUrl}
            className="w-full max-h-[80vh]"
          />
        </div>
      </Modal>

      {/* Audio Modal */}
      <Modal open={isAudioModalOpen} onClose={() => setIsAudioModalOpen(false)}>
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-center text-lg font-medium mb-4 text-gray-900">
            Audio Testimonial
          </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <Mic className="w-10 h-10 text-blue-600" />
            </div>
            <audio
              controls
              autoPlay
              src={testimonial.metadata?.audioUrl}
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

// ============================================================================
// MAIN COMPONENT (Supports 4 variants)
// ============================================================================

export default function PublicTestimonialItem({
  testimonial,
  variant = "default",
}: PublicTestimonialItemProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  switch (variant) {
    case "style-1":
      return <Style1 testimonial={testimonial} />;
    case "style-2":
      return <Style2 testimonial={testimonial} />;
    case "style-3":
      return <Style3 testimonial={testimonial} />;
    case "style-4":
      return <Style4 testimonial={testimonial} />;
    case "style-5":
      return <Style5 testimonial={testimonial} />;
    case "style-6":
      return <Style6 testimonial={testimonial} />;
    case "style-7":
      return <Style7 testimonial={testimonial} />;
    case "style-8":
      return <Style8 testimonial={testimonial} />;
    case "style-9":
      return <Style9 testimonial={testimonial} />;
    case "style-10":
      return <Style10 testimonial={testimonial} />;
    case "style-11":
      return <Style11 testimonial={testimonial} />;
    case "style-12":
      return <Style12 testimonial={testimonial} />;
    case "style-13":
      return <Style13 testimonial={testimonial} />;
    case "style-14":
      return <Style14 testimonial={testimonial} />;
    case "style-15":
      return <Style15 testimonial={testimonial} />;
    default:
      return (
        <DefaultTestimonial
          testimonial={testimonial}
          isVideoModalOpen={isVideoModalOpen}
          setIsVideoModalOpen={setIsVideoModalOpen}
          isAudioModalOpen={isAudioModalOpen}
          setIsAudioModalOpen={setIsAudioModalOpen}
        />
      );
  }
}
