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
    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        customer_name,
        customer_phone,
        service_name: service_name || null,
        staff_name: staff_name || null,
        appointment_date,
        start_time,
        duration_minutes: duration_minutes || 60,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return Response.json({ error: "Randevu olusturulamadi" }, { status: 500 });
    }

    return Response.json(appointment, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return Response.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
