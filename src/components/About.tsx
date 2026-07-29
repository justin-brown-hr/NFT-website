"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

function HexIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-11 w-11 text-gold"
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

function VisionGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
      <circle cx="24" cy="24" r="6" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
      <path d="M24 10 V14 M24 34 V38 M10 24 H14 M34 24 H38" />
    </g>
  );
}

function InnovationGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M24 12 L28 22 H36 L30 28 L32 38 L24 32 L16 38 L18 28 L12 22 H20 Z" />
    </g>
  );
}

function OwnershipGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <rect x="15" y="18" width="18" height="14" rx="1.5" />
      <path d="M19 18 V16 C19 13.2 21.2 11 24 11 C26.8 11 29 13.2 29 16 V18" />
      <circle cx="24" cy="25" r="1.5" fill="currentColor" stroke="none" />
    </g>
  );
}

function GrowthGlyph() {
  return (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M14 34 L20 24 L26 28 L34 14" />
      <path d="M28 14 H34 V20" />
    </g>
  );
}

const PILLARS = [
  {
    title: "Community",
    description: "People at the center — building, sharing, and growing together.",
    icon: <CommunityGlyph />,
  },
  {
    title: "Shared Vision",
    description: "One direction: meaningful connection and lasting impact.",
    icon: <VisionGlyph />,
  },
  {
    title: "Innovation",
    description: "Storytelling and new ideas that push the ecosystem forward.",
    icon: <InnovationGlyph />,
  },
  {
    title: "Digital Ownership",
    description: "NFTs as the key to access, participation, and belonging.",
    icon: <OwnershipGlyph />,
  },
  {
    title: "Long-Term Growth",
    description: "Built in phases — from digital world to real-world value.",
    icon: <GrowthGlyph />,
  },
] as const;

export default function About() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-black pt-24 md:pt-28">
      {/* Background portrait — right side, soft-blended edges */}
      <div
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

        <div className="absolute inset-0 bg-purple-primary/15 mix-blend-screen" />
        <div className="absolute -left-10 top-1/4 h-3/4 w-2/3 rounded-full bg-purple-glow/25 blur-[80px]" />
        <div className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-full bg-purple-primary/30 blur-[90px]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #08060B 0%, #08060B 8%, rgba(8,6,11,0.92) 22%, rgba(8,6,11,0.55) 40%, rgba(8,6,11,0.15) 62%, transparent 82%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #08060B 0%, transparent 18%, transparent 72%, #08060B 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[45%]"
          style={{
            background:
              "linear-gradient(90deg, #08060B 0%, rgba(8,6,11,0.7) 40%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,6,11,0.75) 0%, rgba(8,6,11,0.55) 35%, rgba(8,6,11,0.88) 70%, #08060B 100%)",
        }}
        aria-hidden
      />

      <div className="section-pad relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="max-w-xl lg:max-w-[52%]">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mb-4 text-[11px] font-medium uppercase tracking-wide-label text-gold md:text-xs"
          >
            ABOUT ARTANOVA
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
            className="font-display text-3xl leading-tight text-text-primary sm:text-4xl md:text-5xl"
          >
            More Than a Collection.
            <br />
            A Movement to Join.
          </motion.h1>

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
            Artwork is only the starting point. Artanova is a community-driven
            ecosystem where digital ownership creates real-life experiences,
            meaningful connections, and long-term value.
          </motion.p>

          <ul className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 md:mt-14">
            {PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.08 * i + 0.15,
                }}
                className="flex flex-col items-start"
              >
                <HexIcon>{pillar.icon}</HexIcon>
                <h3 className="mt-3 text-sm font-semibold text-gold md:text-base">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-sm leading-snug text-text-muted">
                  {pillar.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
