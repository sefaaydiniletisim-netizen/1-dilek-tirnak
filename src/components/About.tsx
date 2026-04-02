"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: "8+", label: "Yıl Deneyim" },
  { value: "5000+", label: "Mutlu Müşteri" },
  { value: "12+", label: "Hizmet Çeşidi" },
];

export default function About() {
  return (
    <section id="hakkimizda" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610992015732-2449b0ae0692?w=800&q=80"
                alt="1 Dilek Tırnak stüdyo ortamı"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#C4A882]/10" />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
              Hakkımızda
            </p>
            <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
              Güzelliğinize Değer Katıyoruz
            </h2>
            <p className="font-body text-text-light leading-relaxed mb-8">
              2015&apos;ten beri İstanbul&apos;da profesyonel tırnak bakımı, makyaj ve
              cilt bakımı hizmetleri sunuyoruz. Her müşterimize özel, hijyenik ve
              kaliteli bir deneyim yaşatmak en büyük önceliğimizdir.
            </p>
            <p className="font-body text-text-light leading-relaxed mb-10">
              Uzman kadromuz ve premium ürünlerimiz ile güzelliğinizi ön plana
              çıkarıyoruz. Stüdyomuzda kullanılan tüm malzemeler sterilize
              edilmekte ve tek kullanımlık ürünler tercih edilmektedir.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-heading text-3xl sm:text-4xl text-primary-dark mb-1">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-text-light tracking-wide">
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
