import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Artanova is a community-driven ecosystem where digital ownership creates real-life experiences, meaningful connections, and long-term value.",
};

export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  );
}
