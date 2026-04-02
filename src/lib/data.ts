import type { Service, Staff, Review } from "./types";

// =============================================
// HER GÖRSEL FARKLI VE KONUya UYGUN
// Unsplash verified IDs - tırnak, makyaj, cilt bakımı
// =============================================

export const services: Service[] = [
  // ========== TIRNAK HİZMETLERİ ==========
  {
    id: "s1",
    name: "Protez Tırnak (Akrilik)",
    category: "tirnak",
    description:
      "Profesyonel akrilik uygulaması ile uzun ömürlü ve doğal görünümlü protez tırnaklar.",
    duration_minutes: 150,
    price: 1200,
    // Akrilik tırnak close-up, parlak kırmızı ojeli eller
    image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "s2",
    name: "Jel Tırnak",
    category: "tirnak",
    description:
      "UV ışığı ile sertleşen jel teknolojisi ile parlak ve dayanıklı tırnaklar.",
    duration_minutes: 120,
    price: 1000,
    // Jel tırnak, pembe tonlarda parlak
    image_url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "s3",
    name: "Kalıcı Oje (Shellac)",
    category: "tirnak",
    description:
      "2-3 hafta boyunca parlak kalan, tırnaklara zarar vermeyen kalıcı oje uygulaması.",
    duration_minutes: 90,
    price: 600,
    // Oje şişeleri ve fırça, renkli ojeler
    image_url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "s4",
    name: "Nail Art (Özel Tasarım)",
    category: "tirnak",
    description:
      "Kişiye özel, el çizimi veya transfer baskı ile benzersiz tırnak tasarımları.",
    duration_minutes: 120,
    price: 900,
    // Detaylı nail art tasarımı, renkli desenler
    image_url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80",
    is_active: true,
    sort_order: 4,
  },
  {
    id: "s5",
    name: "Manikür (Kuru/Islak)",
    category: "tirnak",
    description: "Tırnak şekillendirme, tırnak eti bakımı ve nemlendirme.",
    duration_minutes: 60,
    price: 400,
    // Manikür yapılırken eller, tırnak törpüsü
    image_url: "https://images.unsplash.com/photo-1440557653082-e67ffad744c0?w=800&q=80",
    is_active: true,
    sort_order: 5,
  },
  {
    id: "s6",
    name: "Pedikür",
    category: "tirnak",
    description:
      "Ayak bakımı, nasır temizliği, tırnak şekillendirme ve nemlendirme.",
    duration_minutes: 60,
    price: 450,
    // Ayak bakımı, pedikür
    image_url: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&q=80",
    is_active: true,
    sort_order: 6,
  },
  {
    id: "s7",
    name: "Tırnak Onarımı",
    category: "tirnak",
    description: "Kırık veya hasarlı tırnak onarımı ve güçlendirme.",
    duration_minutes: 30,
    price: 200,
    // Tırnak bakım aletleri close-up
    image_url: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80",
    is_active: true,
    sort_order: 7,
  },
  {
    id: "s8",
    name: "Tırnak Bakımı (Güçlendirme)",
    category: "tirnak",
    description:
      "Özel bakım ürünleri ile tırnak güçlendirme ve besleyici bakım.",
    duration_minutes: 45,
    price: 350,
    // Bakımlı eller, doğal tırnaklar
    image_url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    is_active: true,
    sort_order: 8,
  },
  // ========== MAKYAJ HİZMETLERİ ==========
  {
    id: "s9",
    name: "Kalıcı Makyaj (Kaş)",
    category: "makyaj",
    description:
      "Microblading veya pudralama tekniği ile doğal görünümlü kalıcı kaş makyajı.",
    duration_minutes: 120,
    price: 3500,
    // Kaş makyajı, microblading close-up
    image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "s10",
    name: "Kalıcı Makyaj (Dudak)",
    category: "makyaj",
    description: "Dudaklara doğal renk ve dolgunluk katan kalıcı dudak makyajı.",
    duration_minutes: 120,
    price: 3000,
    // Rujlar, dudak ürünleri
    image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "s11",
    name: "Günlük Makyaj",
    category: "makyaj",
    description:
      "Doğal ve şık günlük makyaj uygulaması, özel etkinlikler için ideal.",
    duration_minutes: 60,
    price: 800,
    // Makyaj fırçaları ve paleti
    image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "s12",
    name: "Gelin Makyajı",
    category: "makyaj",
    description:
      "Büyük gününüz için profesyonel gelin makyajı, prova dahil.",
    duration_minutes: 150,
    price: 5000,
    // Gelin makyaj malzemeleri, lüks kozmetik
    image_url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    is_active: true,
    sort_order: 4,
  },
  {
    id: "s13",
    name: "Kirpik Lifting",
    category: "makyaj",
    description:
      "Doğal kirpiklerinizi kıvırma ve boyama ile belirginleştirin.",
    duration_minutes: 60,
    price: 700,
    // Göz close-up, kirpik detay
    image_url: "https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?w=800&q=80",
    is_active: true,
    sort_order: 5,
  },
  {
    id: "s14",
    name: "İpek Kirpik",
    category: "makyaj",
    description:
      "Tek tek uygulanan ipek kirpikler ile yoğun ve doğal bir görünüm.",
    duration_minutes: 90,
    price: 1200,
    // Kirpik uzantıları, güzellik detay
    image_url: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=800&q=80",
    is_active: true,
    sort_order: 6,
  },
  // ========== CİLT BAKIMI ==========
  {
    id: "s15",
    name: "Klasik Cilt Bakımı",
    category: "cilt",
    description:
      "Derin temizlik, peeling, maske ve nemlendirme ile kapsamlı cilt bakımı.",
    duration_minutes: 90,
    price: 1500,
    // Yüz maskesi uygulaması
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "s16",
    name: "Hydrafacial",
    category: "cilt",
    description:
      "Patentli teknoloji ile derin temizlik, nemlendirme ve cilt yenileme.",
    duration_minutes: 60,
    price: 2000,
    // Cilt bakım cihazı uygulaması
    image_url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "s17",
    name: "Cilt Temizleme",
    category: "cilt",
    description:
      "Profesyonel cilt temizleme ile gözeneklerin derinlemesine arındırılması.",
    duration_minutes: 60,
    price: 1000,
    // Cilt bakım ürünleri, serum şişeleri
    image_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "s18",
    name: "Anti-Aging Bakım",
    category: "cilt",
    description:
      "Yaşlanma karşıtı serumlar ve maskeler ile cildinizi gençleştirin.",
    duration_minutes: 90,
    price: 2500,
    // Anti-aging serum, damlalık şişe
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    is_active: true,
    sort_order: 4,
  },
];

