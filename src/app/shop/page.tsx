import { ComingSoon, comingSoonMetadata } from "@/components/ComingSoon";

export const metadata = comingSoonMetadata("Merchandise");

export default function ShopPage() {
  return <ComingSoon title="Merchandise" />;
}
