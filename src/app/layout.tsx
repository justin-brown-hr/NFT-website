import type { Metadata } from "next";
import { Playfair_Display, Manrope, Petit_Formal_Script } from "next/font/google";
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
  title: "Artanova",
  description:
    "Artanova — a curated world of original art. Refined, intentional, and made for those who value craft.",
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
        {children}
      </body>
    </html>
  );
}
