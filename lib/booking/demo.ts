import { site, servicesById } from "@/config/site";
import type { ServiceCategory } from "@/lib/types";
import { formatMinutes, parseDate, shopNow } from "./time";
import {
  BookingError,
  type AvailabilityRequest,
  type AvailableDay,
  type BookableService,
  type BookingProvider,
  type BookingRequest,
} from "./types";

/**
 * Runs the full booking flow from config/site.ts with generated availability,
 * so the prototype works before a scheduler key is connected. Nothing is saved.
 */

const LOCATION_ID = "demo";
const SLOT_STEP_MIN = 15;
const LEAD_TIME_MIN = 90;
const BOOKING_WINDOW_DAYS = 45;
/** Services that already include every add-on. */
const ALL_INCLUSIVE = new Set(["vip"]);

const categoryLabels: Record<ServiceCategory, string> = {
  cuts: "Cuts",
  beard: "Beard",
  rituals: "Rituals",
  women: "Women",
  kids: "Kids",
};

const addOns: BookableService[] = site.addOns.map((a) => ({
  id: a.id,
  name: a.name,
  description: a.description,
  price: a.price,
  durationMin: a.durationMin,
  placeholder: a.placeholder,
  addOns: [],
}));
const addOnsById = Object.fromEntries(addOns.map((a) => [a.id, a]));

export const demoProvider: BookingProvider = {
  async catalog() {
    const groups = new Map<ServiceCategory, BookableService[]>();
    for (const s of site.services) {
      groups.set(s.category, [
        ...(groups.get(s.category) ?? []),
        {
          id: s.id,
          name: s.name,
          description: s.summary,
          price: s.price,
          durationMin: s.durationMin,
          placeholder: s.placeholder,
          addOns: ALL_INCLUSIVE.has(s.id) ? [] : addOns,
          siteServiceId: s.id,
        },
      ]);
    }
    return {
      mode: "demo",
      locationId: LOCATION_ID,
      locationName: site.brand.name,
      groups: [...groups.entries()].map(([id, services]) => ({ id, name: categoryLabels[id], services })),
      barbers: [{ id: "owner", name: site.brand.owner.name, title: site.brand.owner.title }],
    };
  },

  async availability(req: AvailabilityRequest) {
    return monthAvailability(req.year, req.month, totalDuration(req.selected));
  },

  async createBooking(req: BookingRequest) {
    const duration = totalDuration(req.selected);
    const [year, month] = req.slot.date.split("-").map(Number);
    const day = monthAvailability(year, month, duration).find((d) => d.date === req.slot.date);
    const slot = day?.slots.find((s) => s.start === req.slot.start);
    if (!slot) throw new BookingError("That time was just taken. Please pick another.", 409);
    return { id: `demo-${Date.now().toString(36)}`, status: "confirmed", slot };
  },
};

function totalDuration(selected: AvailabilityRequest["selected"]) {
  const minutes = selected.reduce(
    (sum, s) => sum + (servicesById[s.serviceId]?.durationMin ?? addOnsById[s.serviceId]?.durationMin ?? 0),
    0,
  );
  if (!minutes) throw new BookingError("Choose a service first.", 400);
  return minutes;
}

function monthAvailability(year: number, month: number, duration: number): AvailableDay[] {
  const now = shopNow();
  const today = parseDate(now.date).getTime();
  const lastBookable = today + BOOKING_WINDOW_DAYS * 86_400_000;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const hoursByDay = Object.fromEntries(site.contact.hours.map((h) => [h.day, h]));

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
    const time = parseDate(date).getTime();
    const weekday = parseDate(date).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
    const hours = hoursByDay[weekday];
    if (time < today || time > lastBookable || !hours || hours.closed) return { date, available: false, slots: [] };

    const open = toMinutes(hours.open);
    const close = toMinutes(hours.close);
    const earliest = time === today ? now.minutes + LEAD_TIME_MIN : 0;
    const slots = [];
    for (let start = open; start + duration <= close; start += SLOT_STEP_MIN) {
      if (start < earliest || isBooked(date, start, duration)) continue;
      slots.push({ date, start, duration, label: formatMinutes(start) });
    }
    return { date, available: slots.length > 0, slots };
  });
}

/** Deterministic "existing appointments" so the calendar looks like a real, busy chair. */
function isBooked(date: string, start: number, duration: number) {
  for (let t = start; t < start + duration; t += 30) {
    if (hash(`${date}:${Math.floor(t / 30)}`) % 100 < 22) return true;
  }
  return false;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function toMinutes(hhmm?: string) {
  const [h, m] = (hhmm ?? "0:0").split(":").map(Number);
  return h * 60 + m;
}
