import { SHOP_TIME_ZONE } from "./time";

interface CalendarEvent {
  uid: string;
  title: string;
  date: string;
  start: number;
  duration: number;
  location: string;
  description?: string;
}

/** Downloads an .ics file so the guest can add the appointment to any calendar app. */
export function downloadCalendarEvent(event: CalendarEvent) {
  const blob = new Blob([toIcs(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: "bushido-cutz-appointment.ics" });
  a.click();
  URL.revokeObjectURL(url);
}

function toIcs(e: CalendarEvent) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const local = (minutes: number) => `${e.date.replaceAll("-", "")}T${pad(Math.floor(minutes / 60))}${pad(minutes % 60)}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bushido Cutz//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${e.uid}@bushidocutz.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${SHOP_TIME_ZONE}:${local(e.start)}`,
    `DTEND;TZID=${SHOP_TIME_ZONE}:${local(e.start + e.duration)}`,
    `SUMMARY:${escape(e.title)}`,
    `LOCATION:${escape(e.location)}`,
    ...(e.description ? [`DESCRIPTION:${escape(e.description)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function escape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}
