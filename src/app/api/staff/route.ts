import { staff } from "@/lib/data";

export async function GET() {
  const active = staff.filter((s) => s.is_active);
  return Response.json(active);
}
