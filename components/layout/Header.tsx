"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/format";
import { Mark, Wordmark } from "@/components/ui/Mark";
import { useApp } from "@/components/providers/AppProvider";

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/shop", label: "Shop" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { openBooking } = useApp();
  const [scrolled, setScrolled] = useState(false);
  // Remembering which page opened the menu closes it automatically on navigation.
  const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
  const menuOpen = menuOpenedOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const overHero = pathname === "/" && !scrolled && !menuOpen;
  const tone = overHero || menuOpen ? "dark" : "light";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-calm",
          overHero
            ? "bg-transparent text-paper"
            : menuOpen
              ? "bg-ink text-paper"
              : "border-b border-line bg-paper/85 text-ink backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:h-20 md:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.brand.shortName} home`}>
            <Mark tone={tone} className="w-8 md:w-9" />
            <span className="flex flex-col">
              <Wordmark tone={tone} className="w-28 md:w-32" />
              <span className="mt-1 text-[0.55rem] uppercase tracking-[0.42em] opacity-70">Cutz · Hair Studio</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-[0.7rem] uppercase tracking-[0.24em] transition-opacity",
                  pathname.startsWith(item.href) ? "opacity-100" : "opacity-70 hover:opacity-100",
                )}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden bg-accent px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_85%,black)] md:inline-flex"
            >
              Book now
            </button>
            <button
              type="button"
              className="-mr-2 p-2 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpenedOn(menuOpen ? null : pathname)}
            >
              {menuOpen ? <X className="size-6" strokeWidth={1.25} /> : <Menu className="size-6" strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col bg-ink px-6 pt-28 pb-28 text-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpenedOn(null)}
                    className="block border-b border-line-light py-4 font-display text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex items-end justify-between">
              <div className="text-sm text-paper/60">
                <p>{site.contact.address.street}, {site.contact.address.suite}</p>
                <p>{site.contact.address.city}, {site.contact.address.region}</p>
                <a href={site.contact.phoneHref} className="mt-2 block text-paper">{site.contact.phone}</a>
              </div>
              <span aria-hidden className="vertical-jp font-display text-5xl text-paper/15">{site.brand.jp}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
