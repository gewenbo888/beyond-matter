"use client";

import { useEffect, useRef } from "react";

/**
 * Interferometer-style field that *only* shows itself where the cursor (or
 * touch) is near. Visually argues: the observer is part of what is seen.
 */
export default function ObserverField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0, w = 0, h = 0, t = 0;
    const m = { x: 0, y: 0, ax: 0, ay: 0, has: false };

    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.x = w / 2; m.y = h / 2; m.ax = m.x; m.ay = m.y;
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      m.x = e.clientX - r.left; m.y = e.clientY - r.top; m.has = true;
    };
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerleave", () => { m.has = false; });

    const loop = () => {
      raf = requestAnimationFrame(loop);
      t += 0.012;
      // ease toward the cursor
      m.ax += (m.x - m.ax) * 0.08;
      m.ay += (m.y - m.ay) * 0.08;

      ctx.clearRect(0, 0, w, h);

      const cx = m.ax, cy = m.ay;
      // concentric interference rings
      ctx.lineWidth = 1;
      for (let k = 0; k < 26; k++) {
        const r = (k * 18 + (t * 30) % 18);
        const a = Math.max(0, 0.18 - r / 700);
        ctx.strokeStyle = `rgba(125,211,252,${a})`;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      }
      // crosshair
      const cross = m.has ? 1 : 0.3;
      ctx.strokeStyle = `rgba(201,169,110,${0.5 * cross})`;
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy); ctx.lineTo(cx + 18, cy);
      ctx.moveTo(cx, cy - 18); ctx.lineTo(cx, cy + 18);
      ctx.stroke();

      // particle field that bends away from the cursor
      ctx.fillStyle = "rgba(244,236,216,0.55)";
      for (let i = 0; i < 220; i++) {
        const fx = ((i * 73.13) % w);
        const fy = ((i * 127.4 + t * 12) % h);
        const dx = fx - cx, dy = fy - cy;
        const d = Math.hypot(dx, dy) + 1;
        const push = Math.min(40, 1800 / (d * d));
        const px = fx + (dx / d) * push;
        const py = fy + (dy / d) * push;
        ctx.beginPath(); ctx.arc(px, py, 1, 0, Math.PI * 2); ctx.fill();
      }
    };
    loop();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); c.removeEventListener("pointermove", move); };
  }, []);

  return <canvas ref={ref} className="w-full h-full block" aria-label="An interactive observer field that reacts to your cursor." />;
}
