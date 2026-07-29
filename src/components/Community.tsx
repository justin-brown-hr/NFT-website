"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { LINKS } from "@/lib/site";

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

export default function Community() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-black pt-24 md:pt-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/50 blur-[130px]"
        aria-hidden
      />

      <div className="section-pad relative mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="mb-4 text-[11px] font-medium uppercase tracking-wide-label text-gold md:text-xs"
          >
            COMMUNITY
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
            className="font-display text-3xl text-text-primary sm:text-4xl md:text-5xl"
          >
            Be Part of This.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.12 }}
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-muted md:text-base"
          >
            Artanova is built with people at the center — through shared
            experiences, real connections, and ownership that grows over time.
          </motion.p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16">
          {CHANNELS.map((channel, i) => (
            <motion.li
              key={channel.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.1 * i,
              }}
            >
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[240px] flex-col items-center rounded-2xl border border-white/10 bg-bg-panel p-7 text-center transition-all duration-300 hover:border-gold/40 md:p-8"
              >
                <div className="mb-6 flex justify-center">{channel.icon}</div>
                <h2 className="font-display text-xl text-text-primary md:text-2xl">
                  {channel.title}
                </h2>
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
      </div>
    </section>
  );
}
