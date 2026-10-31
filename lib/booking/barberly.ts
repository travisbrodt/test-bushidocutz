import { site } from "@/config/site";
import { formatMinutes } from "./time";
import {
  BookingError,
  type AvailabilityRequest,
  type AvailableDay,
  type BookableService,
  type BookingCatalog,
  type BookingConfirmation,
  type BookingProvider,
  type BookingRequest,
  type SelectedService,
} from "./types";

/**
 * Barberly Booking API adapter. Shapes follow
 * https://booking-api.barberly.com/swagger/v1/swagger.json
 * The API key carries real scopes, so this module must only run on the server.
 */

interface BarberlyService {
  id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  duration?: number | null;
  extras?: BarberlyService[] | null;
}

interface BarberlyCategory {
  id: string | null;
  name?: string | null;
  services?: BarberlyService[] | null;
}

interface BarberlySlot {
  date: string;
  startMinutesOfDay: number;
  durationMinutes: number;
  timeFrom?: string | null;
}

interface BarberlyDay {
  date: string;
  isAvailable: boolean;
  timeSlots?: BarberlySlot[] | null;
}

interface BarberlyBooking {
  id: string;
  status: "Unconfirmed" | "Confirmed" | "Cancelled" | string;
  timeSlot?: BarberlySlot | null;
}

export interface BarberlyOptions {
  apiKey: string;
  baseUrl?: string;
  /** Pin one location when the account has several. Defaults to the first. */
  locationId?: string;
  /** Pin one team member (e.g. Michael), hiding the barber choice. */
  teamMemberId?: string;
  /** Maps config/site.ts service ids to Barberly service ids for preselection. */
  serviceMap?: Record<string, string>;
}

export function createBarberlyProvider(opts: BarberlyOptions): BookingProvider {
  const base = opts.baseUrl ?? "https://booking-api.barberly.com";

  async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
    const res = await fetch(base + path, {
      method,
      headers: {
        Accept: "application/json",
        "X-Api-Key": opts.apiKey,
        ...(body !== undefined && { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
    const text = await res.text();
    const data = text ? safeJson(text) : null;
    if (!res.ok) {
      const problem = (data ?? {}) as { title?: string; detail?: string };
      throw new BookingError(problem.detail || problem.title || `Scheduler request failed (${res.status})`, res.status);
    }
    return data as T;
  }

  async function resolveLocationId() {
    if (opts.locationId) return opts.locationId;
    const locations = await call<{ id: string }[]>("GET", "/v1/locations");
    if (!locations.length) throw new BookingError("No bookable location found", 404);
    return locations[0].id;
  }

  const siteIdFor = (barberlyId: string, name: string, siteNames: Record<string, string>) =>
    Object.entries(opts.serviceMap ?? {}).find(([, id]) => id === barberlyId)?.[0] ?? siteNames[name.trim().toLowerCase()];

  return {
    async catalog() {
      const locationId = await resolveLocationId();
      const [location, categories, team] = await Promise.all([
        call<{ name: string }>("GET", `/v1/locations/${locationId}`),
        call<BarberlyCategory[]>("POST", `/v1/locations/${locationId}/services`, teamQuery(opts.teamMemberId)),
        call<{ id: string; firstName: string; lastName?: string; title?: string; photoUrl?: string }[]>(
          "POST",
          `/v1/locations/${locationId}/team-members`,
          {},
        ),
      ]);

      const siteNames = Object.fromEntries(site.services.map((s) => [s.name.toLowerCase(), s.id]));

      const toService = (s: BarberlyService): BookableService => ({
        id: s.id,
        name: s.name,
        description: s.description ?? undefined,
        price: s.price ?? 0,
        durationMin: s.duration ?? 0,
        addOns: (s.extras ?? []).map(toService),
        siteServiceId: siteIdFor(s.id, s.name, siteNames),
      });

      const barbers = team
        .filter((m) => !opts.teamMemberId || m.id === opts.teamMemberId)
        .map((m) => ({ id: m.id, name: [m.firstName, m.lastName].filter(Boolean).join(" "), title: m.title, photoUrl: m.photoUrl }));

      // A service can be listed under several categories; show it once, in the first.
      const seen = new Set<string>();
      const groups = categories
        .map((c) => ({
          id: c.id ?? "uncategorized",
          name: c.name || "Services",
          services: (c.services ?? []).filter((s) => !seen.has(s.id) && seen.add(s.id)).map(toService),
        }))
        .filter((g) => g.services.length);

      return {
        mode: "live",
        locationId,
        locationName: location.name,
        groups,
        barbers,
      } satisfies BookingCatalog;
    },

    async availability(req: AvailabilityRequest): Promise<AvailableDay[]> {
      const days = await call<BarberlyDay[]>(
        "POST",
        `/v1/locations/${req.locationId}/availability/${req.year}/${req.month}`,
        { ...serviceQuery(req.selected), teamMemberId: req.barberId ?? opts.teamMemberId },
      );
      return days.map((d) => ({
        date: d.date,
        available: d.isAvailable && !!d.timeSlots?.length,
        slots: (d.timeSlots ?? []).map(toSlot),
      }));
    },

    async createBooking(req: BookingRequest): Promise<BookingConfirmation> {
      const booking = await call<BarberlyBooking>("POST", "/v1/bookings", {
        locationId: req.locationId,
        teamMemberId: req.barberId ?? opts.teamMemberId,
        serviceIds: req.selected.map((s) => s.serviceId),
        timeSlot: { date: req.slot.date, startMinutesOfDay: req.slot.start, durationMinutes: req.slot.duration },
        customer: {
          firstName: req.guest.firstName,
          lastName: req.guest.lastName || undefined,
          email: req.guest.email || undefined,
          phoneNumber: req.guest.phone,
        },
        note: req.note || undefined,
      });
      return {
        id: booking.id,
        status: booking.status === "Confirmed" ? "confirmed" : "pending",
        slot: booking.timeSlot ? toSlot(booking.timeSlot) : { ...req.slot, label: formatMinutes(req.slot.start) },
      };
    },
  };
}

function toSlot(s: BarberlySlot) {
  return {
    date: s.date,
    start: s.startMinutesOfDay,
    duration: s.durationMinutes,
    label: s.timeFrom?.replace(/^0/, "") || formatMinutes(s.startMinutesOfDay),
  };
}

function teamQuery(teamMemberId?: string) {
  return teamMemberId ? { teamMemberId } : {};
}

/** Add-ons must keep their parent, so `selectedServices` is used whenever one is picked. */
function serviceQuery(selected: SelectedService[]) {
  if (!selected.length) return {};
  if (selected.some((s) => s.parentServiceId)) {
    return { selectedServices: selected.map((s) => ({ serviceId: s.serviceId, parentServiceId: s.parentServiceId })) };
  }
  return { serviceIds: selected.map((s) => s.serviceId) };
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return { title: text.slice(0, 200) };
  }
}