export const staff: Staff[] = [
  {
    id: "st1",
    name: "Dilek Hanım",
    role: "Kurucu & Tırnak Uzmanı",
    bio: "8 yılı aşkın deneyimiyle protez tırnak, jel tırnak ve nail art konusunda uzmanlaşmış kurucumuz.",
    avatar_url: null,
    specialties: [
      "Protez Tırnak (Akrilik)",
      "Jel Tırnak",
      "Nail Art (Özel Tasarım)",
      "Manikür (Kuru/Islak)",
      "Pedikür",
      "Tırnak Onarımı",
      "Tırnak Bakımı (Güçlendirme)",
      "Kalıcı Oje (Shellac)",
    ],
    is_active: true,
  },
  {
    id: "st2",
    name: "Emine Hanım",
    role: "Makyaj & Kalıcı Makyaj Uzmanı",
    bio: "Kalıcı makyaj ve gelin makyajı alanında sertifikalı uzman. Her yüze özel tasarım anlayışı.",
    avatar_url: null,
    specialties: [
      "Kalıcı Makyaj (Kaş)",
      "Kalıcı Makyaj (Dudak)",
      "Günlük Makyaj",
      "Gelin Makyajı",
      "Kirpik Lifting",
      "İpek Kirpik",
    ],
    is_active: true,
  },
  {
    id: "st3",
    name: "Selin Hanım",
    role: "Cilt Bakım Uzmanı",
    bio: "Dermokozmetik eğitimli cilt bakım uzmanı. Hydrafacial ve anti-aging tedavilerinde deneyimli.",
    avatar_url: null,
    specialties: [
      "Klasik Cilt Bakımı",
      "Hydrafacial",
      "Cilt Temizleme",
      "Anti-Aging Bakım",
    ],
    is_active: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    customer_name: "Ayşe Y.",
    rating: 5,
    comment:
      "Dilek Hanım'ın elinden çıkan protez tırnaklar muhteşem! Çok doğal görünüyor, 3 haftadır hiç sorun yaşamadım. Kesinlikle tavsiye ederim.",
    date: "2024-12-15",
    service_name: "Protez Tırnak",
  },
  {
    id: "r2",
    customer_name: "Merve K.",
    rating: 5,
    comment:
      "Gelin makyajım için Emine Hanım'ı tercih ettim ve çok memnun kaldım. Tam istediğim doğal ama göz alıcı bir makyaj yaptı. Fotoğraflarda harika görünüyordum!",
    date: "2024-11-20",
    service_name: "Gelin Makyajı",
  },
  {
    id: "r3",
    customer_name: "Zeynep A.",
    rating: 5,
    comment:
      "Hydrafacial deneyimim harikaydı. Selin Hanım cildimdeki sorunları çok iyi analiz etti. Bir seanstan sonra bile fark görülebilir.",
    date: "2025-01-08",
    service_name: "Hydrafacial",
  },
  {
    id: "r4",
    customer_name: "Elif D.",
    rating: 5,
    comment:
      "Kalıcı kaş makyajım çok doğal oldu. Emine Hanım yüz şeklime en uygun kaş formunu belirledi. Sabahları makyajsız bile kendimi güzel hissediyorum.",
    date: "2025-02-14",
    service_name: "Kalıcı Makyaj (Kaş)",
  },
  {
    id: "r5",
    customer_name: "Seda T.",
    rating: 4,
    comment:
      "Jel tırnak yaptırdım, tasarım tam istediğim gibi oldu. Stüdyo çok hijyenik ve ferah. Tek eleştirim randevu saatinde biraz beklemiş olmam.",
    date: "2025-03-02",
    service_name: "Jel Tırnak",
  },
  {
    id: "r6",
    customer_name: "Büşra M.",
    rating: 5,
    comment:
      "Anti-aging bakım seanslarına başladım ve cildimde inanılmaz bir fark var. Selin Hanım çok bilgili ve özenli. Düzenli müşterileri oldum artık.",
    date: "2025-03-18",
    service_name: "Anti-Aging Bakım",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    alt: "Protez tırnak uygulaması",
  },
  {
    src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80",
    alt: "Nail art tasarımı",
  },
  {
    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80",
    alt: "Jel tırnak",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    alt: "Cilt bakım maskesi",
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    alt: "Makyaj fırçaları",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    alt: "Makyaj uygulaması",
  },
  {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    alt: "Cilt bakımı",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80",
    alt: "Oje renkleri",
  },
  {
    src: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    alt: "Ruj koleksiyonu",
  },
  {
    src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    alt: "Cilt bakım ürünleri",
  },
];
