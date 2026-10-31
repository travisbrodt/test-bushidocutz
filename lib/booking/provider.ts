import { site } from "@/config/site";
import { createBarberlyProvider } from "./barberly";
import { demoProvider } from "./demo";
import type { BookingProvider } from "./types";

/** Live Barberly when a key is configured, otherwise the built-in demo. Server only. */
export function getBookingProvider(): BookingProvider {
  const apiKey = process.env.BARBERLY_API_KEY;
  if (!apiKey) return demoProvider;
  return createBarberlyProvider({
    apiKey,
    baseUrl: process.env.BARBERLY_API_BASE_URL || undefined,
    locationId: process.env.BARBERLY_LOCATION_ID || undefined,
    teamMemberId: process.env.BARBERLY_TEAM_MEMBER_ID || undefined,
    serviceMap: site.integrations.barberlyServiceMap,
  });
}
