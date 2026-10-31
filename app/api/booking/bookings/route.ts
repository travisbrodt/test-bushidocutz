import { getBookingProvider } from "@/lib/booking/provider";
import { BookingError } from "@/lib/booking/types";
import { optionalText, parseSelected, requiredText } from "../validate";
import { bookingErrorResponse, readJson } from "../respond";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    // Honeypot: real visitors never see or fill this field.
    if (optionalText(body.company)) throw new BookingError("Invalid request.", 400);

    const slot = (body.slot ?? {}) as Record<string, unknown>;
    const start = Number(slot.start);
    const duration = Number(slot.duration);
    const date = typeof slot.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(slot.date) ? slot.date : "";
    if (!date || !Number.isInteger(start) || !Number.isInteger(duration)) throw new BookingError("Pick a time first.", 400);

    const guest = (body.guest ?? {}) as Record<string, unknown>;
    const phone = requiredText(guest.phone, "Mobile number", 32);
    if (phone.replace(/\D/g, "").length < 10) throw new BookingError("Enter a valid mobile number.", 400);
    const email = optionalText(guest.email, 200);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BookingError("Enter a valid email.", 400);

    const confirmation = await getBookingProvider().createBooking({
      locationId: String(body.locationId ?? ""),
      barberId: optionalText(body.barberId, 64),
      selected: parseSelected(body.selected),
      slot: { date, start, duration },
      guest: {
        firstName: requiredText(guest.firstName, "First name", 60),
        lastName: optionalText(guest.lastName, 60),
        email,
        phone,
      },
      note: optionalText(body.note, 500),
    });
    return Response.json(confirmation, { status: 201 });
  } catch (err) {
    return bookingErrorResponse(err);
  }
}
