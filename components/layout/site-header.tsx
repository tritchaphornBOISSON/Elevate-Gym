import Link from "next/link";

import {
  homeNavigationItem,
  primaryNavigation,
  siteIdentity,
} from "@/content/site";

import { MobileNavigation } from "./mobile-navigation";

const mobileNavigationItems = [
  homeNavigationItem,
  ...primaryNavigation,
] as const;

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full text-white">
      <div className="mx-auto flex w-full max-w-[96rem] items-start justify-between px-6 py-5 sm:px-8 lg:px-12 lg:py-7 xl:px-16">
        <Link
          aria-label="Elevate Gym home"
          className="text-shadow-image rounded-sm font-display text-base font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-champagne-gold focus-visible:bg-charcoal/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg"
          href="/"
        >
          <span>{siteIdentity.name}</span>
          <span
            aria-hidden="true"
            className="mt-2 block h-px w-10 bg-champagne-gold"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center rounded-full border border-champagne-gold/60 bg-charcoal/35 p-1">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  className="flex min-h-11 items-center rounded-full px-5 font-display text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/10 hover:text-champagne-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNavigation items={mobileNavigationItems} />
      </div>
    </header>
  );
}
