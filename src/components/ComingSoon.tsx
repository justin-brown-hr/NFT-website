import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  title: string;
};

export function ComingSoon({ title }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-black px-6 text-center">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-wide-label text-gold">
        Artanova
      </p>
      <h1 className="font-display text-4xl text-text-primary md:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-text-muted">Coming soon.</p>
      <Link
        href="/"
        className="mt-10 text-xs font-medium uppercase tracking-wide-label text-gold transition-colors hover:text-gold-bright"
      >
        Back to Home
      </Link>
    </main>
  );
}

export function comingSoonMetadata(title: string): Metadata {
  return {
    title: `${title} — Artanova`,
    description: `${title} is coming soon to Artanova.`,
  };
}
