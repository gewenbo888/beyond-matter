"use client";

import { useEffect, useRef } from "react";

/**
 * Procedural starfield + slow nebula glow behind the entire page below the hero.
 * Pure 2D canvas (cheap, GPU not required). Reacts subtly to cursor.
 */
export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const mouse = { x: 0, y: 0 };

    type Star = { x: number; y: number; z: number; tw: number; ph: number };
    let stars: Star[] = [];

    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.floor((w * h) / 9000);
      stars = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        tw: 0.4 + Math.random() * 0.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };
    resize();

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("pointermove", onMove);
    const ro = new ResizeObserver(resize); ro.observe(c);

    let t = 0;
    const loop = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Nebula glow following the cursor — *the observer effect*.
      const gx = (mouse.x || w / 2);
      const gy = (mouse.y || h / 2);
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.55);
      g.addColorStop(0, "rgba(125,211,252,0.06)");
      g.addColorStop(0.35, "rgba(201,169,110,0.035)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Slow secondary glow (cosmic)
      const g2 = ctx.createRadialGradient(w * 0.78, h * 0.22, 0, w * 0.78, h * 0.22, Math.max(w, h) * 0.5);
      g2.addColorStop(0, "rgba(201,169,110,0.035)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 1.7 * s.tw + s.ph));
        const px = s.x + Math.sin(t * 0.25 + s.ph) * 0.4 * s.z;
        const py = s.y + Math.cos(t * 0.22 + s.ph) * 0.4 * s.z;
        const r = 0.5 + s.z * 1.4;
        ctx.fillStyle = `rgba(244,236,216,${a * (0.3 + s.z * 0.7)})`;
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
