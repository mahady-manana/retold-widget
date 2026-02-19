"use client";

import { type JSX, useEffect, useRef } from "react";
import type { ITestimonial } from "./PublicTestimonialItem";
import { type TestimonialItemType } from "./styled-type";

interface TestimonialScrollerProps {
  direction?: "left" | "right";
  DarkTestimonial({
    testimonial,
    contentLines,
  }: TestimonialItemType): JSX.Element;
  testimonials: ITestimonial[];
  contentLines?: number;
  autoScroll?: boolean;
  scrollSpeed?: number;
}

const TestimonialScroller = ({
  direction = "left",
  DarkTestimonial,
  testimonials,
  autoScroll = true,
  contentLines,
  scrollSpeed = 10,
}: TestimonialScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !autoScroll) return;

    let animationId: number;
    let isPaused = false;
    let isInView = true;
    let lastTime = 2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" },
    );

    const container = el.closest("section");
    if (container) {
      observer.observe(container);
    }

    const step = () => {
      const isOkay = lastTime >= 4;
      if (isOkay) {
        lastTime = 0;
      } else {
        lastTime += 1;
      }

      if (!isPaused && isInView && isOkay) {
        const speed = direction === "left" ? 0.5 : -0.5;
        el.scrollLeft += speed;
        // el.style.transition = "10s";
        const scrollWidth = el.scrollWidth / 2;

        if (direction === "left" && el.scrollLeft >= scrollWidth) {
          el.scrollLeft = 0;
        } else if (direction === "right" && el.scrollLeft <= 0) {
          el.scrollLeft = scrollWidth;
        }
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    const pause = () => (isPaused = true);
    const resume = () => (isPaused = false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      observer.disconnect();
    };
  }, [direction, autoScroll, scrollSpeed]);

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-2 overflow-hidden">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-hidden px-4"
          style={{ scrollBehavior: "auto" }}
        >
          {duplicatedTestimonials.map((t, i) => (
            <div key={`${t._id}-${i}`} className="w-1/3 flex-shrink-0">
              <DarkTestimonial testimonial={t} contentLines={contentLines} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialScroller;
