/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { lazy, Suspense, useMemo } from "react";
import type { TestimonialItemType } from "./styled-type";

// ============================================================================
// INLINE MINIMAL UI COMPONENTS (No external dependencies - fully portable)
// ============================================================================

export interface ITestimonial {
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
  testimonial: ITestimonial;
  contentLines?: number;
  variant?:
    | "default"
    | "style-1"
    | "style-2"
    | "style-2s"
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

const styleMap: Record<string, string> = {
  default: "Style1",
  "style-1": "Style1",
  "style-2": "Style2",
  "style-2s": "Style2s",
  "style-3": "Style3",
  "style-4": "Style4",
  "style-5": "Style5",
  "style-6": "Style6",
  "style-7": "Style7",
  "style-8": "Style8",
  "style-9": "Style9",
  "style-10": "Style10",
  "style-11": "Style11",
  "style-12": "Style12",
  "style-13": "Style13",
  "style-14": "Style14",
  "style-15": "Style15",
};

const lazyCache: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<TestimonialItemType>>
> = {};

export default function PublicTestimonialItem({
  testimonial,
  variant = "style-1",
  contentLines,
}: PublicTestimonialItemProps) {
  // Map variant to component filename
  const filename = styleMap[variant]; // e.g. style-5 → Style-
  const LazyComponent = useMemo(() => {
    if (!lazyCache[variant]) {
      lazyCache[variant] = lazy(() => import(`./${filename}`));
    }
    return lazyCache[variant];
  }, [variant, filename]);
  return (
    <Suspense
      fallback={
        <div className="testimonial-card">
          <div className="skeleton-header">
            <div className="skeleton-author"></div>
            <div className="skeleton-meta"></div>
          </div>
          <div className="skeleton-content"></div>
          <div className="skeleton-rating"></div>
          <div className="skeleton-footer"></div>
        </div>
      }
    >
      <LazyComponent testimonial={testimonial} contentLines={contentLines} />
    </Suspense>
  );
}
