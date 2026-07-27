"use client";

import { motion, useReducedMotion } from "framer-motion";

function HexIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12 text-gold"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 3 L42.5 13.5 L42.5 34.5 L24 45 L5.5 34.5 L5.5 13.5 Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      {children}
    </svg>
  );
}

function FeatherGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 14 C28 18 30 24 28 32 L20 32 C18 24 20 18 24 14 Z" fill="none" />
      <path d="M24 16 L24 32" />
      <path d="M21 20 L27 22" />
      <path d="M20.5 24 L27.5 26" />
      <path d="M20.5 28 L27.5 30" />
    </g>
  );
}

function CommunityGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
      <circle cx="20" cy="20" r="4.5" />
      <path d="M13 30 C13 26 16 24 20 24 C24 24 27 26 27 30" />
      <circle cx="29" cy="19" r="4" />
      <path d="M29 24 C33 24 35.5 26 35.5 29.5" />
    </g>
  );
}

function HourglassGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M18 15 H30" />
      <path d="M18 33 H30" />
      <path d="M19 15 C19 15 19 20 24 24 C29 28 29 33 29 33" />
      <path d="M29 15 C29 15 29 20 24 24 C19 28 19 33 19 33" />
      <path d="M22 29 H26" opacity="0.7" />
    </g>
  );
}

const FEATURES = [
  {
    title: "Original Art",
    description: "Handcrafted works, limited and intentional.",
    icon: <FeatherGlyph />,
  },
  {
    title: "Community",
    description: "A circle of collectors and creatives.",
    icon: <CommunityGlyph />,
  },
  {
    title: "Future-Ready",
    description: "Designed to grow with the brand.",
    icon: <HourglassGlyph />,
  },
] as const;

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-bg-black"
    >
      {/* Background portrait — right side, soft-blended edges */}
      <div
        id="vision"
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[55%]"
        aria-hidden
      >
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { scale: 1.06 }}
          whileInView={reduceMotion ? undefined : { scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait-about.jpg"
            alt=""
            className="h-full w-full object-cover object-[center_20%] md:object-center"
          />
        </motion.div>

        {/* Soft purple smoke behind / around subject */}
        <div className="absolute inset-0 bg-purple-primary/15 mix-blend-screen" />
        <div className="absolute -left-10 top-1/4 h-3/4 w-2/3 rounded-full bg-purple-glow/25 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-full bg-purple-primary/30 blur-[90px]" />

        {/* Feather into black — left edge (main blend) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #08060B 0%, #08060B 8%, rgba(8,6,11,0.92) 22%, rgba(8,6,11,0.55) 40%, rgba(8,6,11,0.15) 62%, transparent 82%)",
          }}
        />
        {/* Feather top & bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #08060B 0%, transparent 18%, transparent 72%, #08060B 100%)",
          }}
        />
        {/* Extra left soft mask for seamless bleed */}
        <div
          className="absolute inset-y-0 left-0 w-[45%]"
          style={{
            background:
              "linear-gradient(90deg, #08060B 0%, rgba(8,6,11,0.7) 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Mobile: darkened overlay so text stays readable over full-bleed image */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,6,11,0.75) 0%, rgba(8,6,11,0.55) 35%, rgba(8,6,11,0.88) 70%, #08060B 100%)",
        }}
        aria-hidden
      />

      <div className="section-pad relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="max-w-xl lg:max-w-[48%]">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mb-4 text-[11px] font-medium uppercase tracking-wide-label text-gold md:text-xs"
          >
            ABOUT ARTANOVA
          </motion.p>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
            className="font-display text-3xl leading-tight text-text-primary sm:text-4xl md:text-5xl"
          >
            Art That Inspires.
            <br />
            A Vision That Lasts.
          </motion.h2>

          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.25 }}
            className="mt-6 h-px w-14 origin-left bg-gold"
            aria-hidden
          />

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-text-primary/90 md:text-base"
          >
            Artanova is more than art. It is a vision of beauty, craft, and
            connection — curated with the care of a private gallery.
          </motion.p>

          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:mt-14">
            {FEATURES.map((feature, i) => (
              <motion.li
                key={feature.title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.12 * i + 0.15,
                }}
                className="flex flex-col items-start"
              >
                <HexIcon>{feature.icon}</HexIcon>
                <h3 className="mt-4 text-sm font-semibold text-gold md:text-base">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-text-muted">
                  {feature.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
