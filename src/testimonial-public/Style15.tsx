"use client";
import { useState } from "react";
import { Play, Mic, Video, Star, X, Heart } from "lucide-react";
import { PublicTestimonial } from "./PublicTestimonialItem";

function Avatar({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>; }
function AvatarImage({ src, alt }: { src: string; alt: string }) { return <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />; }
function AvatarFallback({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`flex h-full w-full items-center justify-center rounded-full ${className}`}>{children}</div>; }
function StarRating({ rating = 5 }: { rating?: number }) { return (<div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-pink-500 fill-pink-500" : "text-gray-300"}`} />))}</div>); }
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) { if (!open) return null; return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}><div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}><button onClick={onClose} className="absolute -top-10 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>{children}</div></div>); }
function formatDuration(seconds?: number | null) { if (!seconds) return null; const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, "0")}`; }

export default function LoveTestimonial({ testimonial }: { testimonial: PublicTestimonial }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const hasAudio = !!testimonial.metadata?.audioUrl;
  const hasVideo = !!testimonial.metadata?.videoUrl;
  const hasTextContent = testimonial.content && testimonial.content.trim().length > 0;

  return (<>
    <div className="relative rounded-[2rem] bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-6 border-4 border-pink-300 shadow-xl overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-300/30 to-transparent rounded-full blur-2xl"></div>
      <div className="flex items-center gap-2 mb-4 text-pink-500 justify-center"><Heart className="w-5 h-5 fill-pink-500" /><span className="text-xs font-bold uppercase tracking-wider">Made with Love</span></div>
      <div className="flex justify-end mb-4 relative"><div className="px-3 py-1.5 bg-white rounded-full shadow-md border border-pink-200"><StarRating rating={testimonial.rating || 5} /></div></div>
      {hasTextContent && (<p className="text-sm text-gray-800 mb-5 line-clamp-4 italic text-center">"{testimonial.content}"</p>)}
      {(hasVideo || hasAudio) && (<div className="flex gap-3 mb-5 justify-center">
        {hasVideo && (<button onClick={() => setIsVideoModalOpen(true)} className="group w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-rose-500 hover:shadow-xl hover:scale-110 transition-all relative ring-4 ring-pink-200" type="button"><div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform absolute inset-0 m-auto"><Play className="w-5 h-5 text-pink-600 ml-0.5" fill="currentColor" /></div><div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded-full text-xs flex items-center gap-0.5"><Video className="w-3 h-3" />{formatDuration(testimonial.metadata?.videoDurationSeconds)}</div></button>)}
        {hasAudio && (<button onClick={() => setIsAudioModalOpen(true)} className="group w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-rose-500 to-red-500 hover:shadow-xl hover:scale-110 transition-all relative ring-4 ring-rose-200" type="button"><div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform absolute inset-0 m-auto"><Mic className="w-5 h-5 text-rose-600" /></div><div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded-full text-xs flex items-center gap-0.5"><Mic className="w-3 h-3" />{formatDuration(testimonial.metadata?.audioDurationSeconds)}</div></button>)}
      </div>)}
      <div className="flex items-center justify-center gap-3 pt-4 border-t-2 border-pink-200">
        <Avatar className="w-11 h-11 ring-4 ring-pink-300 shadow-md">{testimonial.authorProfilePhoto ? (<AvatarImage src={testimonial.authorProfilePhoto} alt={testimonial.authorName} />) : (<AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white font-bold text-sm shadow-md">{testimonial.authorName.split(" ").map((n) => n[0]).join("")}</AvatarFallback>)}</Avatar>
        <div><p className="font-bold text-gray-900 text-sm">{testimonial.authorName}</p><p className="text-xs text-gray-600">{testimonial.authorTitle}{testimonial.authorCompany && ` at ${testimonial.authorCompany}`}</p></div>
      </div>
    </div>
    <Modal open={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}><div className="bg-black rounded-lg overflow-hidden"><video controls autoPlay src={testimonial.metadata?.videoUrl} className="w-full max-h-[80vh]" /></div></Modal>
    <Modal open={isAudioModalOpen} onClose={() => setIsAudioModalOpen(false)}><div className="bg-white rounded-lg p-6 max-w-md mx-auto"><h3 className="text-center text-lg font-medium mb-4 text-gray-900">Audio Testimonial</h3><div className="flex flex-col items-center gap-4"><div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center"><Mic className="w-10 h-10 text-blue-600" /></div><audio controls autoPlay src={testimonial.metadata?.audioUrl} className="w-full" /></div></div></Modal>
  </>);
}
