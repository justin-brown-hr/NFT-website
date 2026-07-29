import type { Metadata } from "next";
import { Playfair_Display, Manrope, Petit_Formal_Script } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClickRippleCanvas from "@/components/ClickRippleCanvas";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const petitFormal = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artanova",
    template: "%s — Artanova",
  },
  description:
    "Artanova is a community-driven ecosystem where digital ownership unlocks storytelling, shared experiences, and long-term value.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${manrope.variable} ${petitFormal.variable} font-sans antialiased bg-bg-black text-text-primary`}
        suppressHydrationWarning
      >
        <Nav />
        <ClickRippleCanvas />
        {children}
        <Footer />
      </body>
    </html>
  );
}
