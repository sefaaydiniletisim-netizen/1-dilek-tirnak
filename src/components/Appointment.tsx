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
  Heart,
} from "lucide-react";
import { services, staff } from "@/lib/data";
import type { ServiceCategory } from "@/lib/types";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { label: "Hizmet", icon: Sparkles },
  { label: "Uzman", icon: User },
  { label: "Tarih & Saat", icon: Calendar },
  { label: "Onay", icon: Check },
];

const categoryLabels: Record<ServiceCategory, string> = {
  tirnak: "Tirnak",
  makyaj: "Makyaj",
  cilt: "Cilt Bakimi",
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

const dayNames = ["Paz", "Pzt", "Sal", "Car", "Per", "Cum", "Cmt"];
const monthNames = [
  "Oca", "Sub", "Mar", "Nis", "May", "Haz",
  "Tem", "Agu", "Eyl", "Eki", "Kas", "Ara",
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
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section id="randevu" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-gold-light/20 to-background" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-3xl bg-card border border-border/50 shadow-[0_20px_60px_rgba(212,168,176,0.15)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Heart size={32} className="text-white" />
            </motion.div>
            <h3 className="font-heading italic text-2xl sm:text-3xl text-foreground mb-4">
              Randevunuz Olusturuldu
            </h3>
            <p className="font-body text-text-light leading-relaxed mb-6">
              Sizinle gorusmek icin sabırsizlaniyoruz!
            </p>
            <div className="p-5 bg-gradient-to-r from-rose-light/30 to-lavender-light/30 rounded-2xl border border-primary/10">
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
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="randevu" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gold-light/20 to-background" />
      <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <Calendar size={16} className="text-gold" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="font-body text-xs tracking-[0.3em] text-primary-dark uppercase mb-4">
            Online Randevu
          </p>
          <h2 className="font-heading italic text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Randevu <span className="gradient-text">Alin</span>
          </h2>
        </AnimatedSection>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                    i === step
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-[0_4px_15px_rgba(212,168,176,0.4)]"
                      : i < step
                        ? "bg-primary/10 text-primary-dark"
                        : "bg-card text-text-light border border-border/50"
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline font-body text-xs tracking-wide">
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-10 h-px transition-colors duration-500 ${
                      i < step ? "bg-gradient-to-r from-primary to-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="rounded-3xl bg-card border border-border/50 shadow-[0_10px_40px_rgba(212,168,176,0.08)] p-6 sm:p-8">
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
                  Hizmet Secin
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
                              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                                selectedService === s.id
                                  ? "border-primary bg-gradient-to-r from-rose-light/30 to-lavender-light/20 shadow-sm"
                                  : "border-border/50 hover:border-primary/30 hover:bg-rose-light/10"
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
                  Uzman Secin
                </h3>
                <div className="grid gap-3">
                  {availableStaff.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStaff(s.id)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left ${
                        selectedStaff === s.id
                          ? "border-primary bg-gradient-to-r from-rose-light/30 to-lavender-light/20 shadow-sm"
                          : "border-border/50 hover:border-primary/30 hover:bg-rose-light/10"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent p-[2px] shrink-0">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                          <span className="font-heading italic text-sm text-primary-dark">
                            {s.name.split(" ").map((w) => w[0]).join("")}
                          </span>
                        </div>
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
                  Tarih & Saat Secin
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
                          className={`flex flex-col items-center px-4 py-3 rounded-2xl border shrink-0 transition-all duration-300 ${
                            isSelected
                              ? "border-primary bg-gradient-to-b from-rose-light/40 to-lavender-light/20 shadow-sm"
                              : "border-border/50 hover:border-primary/30"
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
                          className={`py-2.5 rounded-xl border font-body text-sm transition-all duration-300 ${
                            !slot.available
                              ? "border-border/30 text-text-light/30 bg-background cursor-not-allowed line-through"
                              : selectedTime === slot.time
                                ? "border-primary bg-gradient-to-r from-rose-light/40 to-lavender-light/20 text-foreground shadow-sm"
                                : "border-border/50 text-foreground hover:border-primary/30"
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
                  Iletisim Bilgileri & Onay
                </h3>

                {/* Summary */}
                <div className="p-5 bg-gradient-to-r from-rose-light/30 to-lavender-light/30 border border-primary/10 rounded-2xl mb-6">
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
                      placeholder="Adiniz Soyadiniz"
                      className="w-full px-5 py-3.5 border border-border/50 rounded-2xl font-body text-sm text-foreground bg-background placeholder:text-text-light/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(212,168,176,0.1)] transition-all duration-300"
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
                      className="w-full px-5 py-3.5 border border-border/50 rounded-2xl font-body text-sm text-foreground bg-background placeholder:text-text-light/40 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(212,168,176,0.1)] transition-all duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
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
                className={`flex items-center gap-1.5 px-7 py-3 rounded-full font-body text-sm transition-all duration-300 ${
                  canNext
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_4px_20px_rgba(212,168,176,0.4)]"
                    : "bg-border/50 text-text-light/50 cursor-not-allowed"
                }`}
              >
                Devam
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext || isSubmitting}
                className={`flex items-center gap-1.5 px-7 py-3 rounded-full font-body text-sm transition-all duration-300 ${
                  canNext && !isSubmitting
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_4px_20px_rgba(212,168,176,0.4)]"
                    : "bg-border/50 text-text-light/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Gonderiliyor..." : "Randevuyu Onayla"}
                <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
