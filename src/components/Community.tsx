"use client";

import { ArrowRight, Swords, BookOpen, Gift, ShoppingBag, Map, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { LINKS } from "@/lib/site";

// ── Social channels ────────────────────────────────────────────────────────

const CHANNELS = [
  {
    title: "Discord",
    subtitle: "Become a Member",
    description: "Meet the community, follow updates, and take part in the journey.",
    href: LINKS.discord,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5865F2] shadow-[0_0_24px_rgba(88,101,242,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/discord-white.svg" alt="" className="h-7 w-7" />
      </span>
    ),
  },
  {
    title: "X",
    subtitle: "Follow the Story",
    description: "News, moments, and the next chapter as Artanova grows.",
    href: LINKS.x,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/x.svg" alt="" className="h-5 w-5" />
      </span>
    ),
  },
  {
    title: "OpenSea",
    subtitle: "Enter the Ecosystem",
    description: "Ownership is the key — explore the collection that opens the door.",
    href: LINKS.opensea,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2081E2] shadow-[0_0_24px_rgba(32,129,226,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/opensea-white.svg" alt="" className="h-7 w-7" />
      </span>
    ),
  },
] as const;

// ── Member benefits ────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Swords,
    label: "Community Challenges",
    description:
      "Compete in exclusive holder-only events, vote on story arcs, and earn recognition that lives on-chain.",
    accent: "rgba(77,184,217,0.18)",
    iconColor: "#4db8d9",
  },
  {
    icon: BookOpen,
    label: "Comic Universe",
    description:
      "Each NFT unlocks chapters of Artanova's expanding comic — your token, your place in the story.",
    accent: "rgba(139,92,246,0.18)",
    iconColor: "#8b5cf6",
  },
  {
    icon: Gift,
    label: "Real-World Rewards",
    description:
      "Holder drops, surprise packages, and tangible perks delivered to members who show up.",
    accent: "rgba(232,183,92,0.18)",
    iconColor: "#e8b75c",
  },
  {
    icon: ShoppingBag,
    label: "Exclusive Merchandise",
    description:
      "Limited Artanova apparel and collectibles — only available to token holders, never in open retail.",
    accent: "rgba(77,184,217,0.18)",
    iconColor: "#7ad4f0",
  },
  {
    icon: Map,
    label: "Treasure Hunts",
    description:
      "Hidden clues, on-chain puzzles, and real prizes scattered across the Artanova world for those who explore.",
    accent: "rgba(232,183,92,0.18)",
    iconColor: "#f4c860",
  },
  {
    icon: TrendingUp,
    label: "Future Investment Opportunities",
    description:
      "Early access to new drops, revenue-share events, and ecosystem growth that rewards long-term holders.",
    accent: "rgba(107,63,160,0.18)",
    iconColor: "#a78bfa",
  },
] as const;

// ── Component ──────────────────────────────────────────────────────────────

export default function Community() {
  const reduceMotion = useSafeReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-bg-black pt-24 md:pt-28">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/50 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "rgba(77,184,217,0.06)" }}
        aria-hidden
      />

      <div className="section-pad relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p {...fadeUp(0)} className="mb-4 text-[11px] font-medium uppercase tracking-wide-label text-gold md:text-xs">
            COMMUNITY
          </motion.p>

          <motion.h2 {...fadeUp(0.08)} className="font-display text-3xl text-text-primary sm:text-4xl md:text-5xl">
            Be Part of This.
          </motion.h2>

          <motion.p {...fadeUp(0.14)} className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
            Artanova is built with people at the center — through shared
            experiences, real connections, and ownership that grows over time.
          </motion.p>
        </div>

        {/* ── Social channels ─────────────────────────────────────────────── */}
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16">
          {CHANNELS.map((channel, i) => (
            <motion.li key={channel.title} {...fadeUp(0.1 * i)}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[240px] flex-col items-center rounded-2xl border border-white/10 bg-bg-panel p-7 text-center transition-all duration-300 hover:border-gold/40 md:p-8"
              >
                <div className="mb-6 flex justify-center">{channel.icon}</div>
                <h3 className="font-display text-xl text-text-primary md:text-2xl">
                  {channel.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-gold">{channel.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {channel.description}
                </p>
                <span className="mt-auto flex justify-center pt-8 text-gold">
                  <ArrowRight
                    size={18}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* ── Divider with label ───────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="mx-auto mt-20 flex max-w-5xl items-center gap-4 md:mt-24">
          <div className="h-px flex-1 bg-white/8" />
          <p className="text-[11px] font-medium uppercase tracking-wide-label text-text-muted">
            What you unlock as a holder
          </p>
          <div className="h-px flex-1 bg-white/8" />
        </motion.div>

        {/* ── Benefits grid ────────────────────────────────────────────────── */}
        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-10">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.li key={b.label} {...fadeUp(0.07 * i)}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-white/8 bg-bg-panel p-6 transition-all duration-300 hover:border-white/18 md:p-7">
                  {/* accent glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${b.accent} 0%, transparent 70%)` }}
                    aria-hidden
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: b.accent }}
                  >
                    <Icon size={20} strokeWidth={1.6} style={{ color: b.iconColor }} />
                  </div>

                  {/* Text */}
                  <h3 className="relative text-base font-semibold text-text-primary md:text-lg">
                    {b.label}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-text-muted">
                    {b.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
