"use client";

import { useEffect, useRef } from "react";

type Ring = {
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  lineWidth: number;
  hue: number;
};

type ClickRipple = {
  x: number;
  y: number;
  rings: Ring[];
};

type ClickParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  hue: number;
  decay: number;
};

/**
 * Global click-effect overlay — fixed full-viewport canvas, z-9999.
 * pointer-events-none so it never blocks any UI interaction.
 *
 * On every click / tap spawns:
 *  1. 5 expanding water ripple rings (flattened ellipses, aqua + gold)
 *  2. 18-28 bioluminescent particles that scatter, drift, and fade
 */
export default function ClickRippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion directly — no hook dependency issues
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf        = 0;
    let W          = 0;
    let H          = 0;
    let ripples:   ClickRipple[]   = [];
    let particles: ClickParticle[] = [];

    const rand  = (a: number, b: number) => a + Math.random() * (b - a);
    const randI = (a: number, b: number) => Math.floor(rand(a, b));

    // ── resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      canvas.width  = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ── spawn ripple rings ─────────────────────────────────────────────────
    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        rings: [
          { radius: 2, maxRadius: 55,  alpha: 1,    speed: 5,   lineWidth: 2.5, hue: 46  },
          { radius: 2, maxRadius: 105, alpha: 0.9,  speed: 3.5, lineWidth: 2,   hue: 195 },
          { radius: 2, maxRadius: 165, alpha: 0.75, speed: 2.4, lineWidth: 1.6, hue: 195 },
          { radius: 2, maxRadius: 225, alpha: 0.55, speed: 1.7, lineWidth: 1.1, hue: 46  },
          { radius: 2, maxRadius: 295, alpha: 0.35, speed: 1.2, lineWidth: 0.7, hue: 195 },
        ],
      });
    };

    // ── spawn particle burst ───────────────────────────────────────────────
    const spawnParticles = (x: number, y: number) => {
      const count = randI(20, 30);
      for (let i = 0; i < count; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(1, 6);
        const hue   = Math.random() < 0.7 ? rand(170, 215) : rand(42, 52);
        particles.push({
          x,
          y,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed - rand(0.5, 2.5),
          r:     rand(1.5, 4),
          alpha: rand(0.8, 1),
          hue,
          decay: rand(0.014, 0.028),
        });
      }
    };

    // ── draw ───────────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Ripple rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const cr = ripples[i];
        let done = true;

        for (const ring of cr.rings) {
          if (ring.alpha < 0.005) continue;
          done = false;

          ring.radius += ring.speed;
          ring.speed  *= 0.972;
          ring.alpha  *= 0.962;

          const a = ring.alpha * Math.max(0, 1 - ring.radius / ring.maxRadius);
          if (a < 0.004) continue;

          const gold = ring.hue === 46;
          ctx.save();
          ctx.shadowColor = gold ? `rgba(232,183,92,${a * 0.7})` : `rgba(77,184,217,${a * 0.7})`;
          ctx.shadowBlur  = 14;
          ctx.beginPath();
          ctx.ellipse(cr.x, cr.y, ring.radius, ring.radius * 0.32, 0, 0, Math.PI * 2);
          ctx.strokeStyle = gold ? `rgba(232,183,92,${a})` : `rgba(77,184,217,${a})`;
          ctx.lineWidth   = ring.lineWidth;
          ctx.stroke();
          ctx.restore();
        }

        if (done) ripples.splice(i, 1);
      }

      // Particle burst
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x     += p.vx;
        p.y     += p.vy;
        p.vx    *= 0.92;
        p.vy    *= 0.92;
        p.vy    += 0.07;   // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        const a = Math.max(0, p.alpha);

        // glow halo
        const hr  = p.r * 5;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, hr);
        grd.addColorStop(0,   `hsla(${p.hue}, 95%, 82%, ${a * 0.95})`);
        grd.addColorStop(0.35,`hsla(${p.hue}, 90%, 72%, ${a * 0.5})`);
        grd.addColorStop(1,   `hsla(${p.hue}, 85%, 65%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, hr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // solid core with bloom
        ctx.save();
        ctx.shadowColor = `hsla(${p.hue}, 100%, 80%, ${a})`;
        ctx.shadowBlur  = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 94%, ${a})`;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    // ── events ─────────────────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      spawnRipple(e.clientX, e.clientY);
      spawnParticles(e.clientX, e.clientY);
    };

    const onTouch = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        spawnRipple(t.clientX, t.clientY);
        spawnParticles(t.clientX, t.clientY);
      }
    };

    resize();
    draw();

    window.addEventListener("resize",     resize);
    window.addEventListener("click",      onClick);
    window.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("click",      onClick);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []); // empty deps — runs once on mount, cleans up on unmount

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
