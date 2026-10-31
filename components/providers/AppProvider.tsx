"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import type { CheckoutRequest } from "@/lib/commerce";
import { BookingDrawer } from "@/components/booking/BookingDrawer";
import { MockCheckout } from "@/components/commerce/MockCheckout";

interface AppContextValue {
  bookingOpen: boolean;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  openCheckout: (req: CheckoutRequest) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [checkout, setCheckout] = useState<CheckoutRequest | null>(null);

  const openBooking = useCallback((serviceId?: string) => {
    setBookingServiceId(serviceId);
    setBookingOpen(true);
  }, []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);
  const openCheckout = useCallback((req: CheckoutRequest) => setCheckout(req), []);
  const closeCheckout = useCallback(() => setCheckout(null), []);

  const value = useMemo(
    () => ({ bookingOpen, openBooking, closeBooking, openCheckout }),
    [bookingOpen, openBooking, closeBooking, openCheckout],
  );

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={value}>
        {children}
        <BookingDrawer open={bookingOpen} initialServiceId={bookingServiceId} onClose={closeBooking} />
        <MockCheckout request={checkout} onClose={closeCheckout} />
      </AppContext.Provider>
    </MotionConfig>
  );
}
