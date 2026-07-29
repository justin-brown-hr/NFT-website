"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { LINKS } from "@/lib/site";

const PILLARS = [
  {
    title: "Real-Life Experiences",
    description:
      "Travel, events, and shared adventures that bring members together beyond the screen.",
  },
  {
    title: "Meaningful Connections",
    description:
      "A community bound by creativity, innovation, and the will to build something lasting.",
  },
  {
    title: "Lasting Value",
    description:
      "A path toward participation in real-world assets and projects — value that outlives a drop.",
  },
] as const;

export default function FutureVision() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-black pt-24 md:pt-28">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-primary/15 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-navy/50 blur-[110px]"
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
            FUTURE VISION
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
            className="font-display text-3xl leading-tight text-text-primary sm:text-4xl md:text-5xl"
          >
            Bigger Than an NFT.
            <br />
            Built for What Comes Next.
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2 }}
            className="mx-auto mt-6 h-px w-14 origin-center bg-gold"
            aria-hidden
          />

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.15 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-text-muted md:text-base"
          >
            Artanova’s long-term goal is a community-driven ecosystem where digital
            ownership creates real-life experiences, meaningful connections, and
            lasting value. The artwork opens the door — the community builds what
            lies beyond it.
          </motion.p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-20">
          {PILLARS.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.1 * i,
              }}
              className="text-center sm:text-left"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide-label text-gold">
                0{i + 1}
              </p>
              <h2 className="mt-3 font-display text-xl text-text-primary md:text-2xl">
                {pillar.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {pillar.description}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.2 }}
          className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:mt-20"
        >
          <Link
            href="/journey"
            className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-cta text-bg-black transition-colors hover:bg-gold-bright md:px-8 md:py-4 md:text-[13px]"
          >
            See the Journey
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium uppercase tracking-wide-label text-text-muted transition-colors hover:text-gold md:text-[13px]"
          >
            Join the Community
          </a>
        </motion.div>
      </div>
    </section>
  );
}
