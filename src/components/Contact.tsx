"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: MapPin,
    label: "Adres",
    value: "Halkali Merkez Mah. Halkali Meydan Rezidans A Blok Kat: 6 D: 65, Kucukcekmece, Istanbul",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "0544 321 06 81",
    href: "tel:+905443210681",
  },
  {
    icon: Clock,
    label: "Calisma Saatleri",
    value: "Pazartesi - Cumartesi: 09:00 - 20:00",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@1dilektirnak",
    href: "https://instagram.com/1dilektirnak",
  },
];

export default function Contact() {
  return (
    <section id="iletisim" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gold-light/10 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <MapPin size={16} className="text-primary" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Iletisim
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Bize <span className="gradient-text">Ulasin</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <AnimatedSection>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border/50 shadow-[0_10px_40px_rgba(212,168,176,0.1)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5!2d28.7775!3d41.0195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa3f5c0a6b1a7%3A0x1234567890abcdef!2zSGFsa2FsxLEgTWV5ZGFuIEV2bGVyaQ!5e0!3m2!1str!2str!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="1 Dilek Guzellik - Halkali, Kucukcekmece, Istanbul"
                className="absolute inset-0"
              />
            </div>
          </AnimatedSection>

          {/* Contact info */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="group flex items-start gap-4 p-5 border border-border/50 rounded-2xl bg-card hover:border-primary/30 hover:shadow-[0_10px_30px_rgba(212,168,176,0.08)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-light to-lavender-light flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                      <Icon size={18} className="text-primary-dark" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-text-light uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      <p className="font-body text-sm text-foreground leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  );
                }
                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
