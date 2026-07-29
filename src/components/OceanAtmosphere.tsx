"use client";

import { useEffect, useRef } from "react";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  alpha: number;
  phase: number;
};

/**
 * Atmospheric overlay — floating particles, light rays, water ripples.
 * Designed to sit on top of the hero image as one continuous scene.
 */
export default function OceanAtmosphere() {
  const reduceMotion = useSafeReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(55, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 2.2,
        speed: 0.12 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 0.28,
        alpha: 0.12 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      frame += 1;

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(frame * 0.01 + p.phase) * 0.12;
        if (p.y < -8) {
          p.y = height + 8;
          p.x = Math.random() * width;
        }
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;

        const pulse = 0.65 + Math.sin(frame * 0.03 + p.phase) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 190, 255, ${p.alpha * pulse})`;
        ctx.fill();

        if (p.r > 1.3) {
          ctx.beginPath();
          ctx.arc(p.x - p.r * 0.25, p.y - p.r * 0.25, p.r * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 240, 200, ${0.22 * pulse})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Light rays — blended into the scene */}
      <div
        className={`absolute inset-0 opacity-50 mix-blend-screen ${reduceMotion ? "" : "animate-ocean-rays"}`}
      >
        <div
          className="absolute -top-[20%] left-[18%] h-[140%] w-[14%] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(180, 150, 255, 0.28) 0%, rgba(232, 183, 92, 0.08) 40%, transparent 75%)",
            transform: "skewX(-12deg)",
          }}
        />
        <div
          className="absolute -top-[10%] left-[42%] h-[130%] w-[10%] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(232, 183, 92, 0.18) 0%, rgba(150, 120, 255, 0.06) 45%, transparent 70%)",
            transform: "skewX(-8deg)",
          }}
        />
        <div
          className="absolute -top-[15%] left-[58%] h-[135%] w-[12%] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(160, 200, 255, 0.16) 0%, rgba(107, 63, 160, 0.08) 50%, transparent 78%)",
            transform: "skewX(-14deg)",
          }}
        />
      </div>

      {/* Soft shimmer across the image */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 opacity-35 mix-blend-soft-light ${reduceMotion ? "" : "animate-ocean-shimmer"}`}
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 10%, rgba(200, 180, 255, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles */}
      {!reduceMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full mix-blend-screen" />
      )}

      {/* Ripple / reflection near the floor */}
      <div className="absolute inset-x-0 bottom-0 h-[45%]">
        <div
          className={`absolute inset-0 opacity-45 mix-blend-soft-light ${reduceMotion ? "" : "animate-ocean-ripple"}`}
          style={{
            background:
              "repeating-radial-gradient(ellipse 120% 40% at 50% 115%, transparent 0%, transparent 42%, rgba(180, 160, 255, 0.1) 46%, transparent 52%)",
          }}
        />
        <div
          className={`absolute inset-0 opacity-35 mix-blend-soft-light ${reduceMotion ? "" : "animate-ocean-ripple-slow"}`}
          style={{
            background:
              "repeating-radial-gradient(ellipse 100% 35% at 45% 125%, transparent 0%, transparent 38%, rgba(232, 183, 92, 0.07) 44%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}
