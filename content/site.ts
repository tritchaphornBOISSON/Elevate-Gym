export type SectionHref = "#gym" | "#membership" | "#contact";

export type NavigationItem = {
  id: "gym" | "membership" | "contact";
  label: string;
  href: SectionHref;
};

export type PlaceholderLink<Id extends string = string> = {
  id: Id;
  label: string;
  href: null;
  status: "to-be-confirmed";
};

export type GymSlide = {
  id: "gym-01" | "gym-02" | "gym-03";
  src: null;
  alt: null;
  concept: true;
};

export const siteIdentity = {
  name: "Elevate Gym",
  descriptor: "Gym · Pattaya",
} as const;

export const homeNavigationItem = {
  id: "home",
  label: "Home",
  href: "/",
} as const;

export const primaryNavigation = [
  { id: "gym", label: "The Gym", href: "#gym" },
  { id: "membership", label: "Memberships", href: "#membership" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

export const footerNavigation = primaryNavigation;

export const socialItems = [
  {
    id: "facebook",
    label: "Facebook",
    href: null,
    status: "to-be-confirmed",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: null,
    status: "to-be-confirmed",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: null,
    status: "to-be-confirmed",
  },
] as const satisfies readonly PlaceholderLink<
  "facebook" | "instagram" | "tiktok"
>[];

export const legalItems = [
  {
    id: "privacy",
    label: "Privacy",
    href: null,
    status: "to-be-confirmed",
  },
  {
    id: "terms",
    label: "Terms",
    href: null,
    status: "to-be-confirmed",
  },
] as const satisfies readonly PlaceholderLink<"privacy" | "terms">[];

export const gymSlides = [
  { id: "gym-01", src: null, alt: null, concept: true },
  { id: "gym-02", src: null, alt: null, concept: true },
  { id: "gym-03", src: null, alt: null, concept: true },
] as const satisfies readonly GymSlide[];
