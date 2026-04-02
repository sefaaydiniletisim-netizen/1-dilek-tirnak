import { Phone, MapPin } from "lucide-react";

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
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#ekibimiz", label: "Ekibimiz" },
  { href: "#galeri", label: "Galeri" },
  { href: "#randevu", label: "Randevu" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2A2118] text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-heading italic text-2xl text-white mb-4">
              1 Dilek Tırnak
            </p>
            <p className="font-body text-sm leading-relaxed max-w-sm">
              İstanbul&apos;da profesyonel tırnak bakımı, makyaj ve cilt bakımı
              hizmetleri sunan güzellik stüdyomuz ile kendinizi özel hissedin.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
              Hızlı Linkler
            </p>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm hover:text-[#C4A882] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
              İletişim
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/1dilektirnak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-body text-sm hover:text-[#C4A882] transition-colors"
              >
                <InstagramIcon size={16} />
                @1dilektirnak
              </a>
              <p className="flex items-center gap-2.5 font-body text-sm">
                <Phone size={16} />
                0212 XXX XX XX
              </p>
              <p className="flex items-center gap-2.5 font-body text-sm">
                <MapPin size={16} />
                Nişantaşı, İstanbul
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            &copy; {new Date().getFullYear()} 1 Dilek Tırnak. Tüm hakları saklıdır.
          </p>
          <p className="font-body text-xs text-white/30">
            Sahibi: Emine Karameşe
          </p>
        </div>
      </div>
    </footer>
  );
}
