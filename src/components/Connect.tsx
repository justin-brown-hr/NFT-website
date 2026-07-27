"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { LINKS } from "@/lib/site";

const CARDS = [
  {
    title: "OpenSea",
    subtitle: "View Collection",
    href: LINKS.opensea,
    external: true,
    highlight: false,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2081E2] shadow-[0_0_24px_rgba(32,129,226,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/opensea-white.svg" alt="" className="h-7 w-7" />
      </span>
    ),
  },
  {
    title: "Discord",
    subtitle: "Join Community",
    href: LINKS.discord,
    external: true,
    highlight: false,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5865F2] shadow-[0_0_24px_rgba(88,101,242,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/discord-white.svg" alt="" className="h-7 w-7" />
      </span>
    ),
  },
  {
    title: "X",
    subtitle: "Follow on X",
    href: LINKS.x,
    external: true,
    highlight: false,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icons/x.svg" alt="" className="h-5 w-5" />
      </span>
    ),
  },
  {
    title: "Shop",
    subtitle: "Coming Soon",
    href: "/shop",
    external: false,
    highlight: true,
    icon: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/45">
        <ShoppingBag className="h-6 w-6 text-gold" strokeWidth={1.5} />
      </span>
    ),
  },
] as const;

export default function Connect() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="connect" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/50 blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="mb-4 text-[11px] font-medium uppercase tracking-wide-label text-gold md:text-xs"
          >
            CONNECT WITH ARTANOVA
          </motion.p>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
            className="font-display text-3xl text-text-primary sm:text-4xl md:text-5xl"
          >
            Stay Connected.
          </motion.h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {CARDS.map((card, i) => (
            <motion.li
              key={card.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.1 * i,
              }}
            >
              <a
                href={card.href}
                {...(card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`group flex h-full min-h-[220px] flex-col items-center rounded-2xl bg-bg-panel p-7 text-center transition-all duration-300 md:p-8 ${
                  card.highlight
                    ? "border border-gold/50 hover:border-gold"
                    : "border border-white/10 hover:border-gold/40"
                }`}
              >
                <div className="mb-6 flex justify-center">{card.icon}</div>

                <h3 className="font-display text-xl text-text-primary md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm text-text-muted">{card.subtitle}</p>

                <span className="mt-auto flex justify-center pt-10 text-gold">
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
      </div>
    </section>
  );
}
