"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/salon-interior.jpg"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D2B1F]/70 via-[#3D2B1F]/40 to-[#3D2B1F]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4A8B0]/10 via-transparent to-[#C8A4D4]/10" />

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-[#D4A8B0]/10 blur-3xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[15%] w-40 h-40 rounded-full bg-[#C8A4D4]/10 blur-3xl"
        animate={{ y: [0, 20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-[#D4A8B0] to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-xs sm:text-sm tracking-[0.4em] text-[#D4A8B0] uppercase mb-6"
        >
          Guzellik & Bakim Studyosu
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1]"
        >
          1 Dilek{" "}
          <span className="block sm:inline">Tirnak</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4B896] to-transparent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Profesyonel tirnak bakimi, makyaj ve cilt bakimi hizmetleri ile
          kendinizi ozel hissedin
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#randevu"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4A8B0] to-[#C8A4D4] text-white font-body text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,168,176,0.4)]"
          >
            <span className="relative z-10">Randevu Al</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#C8A4D4] to-[#D4A8B0] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#hizmetler"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white/80 font-body text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Hizmetlerimiz
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Kesfet
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/40" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDF8F5] to-transparent" />
    </section>
  );
}
