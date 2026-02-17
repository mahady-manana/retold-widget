"use client";

import { useState } from "react";
import { Play, Mic, Video, Star, X, MessageSquare } from "lucide-react";
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

export default function MinimalTestimonial({ testimonial }: { testimonial: PublicTestimonial }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent = testimonial.content && testimonial.content.trim().length > 0;

  return (<>
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2 text-gray-400"><MessageSquare className="w-5 h-5" /><span className="text-xs font-medium uppercase tracking-wider">Testimonial</span></div><StarRating rating={testimonial.rating || 5} /></div>
      {hasTextContent && (<p className="text-base text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>)}
      {(hasVideo || hasAudio) && (<div className="flex gap-3 mb-6">
        {hasVideo && (<button onClick={() => setIsVideoModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group" type="button"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm"><Play className="w-3.5 h-3.5 text-gray-700 ml-0.5" fill="currentColor" /></div><span className="text-sm font-medium text-gray-700">{formatDuration(testimonial.metadata?.videoDurationSeconds)}</span></button>)}
        {hasAudio && (<button onClick={() => setIsAudioModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group" type="button"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm"><Mic className="w-3.5 h-3.5 text-gray-700" /></div><span className="text-sm font-medium text-gray-700">{formatDuration(testimonial.metadata?.audioDurationSeconds)}</span></button>)}
      </div>)}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <Avatar className="w-10 h-10">{testimonial.authorProfilePhoto ? (<AvatarImage src={testimonial.authorProfilePhoto} alt={testimonial.authorName} />) : (<AvatarFallback className="bg-gray-100 text-gray-600 font-semibold text-sm">{testimonial.authorName.split(" ").map((n) => n[0]).join("")}</AvatarFallback>)}</Avatar>
        <div><p className="font-medium text-gray-900 text-sm">{testimonial.authorName}</p><p className="text-xs text-gray-500">{testimonial.authorTitle}{testimonial.authorCompany && ` • ${testimonial.authorCompany}`}</p></div>
      </div>
    </div>
    <Modal open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}><div className="bg-black rounded-lg overflow-hidden"><video controls autoPlay src={testimonial.metadata?.videoUrl} className="w-full max-h-[80vh]" /></div></Modal>
    <Modal open={isAudioModalOpen} onClose={() => setIsAudioModalOpen(false)}><div className="bg-white rounded-lg p-6 max-w-md mx-auto"><h3 className="text-center text-lg font-medium mb-4 text-gray-900">Audio Testimonial</h3><div className="flex flex-col items-center gap-4"><div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center"><Mic className="w-10 h-10 text-blue-600" /></div><audio controls autoPlay src={testimonial.metadata?.audioUrl} className="w-full" /></div></div></Modal>
  </>);
}
