"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: "8+", label: "Yil Deneyim", color: "from-primary to-rose" },
  { value: "5000+", label: "Mutlu Musteri", color: "from-accent to-lavender" },
  { value: "12+", label: "Hizmet Cesidi", color: "from-gold to-primary" },
];

export default function About() {
  return (
    <section id="hakkimizda" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-rose-light to-lavender-light opacity-40 blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gradient-to-tr from-gold-light to-accent-light opacity-30 blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image group */}
          <AnimatedSection>
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(212,168,176,0.2)]">
                <Image
                  src="/images/nail-station.jpg"
                  alt="1 Dilek Tirnak studyo ortami"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4A8B0]/20 via-transparent to-transparent" />
              </div>

              {/* Floating secondary image */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background hidden sm:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Image
                  src="/images/storefront.jpg"
                  alt="1 Dilek Tirnak dis mekan"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </motion.div>

              {/* Decorative badge */}
              <motion.div
                className="absolute -top-4 -left-4 bg-gradient-to-br from-primary to-accent text-white px-5 py-3 rounded-2xl shadow-lg hidden sm:block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <p className="font-heading italic text-2xl">8+</p>
                <p className="font-body text-[10px] tracking-wider uppercase">Yillik Deneyim</p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-primary to-accent" />
              <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase">
                Hakkimizda
              </p>
            </div>

            <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Guzelliginize{" "}
              <span className="gradient-text">Deger</span>{" "}
              Katiyoruz
            </h2>

            <p className="font-body text-text-light leading-relaxed mb-6">
              2015&apos;ten beri Istanbul&apos;da profesyonel tirnak bakimi, makyaj ve
              cilt bakimi hizmetleri sunuyoruz. Her musterimize ozel, hijyenik ve
              kaliteli bir deneyim yasatmak en buyuk onceligimizdir.
            </p>
            <p className="font-body text-text-light leading-relaxed mb-10">
              Uzman kadromuz ve premium urunlerimiz ile guzelliginizi on plana
              cikariyoruz. Studyomuzda kullanilan tum malzemeler sterilize
              edilmekte ve tek kullanimlik urunler tercih edilmektedir.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative text-center p-4 rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 group hover:border-primary/30 transition-all duration-300"
                >
                  <p className={`font-heading text-3xl sm:text-4xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </p>
                  <p className="font-body text-[11px] sm:text-xs text-text-light tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
