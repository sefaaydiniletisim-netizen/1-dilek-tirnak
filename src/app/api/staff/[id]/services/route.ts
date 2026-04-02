import { NextRequest } from "next/server";
import { staff, services } from "@/lib/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const member = staff.find((s) => s.id === id);

  if (!member) {
    return Response.json({ error: "Staff not found" }, { status: 404 });
  }

  const staffServices = services.filter(
    (s) => s.is_active && member.specialties.includes(s.name)
  );

  return Response.json(staffServices);
}
