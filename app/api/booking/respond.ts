import { BookingError } from "@/lib/booking/types";

export function bookingErrorResponse(err: unknown) {
  if (err instanceof BookingError) {
    // Upstream auth/config failures are ours to fix, not the visitor's.
    const status = err.status === 401 || err.status === 403 ? 502 : err.status;
    return Response.json({ error: status === 502 ? "Online booking is temporarily unavailable." : err.message }, { status });
  }
  console.error("[booking]", err);
  return Response.json({ error: "Online booking is temporarily unavailable." }, { status: 500 });
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : {};
  } catch {
    throw new BookingError("Invalid request.", 400);
  }
}
