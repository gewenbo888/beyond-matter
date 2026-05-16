"use client";

import { useEffect, useRef } from "react";

/**
 * Conway's Game of Life, restarted from a seeded glider/spaceship soup.
 * Renders in ivory dots over the cosmic black background. Slow tick so the
 * pattern reads as procedural emergence, not arcade.
 */
export default function Life() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const CELL = 7;
    let cols = 0, rows = 0;
    let a: Uint8Array = new Uint8Array(0);
    let b: Uint8Array = new Uint8Array(0);

    const resize = () => {
      const w = c.clientWidth, h = c.clientHeight;
      c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / CELL);
      rows = Math.floor(h / CELL);
      a = new Uint8Array(cols * rows);
      b = new Uint8Array(cols * rows);
      for (let i = 0; i < a.length; i++) a[i] = Math.random() < 0.22 ? 1 : 0;
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    let last = 0;
    let raf = 0;
    let tick = 0;
    const step = (ts: number) => {
      raf = requestAnimationFrame(step);
      if (ts - last < 120) return;
      last = ts;
      tick++;

      // Update
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = (x + dx + cols) % cols;
            const ny = (y + dy + rows) % rows;
            n += a[ny * cols + nx];
          }
          const alive = a[y * cols + x] === 1;
          b[y * cols + x] = (alive ? (n === 2 || n === 3) : (n === 3)) ? 1 : 0;
        }
      }
      // Occasionally drop fresh seeds so the grid never settles flat.
      if (tick % 40 === 0) {
        for (let k = 0; k < 8; k++) {
          const cx = Math.floor(Math.random() * cols);
          const cy = Math.floor(Math.random() * rows);
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (Math.random() < 0.6) {
              const x = (cx + dx + cols) % cols;
              const y = (cy + dy + rows) % rows;
              b[y * cols + x] = 1;
            }
          }
        }
      }
      const tmp = a; a = b; b = tmp;

      // Draw
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
      ctx.fillStyle = "rgba(244,236,216,0.75)";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (a[y * cols + x]) {
            ctx.beginPath();
            ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
    raf = requestAnimationFrame(step);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="w-full h-full block" aria-hidden />;
}
