"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#ekibimiz", label: "Ekibimiz" },
  { href: "#galeri", label: "Galeri" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="font-heading text-xl sm:text-2xl italic text-foreground">
            1 Dilek Tırnak
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body tracking-wide text-text-light hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#randevu"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-body font-medium tracking-wide rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Phone size={14} />
              Randevu Al
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label={isMobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm font-body tracking-wide text-text-light hover:text-foreground py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#randevu"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-body font-medium tracking-wide rounded-lg hover:bg-primary-dark transition-colors mt-2"
              >
                <Phone size={14} />
                Randevu Al
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
