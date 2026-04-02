"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80"
        alt="Profesyonel tırnak bakımı"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2118]/60 via-[#2A2118]/40 to-[#2A2118]/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-xs sm:text-sm tracking-[0.3em] text-[#C4A882] uppercase mb-4"
        >
          Güzellik & Bakım Stüdyosu · İstanbul
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
        >
          1 Dilek Tırnak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-sm sm:text-base text-white/70 max-w-md mx-auto mb-10"
        >
          Profesyonel tırnak bakımı, makyaj ve cilt bakımı hizmetleri
        </motion.p>

        <motion.a
          href="#randevu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-block px-8 py-3.5 border border-[#C4A882] text-[#C4A882] font-body text-sm tracking-[0.15em] uppercase hover:bg-[#C4A882] hover:text-white transition-all duration-300 rounded-lg"
        >
          Randevu Al
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={24} className="text-white/50" />
      </motion.div>
    </section>
  );
}
