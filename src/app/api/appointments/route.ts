import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    customer_name,
    customer_phone,
    service_name,
    staff_name,
    appointment_date,
    start_time,
    duration_minutes,
  } = body;

  if (!customer_name || !customer_phone || !appointment_date || !start_time) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // 1. Musteri olustur veya bul
    let customer_id: string;

    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", customer_phone)
      .single();

    if (existingCustomer) {
      customer_id = existingCustomer.id;
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({ name: customer_name, phone: customer_phone })
        .select("id")
        .single();

      if (customerError || !newCustomer) {
        console.error("Customer error:", customerError);
        return Response.json({ error: "Musteri olusturulamadi" }, { status: 500 });
      }
      customer_id = newCustomer.id;
    }

    // 2. Staff ve Service ID'lerini isimden bul
    let service_id = null;
    let staff_id = null;

    if (service_name) {
      const { data: svc } = await supabase
        .from("services")
        .select("id")
        .eq("name", service_name)
        .single();
      if (svc) service_id = svc.id;
    }

    if (staff_name) {
      const { data: stf } = await supabase
        .from("staff")
        .select("id")
        .eq("name", staff_name)
        .single();
      if (stf) staff_id = stf.id;
    }

    // 3. Randevu olustur
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        customer_id,
        service_id,
        staff_id,
        appointment_date,
        start_time,
        duration_minutes: duration_minutes || 60,
        status: "pending",
      })
      .select()
      .single();

    if (appointmentError) {
      console.error("Appointment error:", appointmentError);
      return Response.json({ error: "Randevu olusturulamadi" }, { status: 500 });
    }

    return Response.json(appointment, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return Response.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
