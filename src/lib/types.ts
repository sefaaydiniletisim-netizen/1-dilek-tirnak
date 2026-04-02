export type ServiceCategory = "tirnak" | "makyaj" | "cilt";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string | null;
  duration_minutes: number;
  price: number;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  specialties: string[];
  is_active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
}

export interface Appointment {
  id: string;
  customer_id: string;
  service_id: string;
  staff_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
  notes: string | null;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  date: string;
  service_name: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
