/**
 * Scheduler-agnostic booking shapes. Every provider (Barberly, the built-in
 * demo, and any future Square/Acuity adapter) maps to these, so the booking UI
 * never knows which scheduler is behind it.
 */

export interface BookableService {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMin: number;
  placeholder?: boolean;
  addOns: BookableService[];
  /** Matching service id in config/site.ts, used to preselect from "Book" buttons. */
  siteServiceId?: string;
}

export interface ServiceGroup {
  id: string;
  name: string;
  services: BookableService[];
}

export interface Barber {
  id: string;
  name: string;
  title?: string;
  photoUrl?: string;
}

export interface BookingCatalog {
  mode: "live" | "demo";
  locationId: string;
  locationName: string;
  groups: ServiceGroup[];
  barbers: Barber[];
}

/** Times are minutes from midnight in the shop's local time zone. */
export interface TimeSlot {
  date: string;
  start: number;
  duration: number;
  label: string;
}

export interface AvailableDay {
  date: string;
  available: boolean;
  slots: TimeSlot[];
}

export interface SelectedService {
  serviceId: string;
  /** Set for add-ons, so the scheduler keeps them attached to their main service. */
  parentServiceId?: string;
}

export interface AvailabilityRequest {
  locationId: string;
  year: number;
  month: number;
  selected: SelectedService[];
  barberId?: string;
}

export interface Guest {
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
}

export interface BookingRequest {
  locationId: string;
  barberId?: string;
  selected: SelectedService[];
  slot: { date: string; start: number; duration: number };
  guest: Guest;
  note?: string;
}

export interface BookingConfirmation {
  id: string;
  /** `pending` when the shop approves bookings by hand. */
  status: "confirmed" | "pending";
  slot: TimeSlot;
}

export interface BookingProvider {
  catalog(): Promise<BookingCatalog>;
  availability(req: AvailabilityRequest): Promise<AvailableDay[]>;
  createBooking(req: BookingRequest): Promise<BookingConfirmation>;
}

export class BookingError extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message);
    this.name = "BookingError";
  }
}
