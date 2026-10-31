import { getBookingProvider } from "@/lib/booking/provider";
import { BookingError } from "@/lib/booking/types";
import { parseSelected } from "../validate";
import { bookingErrorResponse, readJson } from "../respond";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const year = Number(body.year);
    const month = Number(body.month);
    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
      throw new BookingError("Invalid month.", 400);
    }
    const days = await getBookingProvider().availability({
      locationId: String(body.locationId ?? ""),
      year,
      month,
      selected: parseSelected(body.selected),
      barberId: typeof body.barberId === "string" ? body.barberId : undefined,
    });
    return Response.json(days, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return bookingErrorResponse(err);
  }
}
