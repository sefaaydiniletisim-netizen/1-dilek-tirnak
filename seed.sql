-- =============================================
-- 1 Dilek Tırnak - Veritabanı Şeması & Seed Data
-- =============================================

-- Hizmetler
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tirnak', 'makyaj', 'cilt')),
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Personel
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  specialties TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Personel-Hizmet eşleştirmesi
CREATE TABLE IF NOT EXISTS staff_services (
  staff_id UUID REFERENCES staff(id),
  service_id UUID REFERENCES services(id),
  PRIMARY KEY (staff_id, service_id)
);

-- Müşteriler
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  notes TEXT,
  loyalty_points INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'regular', 'vip', 'risk')),
  no_show_count INTEGER DEFAULT 0,
  total_visits INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_visit_at TIMESTAMPTZ
);

-- Randevular
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  service_id UUID REFERENCES services(id),
  staff_id UUID REFERENCES staff(id),
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  reminder_24h_sent BOOLEAN DEFAULT false,
  reminder_1h_sent BOOLEAN DEFAULT false,
  customer_confirmed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Çalışma saatleri
CREATE TABLE IF NOT EXISTS working_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES staff(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true
);

-- Müşteri yorumları
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  service_id UUID REFERENCES services(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- SEED DATA
-- =============================================

-- Hizmetler: Tırnak
INSERT INTO services (name, category, description, duration_minutes, price, image_url, sort_order) VALUES
('Protez Tırnak (Akrilik)', 'tirnak', 'Profesyonel akrilik uygulaması ile uzun ömürlü ve doğal görünümlü protez tırnaklar.', 150, 1200.00, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', 1),
('Jel Tırnak', 'tirnak', 'UV ışığı ile sertleşen jel teknolojisi ile parlak ve dayanıklı tırnaklar.', 120, 1000.00, 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80', 2),
('Kalıcı Oje (Shellac)', 'tirnak', '2-3 hafta boyunca parlak kalan, tırnaklara zarar vermeyen kalıcı oje uygulaması.', 90, 600.00, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80', 3),
('Nail Art (Özel Tasarım)', 'tirnak', 'Kişiye özel, el çizimi veya transfer baskı ile benzersiz tırnak tasarımları.', 120, 900.00, 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80', 4),
('Manikür (Kuru/Islak)', 'tirnak', 'Tırnak şekillendirme, tırnak eti bakımı ve nemlendirme.', 60, 400.00, 'https://images.unsplash.com/photo-1440557653082-e67ffad744c0?w=800&q=80', 5),
('Pedikür', 'tirnak', 'Ayak bakımı, nasır temizliği, tırnak şekillendirme ve nemlendirme.', 60, 450.00, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80', 6),
('Tırnak Onarımı', 'tirnak', 'Kırık veya hasarlı tırnak onarımı ve güçlendirme.', 30, 200.00, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', 7),
('Tırnak Bakımı (Güçlendirme)', 'tirnak', 'Özel bakım ürünleri ile tırnak güçlendirme ve besleyici bakım.', 45, 350.00, 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80', 8);

-- Hizmetler: Makyaj
INSERT INTO services (name, category, description, duration_minutes, price, image_url, sort_order) VALUES
('Kalıcı Makyaj (Kaş)', 'makyaj', 'Microblading veya pudralama tekniği ile doğal görünümlü kalıcı kaş makyajı.', 120, 3500.00, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', 1),
('Kalıcı Makyaj (Dudak)', 'makyaj', 'Dudaklara doğal renk ve dolgunluk katan kalıcı dudak makyajı.', 120, 3000.00, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', 2),
('Günlük Makyaj', 'makyaj', 'Doğal ve şık günlük makyaj uygulaması, özel etkinlikler için ideal.', 60, 800.00, 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&q=80', 3),
('Gelin Makyajı', 'makyaj', 'Büyük gününüz için profesyonel gelin makyajı, prova dahil.', 150, 5000.00, 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80', 4),
('Kirpik Lifting', 'makyaj', 'Doğal kirpiklerinizi kıvırma ve boyama ile belirginleştirin.', 60, 700.00, 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80', 5),
('İpek Kirpik', 'makyaj', 'Tek tek uygulanan ipek kirpikler ile yoğun ve doğal bir görünüm.', 90, 1200.00, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', 6);

-- Hizmetler: Cilt Bakımı
INSERT INTO services (name, category, description, duration_minutes, price, image_url, sort_order) VALUES
('Klasik Cilt Bakımı', 'cilt', 'Derin temizlik, peeling, maske ve nemlendirme ile kapsamlı cilt bakımı.', 90, 1500.00, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', 1),
('Hydrafacial', 'cilt', 'Patentli teknoloji ile derin temizlik, nemlendirme ve cilt yenileme.', 60, 2000.00, 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', 2),
('Cilt Temizleme', 'cilt', 'Profesyonel cilt temizleme ile gözeneklerin derinlemesine arındırılması.', 60, 1000.00, 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80', 3),
('Anti-Aging Bakım', 'cilt', 'Yaşlanma karşıtı serumlar ve maskeler ile cildinizi gençleştirin.', 90, 2500.00, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80', 4);

-- Personel
INSERT INTO staff (name, role, bio, specialties) VALUES
('Dilek Hanım', 'Kurucu & Tırnak Uzmanı', '8 yılı aşkın deneyimiyle protez tırnak, jel tırnak ve nail art konusunda uzmanlaşmış kurucumuz.', ARRAY['Protez Tırnak (Akrilik)', 'Jel Tırnak', 'Nail Art (Özel Tasarım)', 'Manikür (Kuru/Islak)', 'Pedikür', 'Tırnak Onarımı', 'Tırnak Bakımı (Güçlendirme)', 'Kalıcı Oje (Shellac)']),
('Emine Hanım', 'Makyaj & Kalıcı Makyaj Uzmanı', 'Kalıcı makyaj ve gelin makyajı alanında sertifikalı uzman. Her yüze özel tasarım anlayışı.', ARRAY['Kalıcı Makyaj (Kaş)', 'Kalıcı Makyaj (Dudak)', 'Günlük Makyaj', 'Gelin Makyajı', 'Kirpik Lifting', 'İpek Kirpik']),
('Selin Hanım', 'Cilt Bakım Uzmanı', 'Dermokozmetik eğitimli cilt bakım uzmanı. Hydrafacial ve anti-aging tedavilerinde deneyimli.', ARRAY['Klasik Cilt Bakımı', 'Hydrafacial', 'Cilt Temizleme', 'Anti-Aging Bakım']);

-- Personel-Hizmet eşleştirmesi (Dilek Hanım - Tırnak hizmetleri)
INSERT INTO staff_services (staff_id, service_id)
SELECT s.id, sv.id FROM staff s, services sv
WHERE s.name = 'Dilek Hanım' AND sv.category = 'tirnak';

-- Personel-Hizmet eşleştirmesi (Emine Hanım - Makyaj hizmetleri)
INSERT INTO staff_services (staff_id, service_id)
SELECT s.id, sv.id FROM staff s, services sv
WHERE s.name = 'Emine Hanım' AND sv.category = 'makyaj';

-- Personel-Hizmet eşleştirmesi (Selin Hanım - Cilt bakımı hizmetleri)
INSERT INTO staff_services (staff_id, service_id)
SELECT s.id, sv.id FROM staff s, services sv
WHERE s.name = 'Selin Hanım' AND sv.category = 'cilt';

-- Çalışma Saatleri (Pzt-Cmt: 09:00-20:00)
INSERT INTO working_hours (staff_id, day_of_week, start_time, end_time)
SELECT s.id, d.day, '09:00'::TIME, '20:00'::TIME
FROM staff s, (VALUES (1),(2),(3),(4),(5),(6)) AS d(day);

-- Demo Müşteriler
INSERT INTO customers (name, phone, email, status, total_visits, total_spent) VALUES
('Ayşe Yılmaz', '05321234567', 'ayse@email.com', 'regular', 8, 6400.00),
('Merve Kaya', '05339876543', 'merve@email.com', 'vip', 15, 18500.00),
('Zeynep Arslan', '05345551234', 'zeynep@email.com', 'regular', 5, 7500.00),
('Elif Demir', '05351112233', 'elif@email.com', 'regular', 3, 4500.00),
('Seda Toprak', '05367778899', 'seda@email.com', 'new', 2, 1600.00),
('Büşra Mutlu', '05378884455', 'busra@email.com', 'regular', 6, 9000.00);

-- Demo Randevular (önümüzdeki günler)
INSERT INTO appointments (customer_id, service_id, staff_id, appointment_date, start_time, end_time, status) VALUES
(
  (SELECT id FROM customers WHERE name = 'Ayşe Yılmaz'),
  (SELECT id FROM services WHERE name = 'Protez Tırnak (Akrilik)'),
  (SELECT id FROM staff WHERE name = 'Dilek Hanım'),
  CURRENT_DATE + INTERVAL '1 day', '10:00', '12:30', 'confirmed'
),
(
  (SELECT id FROM customers WHERE name = 'Merve Kaya'),
  (SELECT id FROM services WHERE name = 'Gelin Makyajı'),
  (SELECT id FROM staff WHERE name = 'Emine Hanım'),
  CURRENT_DATE + INTERVAL '2 days', '14:00', '16:30', 'confirmed'
),
(
  (SELECT id FROM customers WHERE name = 'Zeynep Arslan'),
  (SELECT id FROM services WHERE name = 'Hydrafacial'),
  (SELECT id FROM staff WHERE name = 'Selin Hanım'),
  CURRENT_DATE + INTERVAL '1 day', '11:00', '12:00', 'pending'
),
(
  (SELECT id FROM customers WHERE name = 'Elif Demir'),
  (SELECT id FROM services WHERE name = 'Kalıcı Makyaj (Kaş)'),
  (SELECT id FROM staff WHERE name = 'Emine Hanım'),
  CURRENT_DATE + INTERVAL '3 days', '09:00', '11:00', 'confirmed'
),
(
  (SELECT id FROM customers WHERE name = 'Seda Toprak'),
  (SELECT id FROM services WHERE name = 'Jel Tırnak'),
  (SELECT id FROM staff WHERE name = 'Dilek Hanım'),
  CURRENT_DATE + INTERVAL '2 days', '10:00', '12:00', 'pending'
),
(
  (SELECT id FROM customers WHERE name = 'Büşra Mutlu'),
  (SELECT id FROM services WHERE name = 'Anti-Aging Bakım'),
  (SELECT id FROM staff WHERE name = 'Selin Hanım'),
  CURRENT_DATE + INTERVAL '3 days', '15:00', '16:30', 'confirmed'
),
(
  (SELECT id FROM customers WHERE name = 'Ayşe Yılmaz'),
  (SELECT id FROM services WHERE name = 'Manikür (Kuru/Islak)'),
  (SELECT id FROM staff WHERE name = 'Dilek Hanım'),
  CURRENT_DATE + INTERVAL '4 days', '09:00', '10:00', 'pending'
),
(
  (SELECT id FROM customers WHERE name = 'Merve Kaya'),
  (SELECT id FROM services WHERE name = 'Kalıcı Makyaj (Dudak)'),
  (SELECT id FROM staff WHERE name = 'Emine Hanım'),
  CURRENT_DATE + INTERVAL '5 days', '11:00', '13:00', 'pending'
),
(
  (SELECT id FROM customers WHERE name = 'Zeynep Arslan'),
  (SELECT id FROM services WHERE name = 'Klasik Cilt Bakımı'),
  (SELECT id FROM staff WHERE name = 'Selin Hanım'),
  CURRENT_DATE + INTERVAL '4 days', '14:00', '15:30', 'confirmed'
),
(
  (SELECT id FROM customers WHERE name = 'Elif Demir'),
  (SELECT id FROM services WHERE name = 'Nail Art (Özel Tasarım)'),
  (SELECT id FROM staff WHERE name = 'Dilek Hanım'),
  CURRENT_DATE + INTERVAL '5 days', '16:00', '18:00', 'pending'
),
(
  (SELECT id FROM customers WHERE name = 'Seda Toprak'),
  (SELECT id FROM services WHERE name = 'Kirpik Lifting'),
  (SELECT id FROM staff WHERE name = 'Emine Hanım'),
  CURRENT_DATE + INTERVAL '6 days', '10:00', '11:00', 'pending'
),
(
  (SELECT id FROM customers WHERE name = 'Büşra Mutlu'),
  (SELECT id FROM services WHERE name = 'Cilt Temizleme'),
  (SELECT id FROM staff WHERE name = 'Selin Hanım'),
  CURRENT_DATE + INTERVAL '6 days', '13:00', '14:00', 'confirmed'
);

-- Demo Yorumlar
INSERT INTO reviews (customer_id, service_id, rating, comment) VALUES
(
  (SELECT id FROM customers WHERE name = 'Ayşe Yılmaz'),
  (SELECT id FROM services WHERE name = 'Protez Tırnak (Akrilik)'),
  5, 'Dilek Hanım''ın elinden çıkan protez tırnaklar muhteşem! Çok doğal görünüyor, 3 haftadır hiç sorun yaşamadım. Kesinlikle tavsiye ederim.'
),
(
  (SELECT id FROM customers WHERE name = 'Merve Kaya'),
  (SELECT id FROM services WHERE name = 'Gelin Makyajı'),
  5, 'Gelin makyajım için Emine Hanım''ı tercih ettim ve çok memnun kaldım. Tam istediğim doğal ama göz alıcı bir makyaj yaptı.'
),
(
  (SELECT id FROM customers WHERE name = 'Zeynep Arslan'),
  (SELECT id FROM services WHERE name = 'Hydrafacial'),
  5, 'Hydrafacial deneyimim harikaydı. Selin Hanım cildimdeki sorunları çok iyi analiz etti. Bir seanstan sonra bile fark görülebilir.'
),
(
  (SELECT id FROM customers WHERE name = 'Elif Demir'),
  (SELECT id FROM services WHERE name = 'Kalıcı Makyaj (Kaş)'),
  5, 'Kalıcı kaş makyajım çok doğal oldu. Emine Hanım yüz şeklime en uygun kaş formunu belirledi.'
),
(
  (SELECT id FROM customers WHERE name = 'Seda Toprak'),
  (SELECT id FROM services WHERE name = 'Jel Tırnak'),
  4, 'Jel tırnak yaptırdım, tasarım tam istediğim gibi oldu. Stüdyo çok hijyenik ve ferah.'
),
(
  (SELECT id FROM customers WHERE name = 'Büşra Mutlu'),
  (SELECT id FROM services WHERE name = 'Anti-Aging Bakım'),
  5, 'Anti-aging bakım seanslarına başladım ve cildimde inanılmaz bir fark var. Selin Hanım çok bilgili ve özenli.'
);
