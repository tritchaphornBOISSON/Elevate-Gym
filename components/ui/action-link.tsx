import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "./arrow-icon";

export type ActionLinkProps = {
  href: "#gym" | "#membership" | "#contact";
  children: ReactNode;
  variant: "light" | "outline" | "dark" | "text";
  arrowLabel?: string;
};

const variantClasses: Record<ActionLinkProps["variant"], string> = {
  light:
    "bg-white px-3 text-charcoal hover:bg-cream focus-visible:outline-champagne-gold sm:px-5",
  outline:
    "border border-champagne-gold px-3 text-white hover:bg-champagne-gold hover:text-charcoal focus-visible:outline-white sm:px-5",
  dark:
    "bg-charcoal px-3 text-white hover:bg-white hover:text-charcoal focus-visible:outline-charcoal sm:px-5",
  text: "px-0 text-peach hover:text-white focus-visible:outline-champagne-gold",
};

const arrowClasses: Record<ActionLinkProps["variant"], string> = {
  light: "text-champagne-gold",
  outline: "text-champagne-gold group-hover:text-charcoal",
  dark: "text-champagne-gold group-hover:text-charcoal",
  text: "text-champagne-gold group-hover:text-white",
};

export function ActionLink({
  href,
  children,
  variant,
  arrowLabel,
}: ActionLinkProps) {
  return (
    <Link
      aria-label={arrowLabel}
      className={`group inline-flex min-h-11 max-w-full min-w-0 items-center justify-center gap-2 rounded-md font-display text-[0.6875rem] font-semibold uppercase leading-tight tracking-[0.04em] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-xs ${variantClasses[variant]}`}
      href={href}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`shrink-0 transition-colors duration-200 ${arrowClasses[variant]}`}
      >
        <ArrowIcon direction="right" />
      </span>
    </Link>
  );
}
