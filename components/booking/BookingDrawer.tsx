"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { site } from "@/config/site";
import { cn, formatDuration, formatPrice } from "@/lib/format";
import { loadAvailability, loadCatalog, submitBooking } from "@/lib/booking/client";
import { shopNow } from "@/lib/booking/time";
import type { AvailableDay, BookingCatalog, BookingConfirmation, Guest, TimeSlot } from "@/lib/booking/types";
import { Drawer } from "@/components/ui/Drawer";
import { ServiceStep } from "./ServiceStep";
import { TimeStep } from "./TimeStep";
import { DetailsStep, type DetailsForm } from "./DetailsStep";
import { BookingConfirmed } from "./BookingConfirmed";

type Step = "service" | "time" | "details" | "done";
const STEPS: { id: Step; label: string }[] = [
  { id: "service", label: "Service" },
  { id: "time", label: "Time" },
  { id: "details", label: "Details" },
];
const MONTHS_AHEAD = 2;

export function BookingDrawer({
  open,
  initialServiceId,
  onClose,
}: {
  open: boolean;
  initialServiceId?: string;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onClose={onClose} eyebrow={site.brand.shortName} title={`Book with ${site.brand.owner.name.split(" ")[0]}`}>
      {open && <BookingFlow key={initialServiceId ?? "none"} initialServiceId={initialServiceId} onClose={onClose} />}
    </Drawer>
  );
}

