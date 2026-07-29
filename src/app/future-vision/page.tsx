import type { Metadata } from "next";
import FutureVision from "@/components/FutureVision";

export const metadata: Metadata = {
  title: "Future Vision",
  description:
    "Artanova’s long-term vision: a community-driven ecosystem where digital ownership creates real-life experiences and lasting value.",
};

export default function FutureVisionPage() {
  return (
    <main>
      <FutureVision />
    </main>
  );
}
