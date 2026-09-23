import type { Metadata } from "next";

import { GymSection } from "@/components/home/gym-section";
import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Gym in Pattaya",
  description: "Elevate Gym in Pattaya.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <GymSection />
      </main>
    </>
  );
}
