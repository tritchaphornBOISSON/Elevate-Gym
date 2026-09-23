"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { SectionHref } from "@/content/site";

export type MobileNavigationItem = {
  id: string;
  label: string;
  href: "/" | SectionHref;
};

export type MobileNavigationProps = {
  items: readonly MobileNavigationItem[];
};

const panelId = "mobile-navigation-panel";

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function closeAtDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        setOpen(false);
      }
    }

    desktopQuery.addEventListener("change", closeAtDesktop);

    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex size-11 items-center justify-center rounded-md text-white drop-shadow-md transition-colors hover:bg-white/10 hover:text-accent focus-visible:bg-charcoal/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <span
          aria-hidden="true"
          className="flex h-5 w-6 flex-col justify-between py-0.5"
        >
          <span
            className={`h-px w-full origin-center bg-current transition-transform duration-200 ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-full origin-center bg-current transition-transform duration-200 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
      </button>

      {open ? (
        <nav
          id={panelId}
          aria-label="Primary navigation"
          className="absolute inset-x-0 top-full border-y border-white/10 bg-charcoal/95 px-6 py-5 shadow-2xl lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col">
            {items.map((item) => (
              <li
                key={item.id}
                className="border-b border-white/10 last:border-b-0"
              >
                <Link
                  className="flex min-h-11 items-center font-display text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
