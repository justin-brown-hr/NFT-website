import type { Metadata } from "next";
import Community from "@/components/Community";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the Artanova community — people building shared experiences, connections, and ownership that grows over time.",
};

export default function CommunityPage() {
  return (
    <main>
      <Community />
    </main>
  );
}
