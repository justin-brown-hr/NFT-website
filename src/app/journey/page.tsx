import type { Metadata } from "next";
import Journey from "@/components/Journey";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Artanova is built in three phases — from the beginning collection to real-world adventures and lasting ownership.",
};

export default function JourneyPage() {
  return (
    <main>
      <Journey />
    </main>
  );
}
