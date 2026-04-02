import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { customer_name, customer_phone, service_id, staff_id, appointment_date, start_time, duration_minutes } = body;

  if (!customer_name || !customer_phone || !service_id || !staff_id || !appointment_date || !start_time) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Calculate end time
  const [hours, minutes] = start_time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + (duration_minutes || 60);
  const endHours = Math.floor(totalMinutes / 60);
  const endMins = totalMinutes % 60;
  const end_time = `${endHours.toString().padStart(2, "0")}:${endMins.toString().padStart(2, "0")}`;

  // In production, this would write to Supabase:
  // const { data, error } = await supabase
  //   .from('customers').upsert({ name: customer_name, phone: customer_phone })
  //   .select().single();
  // Then create appointment with customer_id

  const appointment = {
    id: crypto.randomUUID(),
    customer_name,
    customer_phone,
    service_id,
    staff_id,
    appointment_date,
    start_time,
    end_time,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  return Response.json(appointment, { status: 201 });
}
