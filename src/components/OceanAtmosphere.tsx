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
  hue: number;
};

type Caustic = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  phase: number;
  drift: number;
};

type Ray = {
  x: number;
  width: number;
  angle: number;
  alpha: number;
  hue: number;
  phase: number;
};

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
    let caustics: Caustic[] = [];
    let rays: Ray[] = [];
    let canvasW = 0;
    let canvasH = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvasW = rect.width;
      canvasH = rect.height;
      canvas.width = Math.max(1, Math.floor(canvasW * dpr));
      canvas.height = Math.max(1, Math.floor(canvasH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // More particles, spread wider
      const count = Math.min(130, Math.floor((canvasW * canvasH) / 8000));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, canvasW),
        y: rand(0, canvasH),
        r: rand(0.7, 3.6),
        speed: rand(0.1, 0.7),
        drift: rand(-0.3, 0.3),
        alpha: rand(0.25, 0.9),
        phase: rand(0, Math.PI * 2),
        hue: Math.random() < 0.72 ? rand(170, 220) : rand(40, 52),
      }));

      // More caustics, larger and brighter
      const cCount = Math.min(18, Math.floor((canvasW * canvasH) / 28000));
      caustics = Array.from({ length: cCount }, () => ({
        x: rand(0, canvasW),
        y: rand(canvasH * 0.25, canvasH * 0.78),
        size: rand(55, 160),
        alpha: rand(0.08, 0.22),
        phase: rand(0, Math.PI * 2),
        drift: rand(-0.22, 0.22),
      }));

      // Canvas-drawn light rays
      rays = Array.from({ length: 6 }, (_, i) => ({
        x: 0.08 + i * 0.16 + rand(-0.04, 0.04),
        width: rand(0.05, 0.13),
        angle: rand(-18, -4),
        alpha: rand(0.12, 0.32),
        hue: Math.random() < 0.6 ? 195 : Math.random() < 0.5 ? 46 : 270,
        phase: rand(0, Math.PI * 2),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasW, canvasH);
      frame += 1;

      // ── 1. Canvas light rays ──────────────────────────────────────────────
      ctx.save();
      for (const ray of rays) {
        const pulse = 0.55 + Math.sin(frame * 0.014 + ray.phase) * 0.45;
        const x = ray.x * canvasW;
        const w = ray.width * canvasW;
        const skewOffset = Math.tan((ray.angle * Math.PI) / 180) * canvasH;

        const grd = ctx.createLinearGradient(x, 0, x, canvasH * 1.4);
        grd.addColorStop(0, `hsla(${ray.hue}, 85%, 72%, ${ray.alpha * pulse})`);
        grd.addColorStop(0.35, `hsla(${ray.hue}, 80%, 65%, ${ray.alpha * pulse * 0.55})`);
        grd.addColorStop(0.7, `hsla(${ray.hue}, 75%, 60%, ${ray.alpha * pulse * 0.18})`);
        grd.addColorStop(1, `hsla(${ray.hue}, 70%, 55%, 0)`);

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + w, 0);
        ctx.lineTo(x + w + skewOffset, canvasH * 1.4);
        ctx.lineTo(x + skewOffset, canvasH * 1.4);
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.globalAlpha = 1;
        ctx.fill();
      }
      ctx.restore();

      // ── 2. Caustics ───────────────────────────────────────────────────────
      for (const c of caustics) {
        c.x += c.drift + Math.sin(frame * 0.006 + c.phase) * 0.25;
        c.phase += 0.005;
        if (c.x < -c.size) c.x = canvasW + c.size;
        if (c.x > canvasW + c.size) c.x = -c.size;

        const pulse = 0.65 + Math.sin(frame * 0.016 + c.phase) * 0.35;
        const w = c.size * (1 + Math.sin(c.phase * 1.4) * 0.3);
        const h = w * (0.38 + Math.cos(c.phase * 0.8) * 0.12);

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(1, h / Math.max(w, 1));
        const cGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, w);
        cGrd.addColorStop(0, `rgba(77,184,217,${c.alpha * pulse * 2.2})`);
        cGrd.addColorStop(0.45, `rgba(77,184,217,${c.alpha * pulse * 1.1})`);
        cGrd.addColorStop(0.75, `rgba(122,212,240,${c.alpha * pulse * 0.4})`);
        cGrd.addColorStop(1, `rgba(77,184,217,0)`);
        ctx.beginPath();
        ctx.arc(0, 0, w, 0, Math.PI * 2);
        ctx.fillStyle = cGrd;
        ctx.fill();
        ctx.restore();
      }

      // ── 3. Bioluminescent particles ───────────────────────────────────────
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(frame * 0.009 + p.phase) * 0.18;
        if (p.y < -10) { p.y = canvasH + 10; p.x = rand(0, canvasW); }
        if (p.x < -10) p.x = canvasW + 10;
        if (p.x > canvasW + 10) p.x = -10;

        const pulse = 0.5 + Math.sin(frame * 0.028 + p.phase) * 0.5;
        const a = p.alpha * pulse;

        // large soft glow halo
        const haloR = p.r * 5.5;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        grd.addColorStop(0, `hsla(${p.hue}, 95%, 80%, ${a * 0.95})`);
        grd.addColorStop(0.3, `hsla(${p.hue}, 90%, 70%, ${a * 0.6})`);
        grd.addColorStop(0.65, `hsla(${p.hue}, 85%, 65%, ${a * 0.2})`);
        grd.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // bright solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 92%, ${Math.min(a * 1.3, 1)})`;
        ctx.fill();
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
    <div className="absolute inset-0 overflow-hidden" aria-hidden style={{ pointerEvents: "none" }}>

      {/* ── Deep ocean base — stronger teal presence ────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 90%, rgba(4,40,64,0.7) 0%, rgba(4,28,46,0.35) 55%, transparent 75%), " +
            "radial-gradient(ellipse 55% 40% at 50% 15%, rgba(8,18,36,0.5) 0%, transparent 60%)",
        }}
      />

      {/* ── CSS light rays — thick, visible, animated ───────────────────────── */}
      <div
        className={`absolute inset-0 mix-blend-screen ${reduceMotion ? "opacity-40" : "animate-nerina-rays opacity-70"}`}
      >
        {/* bold gold-aqua center beam */}
        <div
          className="absolute -top-[10%] left-[43%] h-[150%] w-[7%] origin-top"
          style={{
            background: "linear-gradient(180deg, rgba(232,183,92,0.38) 0%, rgba(77,184,217,0.18) 35%, transparent 68%)",
            transform: "skewX(-5deg)",
            filter: "blur(3px)",
          }}
        />
        {/* wide left aqua beam */}
        <div
          className="absolute -top-[18%] left-[18%] h-[145%] w-[14%] origin-top"
          style={{
            background: "linear-gradient(180deg, rgba(77,184,217,0.32) 0%, rgba(122,212,240,0.14) 40%, transparent 70%)",
            transform: "skewX(-16deg)",
            filter: "blur(5px)",
          }}
        />
        {/* right teal beam */}
        <div
          className="absolute -top-[12%] left-[60%] h-[135%] w-[11%] origin-top"
          style={{
            background: "linear-gradient(180deg, rgba(122,212,240,0.24) 0%, rgba(77,184,217,0.1) 42%, transparent 72%)",
            transform: "skewX(-11deg)",
            filter: "blur(5px)",
          }}
        />
        {/* far-left deep beam */}
        <div
          className="absolute -top-[22%] left-[5%] h-[140%] w-[8%] origin-top"
          style={{
            background: "linear-gradient(180deg, rgba(77,184,217,0.18) 0%, rgba(107,63,160,0.06) 50%, transparent 72%)",
            transform: "skewX(-20deg)",
            filter: "blur(7px)",
          }}
        />
        {/* far-right purple-teal accent */}
        <div
          className="absolute -top-[8%] left-[76%] h-[125%] w-[8%] origin-top"
          style={{
            background: "linear-gradient(180deg, rgba(139,92,246,0.22) 0%, rgba(77,184,217,0.1) 45%, transparent 70%)",
            transform: "skewX(-8deg)",
            filter: "blur(6px)",
          }}
        />
      </div>

      {/* ── Canvas — pointer-events re-enabled so clicks register ───────────── */}
      {!reduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full mix-blend-screen"
        />
      )}

      {/* ── Waterline shimmer — strong horizontal glow ──────────────────────── */}
      <div
        className={`absolute inset-x-0 mix-blend-soft-light ${reduceMotion ? "opacity-35" : "animate-nerina-shimmer opacity-60"}`}
        style={{
          top: "35%",
          height: "26%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(77,184,217,0.28) 30%, rgba(122,212,240,0.42) 52%, rgba(77,184,217,0.2) 78%, transparent 100%)",
          filter: "blur(18px)",
        }}
      />

      {/* ── Aqua glow burst — centrepiece identity mark ─────────────────────── */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full mix-blend-screen ${reduceMotion ? "opacity-25" : "animate-nerina-pulse opacity-35"}`}
        style={{
          top: "28%",
          width: "55vmin",
          height: "55vmin",
          background:
            "radial-gradient(circle, rgba(77,184,217,0.45) 0%, rgba(122,212,240,0.2) 40%, rgba(77,184,217,0.06) 70%, transparent 100%)",
          filter: "blur(32px)",
        }}
      />

      {/* ── Deep floor glow — anchors the scene ────────────────────────────── */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[52%] ${reduceMotion ? "" : "animate-nerina-depth"}`}
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 105%, rgba(4,40,64,0.75) 0%, rgba(4,28,46,0.35) 50%, transparent 80%)",
        }}
      />


    </div>
  );
}
