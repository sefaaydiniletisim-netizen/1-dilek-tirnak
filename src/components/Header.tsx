"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#hakkimizda", label: "Hakkimizda" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#ekibimiz", label: "Ekibimiz" },
  { href: "#galeri", label: "Galeri" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#iletisim", label: "Iletisim" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-primary/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-heading italic text-xs text-white font-bold">1D</span>
            </div>
            <span className={`font-heading text-xl sm:text-2xl italic transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              1 Dilek Tirnak
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-body tracking-wide transition-colors duration-300 rounded-full hover:bg-primary/10 ${
                  isScrolled ? "text-text-light hover:text-foreground" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#randevu"
              className="ml-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-body font-medium tracking-wide rounded-full hover:shadow-[0_0_20px_rgba(212,168,176,0.4)] transition-all duration-300"
            >
              Randevu Al
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            aria-label={isMobileOpen ? "Menuyu kapat" : "Menuyu ac"}
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
            className="lg:hidden glass border-b border-primary/10 overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm font-body tracking-wide text-text-light hover:text-foreground py-3 px-4 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#randevu"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white text-sm font-body font-medium tracking-wide rounded-full"
              >
                Randevu Al
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
