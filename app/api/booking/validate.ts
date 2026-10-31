import { BookingError, type SelectedService } from "@/lib/booking/types";

export function parseSelected(value: unknown): SelectedService[] {
  if (!Array.isArray(value) || !value.length || value.length > 10) throw new BookingError("Choose a service first.", 400);
  return value.map((v) => {
    const { serviceId, parentServiceId } = (v ?? {}) as Record<string, unknown>;
    if (typeof serviceId !== "string" || !serviceId) throw new BookingError("Invalid service.", 400);
    return { serviceId, parentServiceId: typeof parentServiceId === "string" ? parentServiceId : undefined };
  });
}

export function requiredText(value: unknown, label: string, max = 120) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new BookingError(`${label} is required.`, 400);
  return text.slice(0, max);
}

export function optionalText(value: unknown, max = 120) {
  const text = typeof value === "string" ? value.trim() : "";
  return text ? text.slice(0, max) : undefined;
}
