"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const videos = [
  { src: "/videos/video2.mp4", label: "Tirnak Bakimi" },
  { src: "/videos/video3.mp4", label: "Nail Art" },
  { src: "/videos/video4.mp4", label: "Studyomuz" },
];

export default function VideoShowcase() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cream to-rose-light/20" />

      {/* Decorative */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Calismalarimiz
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Studyomuzdan <span className="gradient-text">Kareler</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <AnimatedSection key={video.src} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="video-container aspect-[9/16] sm:aspect-[9/14]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="glass rounded-xl px-4 py-2 border border-white/20">
                      <p className="font-body text-xs text-white/90 tracking-wide text-center">
                        {video.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
