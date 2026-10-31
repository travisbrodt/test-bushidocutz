import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "accent" | "ink" | "paper" | "outline" | "outline-light" | "text" | "text-light";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-3 font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-calm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-paper hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)]",
  ink: "bg-ink text-paper hover:bg-ink-soft",
  paper: "bg-paper text-ink hover:bg-paper-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  text: "text-ink px-0! hover:text-accent",
  "text-light": "text-paper px-0! hover:text-paper/70",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.65rem] px-4 py-2.5",
  md: "text-[0.7rem] px-6 py-3.5",
  lg: "text-xs px-8 py-4.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };
type LinkProps = CommonProps & { href: string; external?: boolean };

function Arrow() {
  return (
    <span aria-hidden className="inline-block transition-transform duration-500 ease-calm group-hover:translate-x-1">
      →
    </span>
  );
}

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "ink", size = "md", className, children, arrow } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const rest: Partial<ButtonProps> = { ...(props as ButtonProps) };
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.children;
  delete rest.arrow;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
