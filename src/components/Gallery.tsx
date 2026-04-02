"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section id="galeri" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Galeri
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Çalışmalarımız
          </h2>
        </AnimatedSection>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <button
                onClick={() => openLightbox(i)}
                className="group relative w-full mb-3 sm:mb-4 block overflow-hidden rounded-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={i % 3 === 0 ? 500 : i % 3 === 1 ? 400 : 350}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#2A2118]/0 group-hover:bg-[#2A2118]/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="font-body text-xs tracking-[0.15em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                    Detay Gör
                  </span>
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
            className="fixed inset-0 z-50 bg-[#2A2118]/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Kapat"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft size={28} />
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
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                sizes="90vw"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
