import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const staffId = searchParams.get("staff_id");
  const date = searchParams.get("date");

  if (!staffId || !date) {
    return Response.json(
      { error: "staff_id and date are required" },
      { status: 400 }
    );
  }

  // Generate time slots from 09:00 to 20:00
  const slots = [];
  for (let h = 9; h < 20; h++) {
    for (const m of [0, 30]) {
      const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      // Simulate some booked slots randomly based on date hash
      const hash = date.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      const slotIndex = h * 2 + (m === 30 ? 1 : 0);
      const isBooked = (hash + slotIndex) % 5 === 0;
      slots.push({ time, available: !isBooked });
    }
  }

  return Response.json(slots);
}
