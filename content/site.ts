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

export type TemporaryConceptImage = {
  src: `/images/concept/${string}.png`;
  alt: string;
  concept: true;
  temporary: true;
  objectPosition: string;
};

export type GymSlide = TemporaryConceptImage & {
  id: "gym-01" | "gym-02" | "gym-03";
};

export type GymSlides = readonly [
  GymSlide,
  GymSlide,
  GymSlide,
  ...GymSlide[],
];

export const siteIdentity = {
  name: "Elevate Gym",
  descriptor: "Gym · Pattaya",
} as const;

export const heroConceptImage = {
  src: "/images/concept/hero-concept.png",
  alt: "Temporary concept photograph of a woman wrapping her hands in a gym.",
  concept: true,
  temporary: true,
  objectPosition: "30% center",
} as const satisfies TemporaryConceptImage;

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
  {
    id: "gym-01",
    src: "/images/concept/gym-main-concept.png",
    alt: "Temporary concept photograph of a man performing a seated dumbbell curl in a gym.",
    concept: true,
    temporary: true,
    objectPosition: "50% 45%",
  },
  {
    id: "gym-02",
    src: "/images/concept/gym-preview-equipment-concept.png",
    alt: "Temporary concept photograph of resistance equipment in a gym.",
    concept: true,
    temporary: true,
    objectPosition: "50% center",
  },
  {
    id: "gym-03",
    src: "/images/concept/gym-preview-weights-concept.png",
    alt: "Temporary concept photograph of weight plates in a gym.",
    concept: true,
    temporary: true,
    objectPosition: "55% center",
  },
] as const satisfies GymSlides;