function BookingFlow({ initialServiceId, onClose }: { initialServiceId?: string; onClose: () => void }) {
  const [catalog, setCatalog] = useState<BookingCatalog | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("service");

  const [serviceId, setServiceId] = useState<string>();
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [barberId, setBarberId] = useState<string>();

  const [month, setMonth] = useState<{ year: number; month: number }>();
  const [days, setDays] = useState<AvailableDay[] | null>(null);
  const [daysError, setDaysError] = useState<string | null>(null);
  const [date, setDate] = useState<string>();
  const [slot, setSlot] = useState<TimeSlot>();

  const [form, setForm] = useState<DetailsForm>({ firstName: "", lastName: "", phone: "", email: "", note: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    loadCatalog().then(
      (c) => {
        if (!active) return;
        setCatalog(c);
        const preselected = initialServiceId
          ? c.groups.flatMap((g) => g.services).find((s) => s.siteServiceId === initialServiceId)
          : undefined;
        if (preselected) setServiceId(preselected.id);
        if (c.barbers.length === 1) setBarberId(c.barbers[0].id);
      },
      (err: Error) => active && setCatalogError(err.message),
    );
    return () => {
      active = false;
    };
  }, [initialServiceId]);

  const service = catalog?.groups.flatMap((g) => g.services).find((s) => s.id === serviceId);
  const addOns = service?.addOns.filter((a) => addOnIds.includes(a.id)) ?? [];
  const total = (service?.price ?? 0) + addOns.reduce((s, a) => s + a.price, 0);
  const duration = (service?.durationMin ?? 0) + addOns.reduce((s, a) => s + a.durationMin, 0);
  const selected = service
    ? [{ serviceId: service.id }, ...addOns.map((a) => ({ serviceId: a.id, parentServiceId: service.id }))]
    : [];

  const go = (next: Step) => {
    setStep(next);
    topRef.current?.scrollIntoView({ block: "start" });
  };

  const resetTime = () => {
    setDays(null);
    setDate(undefined);
    setSlot(undefined);
  };

  const fetchMonth = async (target: { year: number; month: number }) => {
    if (!catalog) return;
    setMonth(target);
    setDays(null);
    setDaysError(null);
    try {
      const result = await loadAvailability({ locationId: catalog.locationId, ...target, selected, barberId });
      setDays(result);
      const firstOpen = result.find((d) => d.available);
      setDate(firstOpen?.date);
      setSlot(undefined);
    } catch (err) {
      setDaysError((err as Error).message);
    }
  };

  const toTime = () => {
    go("time");
    if (!days) {
      const now = shopNow();
      fetchMonth({ year: now.year, month: now.month });
    }
  };

  const submit = async () => {
    if (!catalog || !slot) return;
    setSubmitting(true);
    setSubmitError(null);
    const guest: Guest = { firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email };
    try {
      const result = await submitBooking({
        locationId: catalog.locationId,
        barberId,
        selected,
        slot: { date: slot.date, start: slot.start, duration: slot.duration },
        guest,
        note: form.note,
        company: form.company,
      });
      setConfirmation(result);
      go("done");
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (catalogError) {
    return (
      <div className="space-y-4 py-4">
        <p className="font-display text-2xl">Online booking is taking a breather.</p>
        <p className="text-stone">{catalogError}</p>
        <a
          href={site.integrations.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-paper"
        >
          Book on our scheduler <ExternalLink className="size-3.5" />
        </a>
        <p className="text-sm text-stone">
          Or call <a href={site.contact.phoneHref} className="underline underline-offset-4">{site.contact.phone}</a>.
        </p>
      </div>
    );
  }

  if (!catalog) return <CatalogSkeleton />;

  if (step === "done" && confirmation && service) {
    return (
      <BookingConfirmed
        confirmation={confirmation}
        service={service}
        addOns={addOns}
        total={total}
        demo={catalog.mode === "demo"}
        onClose={onClose}
      />
    );
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const now = shopNow();
  const monthOffset = month ? (month.year - now.year) * 12 + (month.month - now.month) : 0;

  return (
    <div className="flex min-h-full flex-col">
      <div ref={topRef} className="-mt-6 scroll-mt-6 pt-6" />
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Booking steps">
        {STEPS.map((s, i) => (
          <li key={s.id} aria-current={i === stepIndex ? "step" : undefined}>
            <span className={cn("block h-0.5", i <= stepIndex ? "bg-accent" : "bg-line")} />
            <span className={cn("mt-2 block text-[0.65rem] uppercase tracking-[0.2em]", i === stepIndex ? "text-ink" : "text-stone")}>
              {i + 1}. {s.label}
            </span>
          </li>
        ))}
      </ol>

      <div className="flex-1">
        {step === "service" && (
          <ServiceStep
            catalog={catalog}
            serviceId={serviceId}
            addOnIds={addOnIds}
            barberId={barberId}
            scrollToAddOns={!!initialServiceId && serviceId !== undefined}
            onService={(id) => {
              setServiceId(id);
              setAddOnIds([]);
              resetTime();
            }}
            onToggleAddOn={(id) => {
              setAddOnIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
              resetTime();
            }}
            onBarber={(id) => {
              setBarberId(id);
              resetTime();
            }}
          />
        )}
        {step === "time" && (
          <TimeStep
            month={month}
            days={days}
            error={daysError}
            date={date}
            slot={slot}
            canPrev={monthOffset > 0}
            canNext={monthOffset < MONTHS_AHEAD}
            onMonth={(delta) => {
              if (!month) return;
              const d = new Date(Date.UTC(month.year, month.month - 1 + delta, 1));
              fetchMonth({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 });
            }}
            onRetry={() => month && fetchMonth(month)}
            onDate={(d) => {
              setDate(d);
              setSlot(undefined);
            }}
            onSlot={setSlot}
          />
        )}
        {step === "details" && slot && service && (
          <DetailsStep
            form={form}
            onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
            onSubmit={submit}
            error={submitError}
            summary={{ service, addOns, slot, total }}
          />
        )}
      </div>

      <div className="sticky -bottom-6 -mx-6 mt-8 -mb-6 border-t border-line bg-paper px-6 pt-5 pb-6 md:-mx-8 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            {step === "service" ? (
              <>
                <p className="eyebrow whitespace-nowrap text-stone">Est. total</p>
                <p className="font-display text-3xl tabular-nums">{formatPrice(total)}</p>
                <p className="text-xs text-stone">{service ? formatDuration(duration) : "Select a service"}</p>
              </>
            ) : (
              <BackButton onClick={() => go(step === "details" ? "time" : "service")}>Back</BackButton>
            )}
          </div>
          {step === "service" && (
            <PrimaryButton disabled={!service} onClick={toTime}>
              Choose a time →
            </PrimaryButton>
          )}
          {step === "time" && (
            <PrimaryButton disabled={!slot} onClick={() => go("details")}>
              {slot ? `${slot.label} · Continue →` : "Pick a time"}
            </PrimaryButton>
          )}
          {step === "details" && (
            <PrimaryButton type="submit" form="booking-details" disabled={submitting}>
              {submitting ? "Booking…" : `Confirm · ${formatPrice(total)}`}
            </PrimaryButton>
          )}
        </div>
        <p className="mt-3 text-[0.7rem] text-stone">
          {catalog.mode === "demo"
            ? "Prototype: sample times shown until Michael's calendar is connected."
            : "Real-time availability from Michael's calendar."}
        </p>
      </div>
    </div>
  );
}

function PrimaryButton({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className="shrink-0 whitespace-nowrap bg-accent px-5 py-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper transition-opacity disabled:opacity-30 md:px-6"
    >
      {children}
    </button>
  );
}

function BackButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 py-4 text-xs uppercase tracking-[0.2em] text-stone hover:text-ink">
      <ArrowLeft className="size-3.5" /> {children}
    </button>
  );
}

function CatalogSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading services">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-[74px] animate-pulse border border-line bg-paper-deep/60" />
      ))}
    </div>
  );
}
