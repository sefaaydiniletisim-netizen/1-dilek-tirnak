"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { services } from "@/lib/data";
import type { ServiceCategory } from "@/lib/types";

const categories: { key: ServiceCategory; label: string; icon: string }[] = [
  { key: "tirnak", label: "Tirnak", icon: "💅" },
  { key: "makyaj", label: "Makyaj", icon: "✨" },
  { key: "cilt", label: "Cilt Bakimi", icon: "🌸" },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR").format(price) + " \u20BA";
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} saat ${m} dk` : `${h} saat`;
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("tirnak");

  const filtered = services.filter((s) => s.category === activeCategory);

  return (
    <section id="hizmetler" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-rose-light/30 to-lavender-light/20" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <Sparkles size={16} className="text-primary" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Hizmetlerimiz
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Size Ozel <span className="gradient-text">Bakim</span>
          </h2>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.1} className="flex justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-6 sm:px-8 py-3 font-body text-sm tracking-wide rounded-full transition-all duration-500 ${
                activeCategory === cat.key
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-[0_4px_20px_rgba(212,168,176,0.4)]"
                  : "bg-card text-text-light border border-border hover:border-primary/40 hover:text-primary-dark hover:shadow-md"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-5 sm:gap-6"
          >
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative flex flex-col sm:flex-row bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-[0_10px_40px_rgba(212,168,176,0.15)] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={service.image_url || ""}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Price badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full glass text-xs font-body font-semibold text-primary-dark border border-primary/20">
                    {formatPrice(service.price)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary-dark transition-colors">
                      {service.name}
                    </h3>
                    <p className="font-body text-sm text-text-light leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-text-light">
                      <Clock size={14} />
                      <span className="font-body text-xs">
                        {formatDuration(service.duration_minutes)}
                      </span>
                    </div>
                    <a
                      href="#randevu"
                      className="flex items-center gap-1 text-xs font-body text-primary-dark hover:text-primary transition-colors group/link"
                    >
                      Randevu Al
                      <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Section divider */}
        <div className="section-divider mt-20" />
      </div>
    </section>
  );
}
