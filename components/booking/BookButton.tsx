"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProvider";

type Props = Omit<ComponentProps<typeof Button>, "href" | "onClick" | "children"> & {
  serviceId?: string;
  children?: React.ReactNode;
};

export function BookButton({ serviceId, children = "Book appointment", ...rest }: Props) {
  const { openBooking } = useApp();
  return (
    <Button variant="accent" {...rest} onClick={() => openBooking(serviceId)}>
      {children}
    </Button>
  );
}
