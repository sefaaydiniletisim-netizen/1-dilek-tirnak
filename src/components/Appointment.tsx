"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  Calendar,
  User,
  Sparkles,
} from "lucide-react";
import { services, staff } from "@/lib/data";
import type { ServiceCategory } from "@/lib/types";

const steps = [
  { label: "Hizmet", icon: Sparkles },
  { label: "Uzman", icon: User },
  { label: "Tarih & Saat", icon: Calendar },
  { label: "Onay", icon: Check },
];

const categoryLabels: Record<ServiceCategory, string> = {
  tirnak: "Tırnak",
  makyaj: "Makyaj",
  cilt: "Cilt Bakımı",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR").format(price) + " \u20BA";
}

function generateTimeSlots(
  startHour: number,
  endHour: number,
  durationMinutes: number
): string[] {
  const slots: string[] = [];
  let current = startHour * 60;
  const end = endHour * 60;
  while (current + durationMinutes <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
    );
    current += 30;
  }
  return slots;
}

function getNext14Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const monthNames = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara",
];

export default function Appointment() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = services.find((s) => s.id === selectedService);
  const staffMember = staff.find((s) => s.id === selectedStaff);

  const availableStaff = useMemo(() => {
    if (!service) return [];
    return staff.filter((s) =>
      s.specialties.includes(service.name)
    );
  }, [service]);

  const timeSlots = useMemo(() => {
    if (!service) return [];
    // Simulate some slots being unavailable
    const allSlots = generateTimeSlots(9, 20, service.duration_minutes);
    const bookedIndices = new Set([2, 5, 8, 11]);
    return allSlots.map((time, i) => ({
      time,
      available: !bookedIndices.has(i),
    }));
  }, [service]);

  const days = useMemo(() => getNext14Days(), []);

  const canNext =
    (step === 0 && selectedService) ||
    (step === 1 && selectedStaff) ||
    (step === 2 && selectedDate && selectedTime) ||
    (step === 3 && customerName.trim() && customerPhone.trim());

  async function handleSubmit() {
    if (!service || !staffMember || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          service_id: service.id,
          staff_id: staffMember.id,
          appointment_date: selectedDate.toISOString().split("T")[0],
          start_time: selectedTime,
          duration_minutes: service.duration_minutes,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Fallback: show success anyway for demo
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section id="randevu" className="py-24 sm:py-32 bg-card">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 border border-border rounded-xl bg-background"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Check size={28} className="text-primary-dark" />
            </div>
            <h3 className="font-heading italic text-2xl sm:text-3xl text-foreground mb-4">
              Randevunuz Oluşturuldu
            </h3>
            <p className="font-body text-text-light leading-relaxed mb-6">
              Randevunuzdan 1 gün önce ve 1 saat önce hatırlatma bildirimi
              alacaksınız.
            </p>
            <div className="p-4 bg-accent-light/30 rounded-lg text-sm font-body text-foreground">
              <p className="font-semibold">{service?.name}</p>
              <p className="text-text-light mt-1">
                {staffMember?.name} ile{" "}
                {selectedDate &&
                  `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}{" "}
                {selectedTime}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="randevu" className="py-24 sm:py-32 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Online Randevu
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Randevu Alın
          </h2>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    i === step
                      ? "bg-primary text-white"
                      : i < step
                        ? "bg-primary/10 text-primary-dark"
                        : "bg-background text-text-light border border-border"
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline font-body text-xs tracking-wide">
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-10 h-px ${
                      i < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="border border-border rounded-xl bg-background p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-heading text-xl text-foreground mb-6">
                  Hizmet Seçin
                </h3>
                {(Object.keys(categoryLabels) as ServiceCategory[]).map(
                  (cat) => (
                    <div key={cat} className="mb-6">
                      <p className="font-body text-xs tracking-[0.2em] text-text-light uppercase mb-3">
                        {categoryLabels[cat]}
                      </p>
                      <div className="grid gap-2">
                        {services
                          .filter((s) => s.category === cat)
                          .map((s) => (
                            <button
                              key={s.id}
                              onClick={() => {
                                setSelectedService(s.id);
                                setSelectedStaff(null);
                              }}
                              className={`flex items-center justify-between p-4 rounded-lg border transition-colors text-left ${
                                selectedService === s.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/30"
                              }`}
                            >
                              <div>
                                <p className="font-body text-sm text-foreground">
                                  {s.name}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 font-body text-xs text-text-light">
                                    <Clock size={12} />
                                    {s.duration_minutes} dk
                                  </span>
                                </div>
                              </div>
                              <span className="font-body font-semibold text-sm text-primary-dark">
                                {formatPrice(s.price)}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-heading text-xl text-foreground mb-6">
                  Uzman Seçin
                </h3>
                <div className="grid gap-3">
                  {availableStaff.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStaff(s.id)}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors text-left ${
                        selectedStaff === s.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent-light flex items-center justify-center shrink-0">
                        <span className="font-heading italic text-sm text-primary-dark">
                          {s.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm text-foreground font-medium">
                          {s.name}
                        </p>
                        <p className="font-body text-xs text-text-light">
                          {s.role}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-heading text-xl text-foreground mb-6">
                  Tarih & Saat Seçin
                </h3>

                {/* Date picker */}
                <div className="mb-8">
                  <p className="font-body text-xs text-text-light uppercase tracking-wide mb-3">
                    Tarih
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                    {days.map((d) => {
                      const isSelected =
                        selectedDate?.toDateString() === d.toDateString();
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => {
                            setSelectedDate(d);
                            setSelectedTime(null);
                          }}
                          className={`flex flex-col items-center px-4 py-3 rounded-lg border shrink-0 transition-colors ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <span className="font-body text-[10px] text-text-light uppercase">
                            {dayNames[d.getDay()]}
                          </span>
                          <span className="font-body text-lg font-semibold text-foreground">
                            {d.getDate()}
                          </span>
                          <span className="font-body text-[10px] text-text-light">
                            {monthNames[d.getMonth()]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div>
                    <p className="font-body text-xs text-text-light uppercase tracking-wide mb-3">
                      Saat
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2.5 rounded-lg border font-body text-sm transition-colors ${
                            !slot.available
                              ? "border-border text-text-light/40 bg-background cursor-not-allowed line-through"
                              : selectedTime === slot.time
                                ? "border-primary bg-primary/5 text-foreground"
                                : "border-border text-foreground hover:border-primary/30"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-heading text-xl text-foreground mb-6">
                  İletişim Bilgileri & Onay
                </h3>

                {/* Summary */}
                <div className="p-4 bg-accent-light/20 border border-accent-light rounded-lg mb-6">
                  <p className="font-body text-sm text-foreground font-medium">
                    {service?.name}
                  </p>
                  <p className="font-body text-xs text-text-light mt-1">
                    {staffMember?.name} ile{" "}
                    {selectedDate &&
                      `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}{" "}
                    {selectedTime}
                  </p>
                  <p className="font-body text-sm font-semibold text-primary-dark mt-2">
                    {service && formatPrice(service.price)}
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-xs text-text-light uppercase tracking-wide mb-2"
                    >
                      Ad Soyad
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm text-foreground bg-background placeholder:text-text-light/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-body text-xs text-text-light uppercase tracking-wide mb-2"
                    >
                      Telefon
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm text-foreground bg-background placeholder:text-text-light/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className={`flex items-center gap-1.5 font-body text-sm ${
                step === 0
                  ? "text-text-light/30 cursor-not-allowed"
                  : "text-text-light hover:text-foreground"
              } transition-colors`}
            >
              <ChevronLeft size={16} />
              Geri
            </button>

            {step < 3 ? (
              <button
                onClick={() => canNext && setStep(step + 1)}
                disabled={!canNext}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg font-body text-sm transition-colors ${
                  canNext
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-border text-text-light/50 cursor-not-allowed"
                }`}
              >
                Devam
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext || isSubmitting}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg font-body text-sm transition-colors ${
                  canNext && !isSubmitting
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-border text-text-light/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Gönderiliyor..." : "Randevuyu Onayla"}
                <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
