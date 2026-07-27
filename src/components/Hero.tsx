"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { LINKS } from "@/lib/site";

export default function Hero() {
  const reduceMotion = useSafeReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(160deg, #0a1628 0%, #08060b 40%, #0f0b14 70%, #08060b 100%)",
        }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-gallery.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(8,6,11,0.45) 55%, rgba(8,6,11,0.92) 100%), linear-gradient(to bottom, rgba(8,6,11,0.55) 0%, transparent 35%, transparent 55%, rgba(8,6,11,0.95) 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/40 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-[40vmin] w-[40vmin] rounded-full bg-purple-primary/15 blur-[90px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-28 text-center md:px-8 md:pt-32">
        <motion.p
          {...fadeUp(0.1)}
          className="mb-5 text-[11px] font-medium uppercase tracking-wide-label text-gold md:text-xs"
        >
          ARTANOVA
        </motion.p>

        <motion.h1
          {...fadeUp(0.25)}
          className="font-display text-[2.75rem] leading-[1.1] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Where Imagination
          <br />
          <span className="text-gold">Becomes Art</span>
        </motion.h1>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-6 h-px w-16 bg-gold md:mt-8 md:w-20"
          aria-hidden
        />

        <motion.p
          {...fadeUp(0.5)}
          className="mt-6 max-w-lg text-sm leading-relaxed text-text-muted md:mt-8 md:text-base"
        >
          A curated world of original art — refined, intentional, and made for
          those who value craft over noise.
        </motion.p>

        <motion.a
          {...fadeUp(0.65)}
          href={LINKS.opensea}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-cta text-bg-black transition-colors hover:bg-gold-bright md:mt-12 md:px-8 md:py-4 md:text-[13px]"
        >
          VIEW COLLECTION ON OPENSEA
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.a>
      </div>
    </section>
  );
}
