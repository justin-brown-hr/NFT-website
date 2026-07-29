"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { PHASES } from "@/lib/site";

export default function Journey() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-black pt-24 md:pt-28">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-purple-primary/10 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-[360px] w-[360px] rounded-full bg-navy/60 blur-[120px]"
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
            THE JOURNEY
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
            className="font-display text-3xl text-text-primary sm:text-4xl md:text-5xl"
          >
            Built in Three Phases
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.12 }}
            className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-muted md:text-base"
          >
            NFTs are not the final product — they are the key that connects
            members to the Artanova ecosystem at every stage.
          </motion.p>
        </div>

        <ol className="relative mx-auto mt-14 max-w-3xl md:mt-20">
          <div
            className="pointer-events-none absolute left-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-transparent md:left-8"
            aria-hidden
          />

          {PHASES.map((phase, i) => (
            <motion.li
              key={phase.phase}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : 0.1 * i,
              }}
              className="relative grid grid-cols-[2.3rem_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-[4rem_1fr] md:gap-8 md:pb-16"
            >
              <div className="flex justify-center pt-0.5">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-bg-black text-[11px] font-semibold text-gold md:h-10 md:w-10 md:text-xs">
                  {phase.phase}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide-label text-gold">
                  Phase {phase.phase}
                </p>
                <h2 className="mt-2 font-display text-2xl text-text-primary md:text-3xl">
                  {phase.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-[15px]">
                  {phase.summary}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
