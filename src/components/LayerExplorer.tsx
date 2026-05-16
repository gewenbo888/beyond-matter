"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STR, type Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function LayerExplorer({ lang }: Props) {
  const layers = STR.layerSet;
  const [i, setI] = useState(0);
  const layer = layers[i];

  // Visual density falls as we descend the layers.
  const density = useMemo(() => Math.max(8, Math.floor(160 * Math.pow(0.6, i))), [i]);
  const dots = useMemo(
    () =>
      Array.from({ length: density }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 0.5 + Math.random() * 1.6,
        o: 0.2 + Math.random() * 0.6,
      })),
    [density]
  );

  return (
    <div className="hairline rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-gradient-to-br from-[#0c0c14] to-black overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={layer.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {dots.map((d, k) => (
                <span
                  key={k}
                  className="absolute rounded-full bg-ivory"
                  style={{
                    left: `${d.x}%`,
                    top: `${d.y}%`,
                    width: d.s,
                    height: d.s,
                    opacity: d.o * (1 - i * 0.1),
                    boxShadow: i >= 3 ? `0 0 ${4 + d.s}px rgba(125,211,252,${0.5 * d.o})` : undefined,
                  }}
                />
              ))}
              {/* Lines appear at the "structure" layer */}
              {i >= 3 && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {dots.slice(0, 40).map((d, k) => {
                    const e = dots[(k + 7) % dots.length];
                    return (
                      <line
                        key={k}
                        x1={d.x} y1={d.y} x2={e.x} y2={e.y}
                        stroke="rgba(125,211,252,0.18)"
                        strokeWidth={0.08}
                      />
                    );
                  })}
                </svg>
              )}
              {/* At layer 4+ (observation) the field carries a faint crosshair. */}
              {i >= 4 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-px w-1/2 bg-gold/40" />
                  <div className="w-px h-1/2 bg-gold/40 absolute" />
                </div>
              )}
              {/* At the unknown layer, fade almost entirely. */}
              {i >= 5 && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                  <div className="font-display text-7xl text-bone/40 italic">?</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-cinema text-bone/50 font-mono">
            {STR.ui.layer[lang]} {String(i + 1).padStart(2, "0")} {STR.ui.of[lang]} 0{layers.length}
          </div>
        </div>

        <div className="p-8 md:p-10 flex flex-col gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-cinema text-bone/55">
              {STR.layers.title[lang]}
            </div>
            <div className="font-mono text-[10px] tracking-wide2 text-ash mt-1">
              {STR.layers.sub[lang]}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={layer.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <div className={`font-display ${lang === "zh" ? "font-zh" : ""} text-4xl md:text-5xl tracking-tight leading-[1.05]`}>
                {layer.label[lang]}
              </div>
              <p className={`mt-4 ${lang === "zh" ? "font-zh" : ""} text-bone/85 text-pretty leading-relaxed`}>
                {layer.caption[lang]}
              </p>
              <div className={`mt-3 text-xs ${lang === "zh" ? "font-zh" : "font-mono"} text-ash`}>
                {layer.thinker[lang]}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-6">
            <input
              type="range"
              min={0}
              max={layers.length - 1}
              step={1}
              value={i}
              onChange={(e) => setI(Number(e.target.value))}
              className="w-full accent-[#c9a96e]"
              aria-label="Reality layer"
            />
            <div className="mt-3 flex justify-between text-[10px] font-mono uppercase tracking-wide2 text-ash">
              {layers.map((l, k) => (
                <button
                  key={l.key}
                  onClick={() => setI(k)}
                  className={`transition ${k === i ? "text-ivory" : "hover:text-bone/85"}`}
                >
                  {l.label[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
