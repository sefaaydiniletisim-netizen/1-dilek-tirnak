"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { staff } from "@/lib/data";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const cardGradients = [
  "from-primary/20 via-rose/20 to-accent-light",
  "from-accent/20 via-lavender/20 to-primary/10",
  "from-gold/20 via-primary/10 to-rose/20",
];

const avatarGradients = [
  "from-primary to-rose",
  "from-accent to-lavender",
  "from-gold to-primary",
];

export default function Team() {
  return (
    <section id="ekibimiz" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-lavender-light/40 to-transparent blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Ekibimiz
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Uzman <span className="gradient-text">Kadromuz</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-8">
          {staff.map((member, i) => (
            <AnimatedSection key={member.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative text-center p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(212,168,176,0.15)] transition-all duration-500"
              >
                {/* Gradient top accent */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full bg-gradient-to-r ${avatarGradients[i]} opacity-60`} />

                {/* Avatar */}
                <div className={`relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${avatarGradients[i]} p-[2px]`}>
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="font-heading italic text-2xl text-primary-dark">
                      {getInitials(member.name)}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-primary-dark mb-4">
                  {member.role}
                </p>
                <p className="font-body text-sm text-text-light leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.specialties.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 font-body text-[11px] text-text-light bg-gradient-to-r from-rose-light/50 to-lavender-light/50 border border-border/30 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                  {member.specialties.length > 4 && (
                    <span className="px-3 py-1.5 font-body text-[11px] text-primary-dark bg-primary/10 rounded-full">
                      +{member.specialties.length - 4} daha
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
