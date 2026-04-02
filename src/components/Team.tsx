"use client";

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

export default function Team() {
  return (
    <section id="ekibimiz" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Ekibimiz
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Uzman Kadromuz
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-8">
          {staff.map((member, i) => (
            <AnimatedSection key={member.id} delay={i * 0.15}>
              <div className="group text-center p-8 border border-border rounded-xl hover:border-accent/40 hover:bg-accent-light/20 transition-all duration-300">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent-light flex items-center justify-center">
                  <span className="font-heading italic text-2xl text-primary-dark">
                    {getInitials(member.name)}
                  </span>
                </div>

                <h3 className="font-heading text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-primary-dark mb-4">
                  {member.role}
                </p>
                <p className="font-body text-sm text-text-light leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {member.specialties.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 font-body text-[11px] text-text-light bg-background border border-border rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                  {member.specialties.length > 4 && (
                    <span className="px-2.5 py-1 font-body text-[11px] text-text-light bg-background border border-border rounded-md">
                      +{member.specialties.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
