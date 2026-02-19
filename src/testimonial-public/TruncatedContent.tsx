"use client";

import { type ReactNode, useRef } from "react";

interface TruncatedContentProps {
  content: ReactNode;
  maxLines?: number;
  className?: string;
}

export function TruncatedContent({
  content,
  className = "",
}: TruncatedContentProps) {
  const contentRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="relative">
      <p
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out leading-7 ${className}`}
      >
        {content}
      </p>
    </div>
  );
}
