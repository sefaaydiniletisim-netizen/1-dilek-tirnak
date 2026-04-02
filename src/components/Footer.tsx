import { Phone, MapPin, Heart } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const quickLinks = [
  { href: "#hakkimizda", label: "Hakkimizda" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#ekibimiz", label: "Ekibimiz" },
  { href: "#galeri", label: "Galeri" },
  { href: "#randevu", label: "Randevu" },
  { href: "#iletisim", label: "Iletisim" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#3D2B1F] to-[#2A1A10] text-white/70 pt-20 pb-8 overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A8B0]/30 to-transparent" />

      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#D4A8B0]/5 blur-3xl" />
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#C8A4D4]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A8B0] to-[#C8A4D4] flex items-center justify-center">
                <span className="font-heading italic text-sm text-white font-bold">1D</span>
              </div>
              <p className="font-heading italic text-2xl text-white">
                1 Dilek Tirnak
              </p>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-sm text-white/50">
              Istanbul&apos;da profesyonel tirnak bakimi, makyaj ve cilt bakimi
              hizmetleri sunan guzellik studyomuz ile kendinizi ozel hissedin.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-white/30 uppercase mb-5">
              Hizli Linkler
            </p>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/50 hover:text-[#D4A8B0] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-white/30 uppercase mb-5">
              Iletisim
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://instagram.com/1dilektirnak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-white/50 hover:text-[#D4A8B0] transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <InstagramIcon size={14} />
                </div>
                @1dilektirnak
              </a>
              <a
                href="tel:+905443210681"
                className="flex items-center gap-3 font-body text-sm text-white/50 hover:text-[#D4A8B0] transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                0544 321 06 81
              </a>
              <div className="flex items-center gap-3 font-body text-sm text-white/50">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                Halkali, Kucukcekmece, Istanbul
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20">
            &copy; {new Date().getFullYear()} 1 Dilek Tirnak. Tum haklari saklidir.
          </p>
          <p className="font-body text-xs text-white/20 flex items-center gap-1">
            Sahibi: Emine Karamese
            <Heart size={10} className="text-[#D4A8B0]/40" />
          </p>
        </div>
      </div>
    </footer>
  );
}
