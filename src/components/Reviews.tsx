"use client";

import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { reviews } from "@/lib/data";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5; // px per frame
    let animationId: number;

    function scroll() {
      if (!el || isPaused) {
        animationId = requestAnimationFrame(scroll);
        return;
      }
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(scroll);
    }

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section id="yorumlar" className="py-24 sm:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Müşteri Yorumları
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Ne Diyorlar?
          </h2>
        </AnimatedSection>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4"
        >
          {/* Double the reviews for infinite scroll effect */}
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="shrink-0 w-80 sm:w-96 p-6 border border-border rounded-xl bg-background"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent-light flex items-center justify-center">
                  <span className="font-heading italic text-xs text-primary-dark">
                    {getInitials(review.customer_name)}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm text-foreground font-medium">
                    {review.customer_name}
                  </p>
                  <p className="font-body text-xs text-text-light">
                    {review.service_name}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={
                      j < review.rating
                        ? "text-primary fill-primary"
                        : "text-border"
                    }
                  />
                ))}
              </div>

              <p className="font-body text-sm text-text-light leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
