import { getBookingProvider } from "@/lib/booking/provider";
import { bookingErrorResponse } from "../respond";

export async function GET() {
  try {
    const catalog = await getBookingProvider().catalog();
    return Response.json(catalog, { headers: { "Cache-Control": "private, max-age=60" } });
  } catch (err) {
    return bookingErrorResponse(err);
  }
}
