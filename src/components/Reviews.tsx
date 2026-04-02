"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { reviews } from "@/lib/data";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const cardColors = [
  "from-rose-light/40 to-lavender-light/20",
  "from-lavender-light/40 to-accent-light/20",
  "from-gold-light/40 to-rose-light/20",
  "from-accent-light/40 to-gold-light/20",
  "from-rose-light/30 to-gold-light/30",
  "from-lavender-light/30 to-rose-light/30",
];

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5;
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
    <section id="yorumlar" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-light/20 via-background to-rose-light/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose" />
            <Quote size={16} className="text-rose" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Musteri Yorumlari
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Ne <span className="gradient-text">Diyorlar</span>?
          </h2>
        </AnimatedSection>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4"
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className={`shrink-0 w-80 sm:w-96 p-6 rounded-2xl bg-gradient-to-br ${cardColors[i % cardColors.length]} border border-border/30 backdrop-blur-sm hover:shadow-[0_10px_40px_rgba(212,168,176,0.1)] transition-all duration-300`}
            >
              {/* Quote icon */}
              <Quote size={24} className="text-primary/20 mb-4" />

              <p className="font-body text-sm text-text-light leading-relaxed mb-6">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="font-heading italic text-xs text-white">
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
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={
                        j < review.rating
                          ? "text-gold fill-gold"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
