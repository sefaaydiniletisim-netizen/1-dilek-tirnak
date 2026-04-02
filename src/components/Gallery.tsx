"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(i: number) {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  function prev() {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1
    );
  }

  function next() {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1
    );
  }

  return (
    <section id="galeri" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-light/10 via-background to-lavender-light/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Galeri
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Calismalarimiz
          </h2>
        </AnimatedSection>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 gap-4 sm:gap-5">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <button
                onClick={() => openLightbox(i)}
                className="group relative w-full mb-4 sm:mb-5 block overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={i % 3 === 0 ? 500 : i % 3 === 1 ? 400 : 350}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-90"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/30">
                    <ZoomIn size={18} className="text-white" />
                  </div>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3D2B1F]/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
              aria-label="Kapat"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
              aria-label="Onceki"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src.includes("unsplash.com")
                  ? galleryImages[lightboxIndex].src.replace("w=800", "w=1400")
                  : galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={1400}
                height={900}
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                sizes="90vw"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
              aria-label="Sonraki"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass border border-white/10">
              <span className="font-body text-xs text-white/70">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
