import type { AvailabilityRequest, AvailableDay, BookingCatalog, BookingConfirmation, BookingRequest } from "./types";

let catalogPromise: Promise<BookingCatalog> | null = null;

/** The catalog rarely changes, so one request is shared for the whole visit. */
export function loadCatalog() {
  catalogPromise ??= request<BookingCatalog>("GET", "/api/booking/catalog").catch((err) => {
    catalogPromise = null;
    throw err;
  });
  return catalogPromise;
}

export function loadAvailability(req: AvailabilityRequest) {
  return request<AvailableDay[]>("POST", "/api/booking/availability", req);
}

export function submitBooking(req: BookingRequest & { company?: string }) {
  return request<BookingConfirmation>("POST", "/api/booking/bookings", req);
}

async function request<T>(method: "GET" | "POST", url: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach the scheduler. Check your connection and try again.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error((data as { error?: string } | null)?.error ?? "Something went wrong. Please try again.");
  return data as T;
}
