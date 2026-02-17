"use client";

import { useState } from "react";
import { Play, Mic, Video, Star, X } from "lucide-react";
import { PublicTestimonial } from "./PublicTestimonialItem";

function Avatar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>;
}
function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />;
}
function AvatarFallback({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex h-full w-full items-center justify-center rounded-full ${className}`}>{children}</div>;
}
function StarRating({ rating = 5 }: { rating?: number }) {
  return (<div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />))}</div>);
}
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}><div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}><button onClick={onClose} className="absolute -top-10 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>{children}</div></div>);
}
function formatDuration(seconds?: number | null) {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function GlassTestimonial({ testimonial }: { testimonial: PublicTestimonial }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent = testimonial.content && testimonial.content.trim().length > 0;

  return (<>
    <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"></div>
      <div className="relative">
        <div className="flex justify-end mb-4"><div className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-white/40"><StarRating rating={testimonial.rating || 5} /></div></div>
        {hasTextContent && (<p className="text-sm text-gray-700 mb-5 line-clamp-4 italic leading-relaxed"><span className="text-3xl text-purple-400 mr-2">"</span>{testimonial.content}<span className="text-3xl text-purple-400 ml-1">"</span></p>)}
        {(hasVideo || hasAudio) && (<div className="flex gap-3 mb-5">
          {hasVideo && (<button onClick={() => setIsVideoModalOpen(true)} className="group w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all relative border border-white/50 shadow-lg" type="button"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform absolute inset-0 m-auto shadow-md"><Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" /></div><div className="absolute bottom-1 right-1 bg-gray-900/80 text-white px-1.5 py-0.5 rounded-lg text-xs flex items-center gap-0.5 backdrop-blur-sm"><Video className="w-2.5 h-2.5" />{formatDuration(testimonial.metadata?.videoDurationSeconds)}</div></button>)}
          {hasAudio && (<button onClick={() => setIsAudioModalOpen(true)} className="group w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all relative border border-white/50 shadow-lg" type="button"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform absolute inset-0 m-auto shadow-md"><Mic className="w-4 h-4 text-white" /></div><div className="absolute bottom-1 right-1 bg-gray-900/80 text-white px-1.5 py-0.5 rounded-lg text-xs flex items-center gap-0.5 backdrop-blur-sm"><Mic className="w-2.5 h-2.5" />{formatDuration(testimonial.metadata?.audioDurationSeconds)}</div></button>)}
        </div>)}
        <div className="flex items-center gap-3 pt-4 border-t border-white/30">
          <Avatar className="w-11 h-11 ring-2 ring-white/60 shadow-md">{testimonial.authorProfilePhoto ? (<AvatarImage src={testimonial.authorProfilePhoto} alt={testimonial.authorName} />) : (<AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-400 text-white font-bold text-sm">{testimonial.authorName.split(" ").map((n) => n[0]).join("")}</AvatarFallback>)}</Avatar>
          <div><p className="font-semibold text-gray-800 text-sm">{testimonial.authorName}</p><p className="text-xs text-gray-500">{testimonial.authorTitle}{testimonial.authorCompany && ` at ${testimonial.authorCompany}`}</p></div>
        </div>
      </div>
    </div>
    <Modal open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}><div className="bg-black rounded-lg overflow-hidden"><video controls autoPlay src={testimonial.metadata?.videoUrl} className="w-full max-h-[80vh]" /></div></Modal>
    <Modal open={isAudioModalOpen} onClose={() => setIsAudioModalOpen(false)}><div className="bg-white rounded-lg p-6 max-w-md mx-auto"><h3 className="text-center text-lg font-medium mb-4 text-gray-900">Audio Testimonial</h3><div className="flex flex-col items-center gap-4"><div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center"><Mic className="w-10 h-10 text-blue-600" /></div><audio controls autoPlay src={testimonial.metadata?.audioUrl} className="w-full" /></div></div></Modal>
  </>);
}
