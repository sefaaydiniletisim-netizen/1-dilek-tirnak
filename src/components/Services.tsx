"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { services } from "@/lib/data";
import type { ServiceCategory } from "@/lib/types";

const categories: { key: ServiceCategory; label: string }[] = [
  { key: "tirnak", label: "Tırnak" },
  { key: "makyaj", label: "Makyaj" },
  { key: "cilt", label: "Cilt Bakımı" },
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
    <section id="hizmetler" className="py-24 sm:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Hizmetlerimiz
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Size Özel Bakım
          </h2>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.1} className="flex justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 sm:px-8 py-2.5 font-body text-sm tracking-wide rounded-lg transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-transparent text-text-light border border-border hover:border-primary hover:text-primary-dark"
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
            className="grid sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {filtered.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col sm:flex-row bg-background border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-300"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={service.image_url || ""}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                  <div className="absolute inset-0 bg-[#C4A882]/5" />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2">
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
                    <span className="font-body font-semibold text-primary-dark">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="text-center mt-12">
          <a
            href="#randevu"
            className="inline-flex items-center gap-2 font-body text-sm text-primary-dark hover:text-foreground transition-colors tracking-wide"
          >
            Hemen Randevu Alın
            <ArrowRight size={16} />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
