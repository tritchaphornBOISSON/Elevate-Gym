import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

// Provisional implementation fonts until the final brand typefaces are approved.
const geist = Geist({
  variable: "--font-geist-implementation",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-implementation",
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elevate Gym",
    template: "%s | Elevate Gym",
  },
  description: "Elevate Gym in Pattaya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${cormorantGaramond.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
