import { services } from "@/lib/data";

export async function GET() {
  const active = services.filter((s) => s.is_active);
  return Response.json(active);
}
