"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { STR, type Lang } from "@/lib/i18n";
import Chrome from "@/components/Chrome";
import SectionShell from "@/components/SectionShell";
import LayerExplorer from "@/components/LayerExplorer";

const HeroCanvas    = dynamic(() => import("@/components/HeroCanvas"),    { ssr: false });
const StarField     = dynamic(() => import("@/components/StarField"),     { ssr: false });
const RelationGraph = dynamic(() => import("@/components/RelationGraph"), { ssr: false });
const Life          = dynamic(() => import("@/components/Life"),          { ssr: false });
const ObserverField = dynamic(() => import("@/components/ObserverField"), { ssr: false });

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const fontZh = lang === "zh" ? "font-zh" : "";

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 0.4, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);

  return (
    <main id="top" className="relative">
      <StarField />
      <Chrome lang={lang} onLang={setLang} />

      {/* ───── HERO ───────────────────────────────────────────────────── */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
            <HeroCanvas />
          </motion.div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className={`font-mono text-[10px] tracking-cinema uppercase text-gold/85 mb-8 ${fontZh}`}
                >
                  {STR.hero.eyebrow[lang]}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.7 }}
                  className={`font-display ${fontZh} text-balance font-light leading-[1.04] tracking-tight text-[clamp(2.2rem,6.5vw,5.5rem)]`}
                >
                  <span className="block">{STR.hero.title_a[lang]}</span>
                  <span className="block">{STR.hero.title_b[lang]}</span>
                  <span className="block italic glyph-gold mt-1">{STR.hero.title_c[lang]}</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                  className="mt-14 flex flex-col items-center gap-3"
                >
                  <div className="divider animate-breathe" />
                  <div className={`font-mono text-[10px] tracking-cinema uppercase text-bone/55 ${fontZh}`}>
                    {STR.hero.scroll[lang]}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="pb-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
              {[
                ["Stone",     "石"],
                ["→ Atoms",   "→ 原子"],
                ["→ Fields",  "→ 场"],
                ["→ Graph",   "→ 图"],
              ].map(([en, zh], i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 + i * 0.18 }}
                  className="font-mono text-[10px] tracking-wide2 uppercase text-bone/55"
                >
                  {String(i + 1).padStart(2, "0")} · {lang === "zh" ? zh : en}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── 01 · HISTORY OF ABSTRACTION ─────────────────────────────── */}
      <SectionShell id="history" eyebrow={STR.history.eyebrow[lang]} className="pt-32 md:pt-48 pb-24">
        <h2 className={`font-display ${fontZh} text-balance font-light text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl`}>
          {STR.history.title[lang]}
        </h2>
        <p className={`${fontZh} mt-6 max-w-2xl text-bone/80 text-pretty leading-relaxed text-lg`}>
          {STR.history.sub[lang]}
        </p>

        <div className="mt-20 grid gap-px bg-ivory/[0.06]">
          {STR.eras.map((era, idx) => (
            <motion.article
              key={era.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: idx * 0.05 }}
              className="bg-ink/95 hover:bg-ink/80 transition-colors duration-500 grid md:grid-cols-[110px_1.1fr_1fr_0.9fr] gap-6 md:gap-10 py-10 md:py-14 px-6 md:px-10"
            >
              <div className="font-mono text-bone/55 text-sm tracking-wide2">
                <div className="text-gold">0{idx + 1}</div>
                <div className="mt-1">{era.years[lang]}</div>
              </div>
              <div>
                <div className={`font-display ${fontZh} text-2xl md:text-3xl tracking-tight`}>
                  {era.title[lang]}
                </div>
                <div className={`mt-2 text-bone/65 text-sm ${fontZh}`}>
                  {era.thinkers[lang]}
                </div>
              </div>
              <div className={`${fontZh} text-bone/80 leading-relaxed text-pretty`}>
                {era.body[lang]}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-cinema text-ash font-mono">ontology</div>
                  <div className={`mt-1 ${fontZh} text-ivory`}>{era.ontology[lang]}</div>
                  <div className={`mt-3 text-bone/60 text-sm ${fontZh}`}>{era.elements[lang]}</div>
                </div>
                <div className="eq mt-6 text-flame/85">{era.equation[lang]}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      {/* ───── 02 · FROM OBJECTS TO RELATIONS ──────────────────────────── */}
      <SectionShell id="relations" eyebrow={STR.relations.eyebrow[lang]} className="pt-32 pb-24">
        <div className="grid md:grid-cols-[1fr_1.05fr] gap-12 md:gap-16 items-center">
          <div>
            <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight`}>
              <span className="block">{STR.relations.title_a[lang]}</span>
              <span className="block italic glyph-gold">{STR.relations.title_b[lang]}</span>
            </h2>
            <p className={`${fontZh} mt-8 text-bone/85 leading-relaxed text-lg text-pretty`}>
              {STR.relations.body[lang]}
            </p>
            <div className={`${fontZh} mt-10 font-mono text-[11px] tracking-wide2 uppercase text-ash`}>
              ↓ {STR.relations.legend[lang]}
            </div>
          </div>
          <div className="aspect-square w-full hairline rounded-2xl overflow-hidden bg-black/30">
            <RelationGraph />
          </div>
        </div>
      </SectionShell>

      {/* ───── 03 · INFORMATION IS NOT THE END ─────────────────────────── */}
      <SectionShell id="information" eyebrow={STR.information.eyebrow[lang]} className="pt-32 pb-32">
        <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl`}>
          {STR.information.title[lang]}
        </h2>
        <p className={`${fontZh} mt-6 max-w-2xl text-bone/80 leading-relaxed text-lg text-pretty`}>
          {STR.information.body[lang]}
        </p>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-5 text-[11px] tracking-cinema uppercase font-mono">
          {(["matter","energy","information","structure","observation","unknown"] as const).map((k, i) => (
            <span key={k} className="flex items-center gap-6">
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`px-3.5 py-1.5 rounded-full border ${
                  k === "unknown"
                    ? "border-gold/60 text-gold"
                    : "border-ivory/15 text-bone/85"
                }`}
              >
                <span className={lang === "zh" ? "font-zh" : ""}>{STR.information.chain[k][lang]}</span>
              </motion.span>
              {i < 5 && <span className="text-ash">→</span>}
            </span>
          ))}
        </div>

        <div className="mt-20">
          <LayerExplorer lang={lang} />
        </div>
      </SectionShell>

      {/* ───── 04 · CONSCIOUSNESS ──────────────────────────────────────── */}
      <SectionShell id="consciousness" eyebrow={STR.consciousness.eyebrow[lang]} className="pt-32 pb-32">
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-16 items-center">
          <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight`}>
            <span className="block">{STR.consciousness.title_a[lang]}</span>
            <span className="block italic">{STR.consciousness.title_b[lang]}</span>
            <span className="block glyph-gold">{STR.consciousness.title_c[lang]}</span>
          </h2>
          <p className={`${fontZh} text-bone/85 leading-relaxed text-lg text-pretty`}>
            {STR.consciousness.body[lang]}
          </p>
        </div>

        {/* Recursive mirror — nested squares */}
        <div className="mt-24 flex justify-center">
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-ivory/15 rounded-sm"
                style={{
                  transform: `scale(${1 - i * 0.07}) rotate(${i * 4}deg)`,
                  borderColor: i === 0 ? "rgba(201,169,110,0.6)" : `rgba(244,236,216,${0.18 - i * 0.012})`,
                }}
                animate={{ rotate: [i * 4, i * 4 + 360] }}
                transition={{ duration: 80 + i * 14, repeat: Infinity, ease: "linear" }}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_24px_rgba(201,169,110,0.8)]" />
          </div>
        </div>
      </SectionShell>

      {/* ───── 05 · MATHEMATICAL UNIVERSE ──────────────────────────────── */}
      <SectionShell id="mathematics" eyebrow={STR.mathematics.eyebrow[lang]} className="pt-32 pb-32">
        <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl`}>
          <span className="block">{STR.mathematics.title[lang]}</span>
          <span className="block italic glyph-gold">{STR.mathematics.title_b[lang]}</span>
        </h2>
        <p className={`${fontZh} mt-6 max-w-2xl text-bone/80 leading-relaxed text-lg text-pretty`}>
          {STR.mathematics.body[lang]}
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-ivory/[0.06]">
          {[
            { eq: "Hom(A,B)",           label: { en: "Morphisms · arrows over objects", zh: "态射 · 在对象之上的箭头" } },
            { eq: "π₁(M)",              label: { en: "Topology · the holes that remain", zh: "拓扑 · 留下的空洞" } },
            { eq: "SU(3)×SU(2)×U(1)",   label: { en: "Symmetry · the standard model's signature", zh: "对称 · 标准模型的签名" } },
            { eq: "∇·E = ρ/ε₀",         label: { en: "Field equations · law as geometry",  zh: "场方程 · 法则即几何" } },
            { eq: "I(X;Y) = H(X) − H(X|Y)", label: { en: "Mutual information · what one tells about another", zh: "互信息 · 一者所告诉另一者" } },
            { eq: "ds² = g_{ij} dxⁱ dxʲ", label: { en: "Metric · the shape of space",     zh: "度规 · 空间的形状" } },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="bg-ink/95 hover:bg-ink/70 transition-colors px-8 py-10"
            >
              <div className="eq text-flame text-lg">{c.eq}</div>
              <div className={`${fontZh} mt-4 text-bone/75 text-sm leading-relaxed`}>{c.label[lang]}</div>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      {/* ───── 06 · EMERGENCE ──────────────────────────────────────────── */}
      <SectionShell id="emergence" eyebrow={STR.emergence.eyebrow[lang]} className="pt-32 pb-32">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16 items-center">
          <div>
            <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight`}>
              <span className="block">{STR.emergence.title[lang]}</span>
              <span className="block italic glyph-gold">{STR.emergence.title_b[lang]}</span>
            </h2>
            <p className={`${fontZh} mt-8 text-bone/85 leading-relaxed text-lg text-pretty`}>
              {STR.emergence.body[lang]}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-[11px] tracking-wide2 uppercase font-mono text-bone/55">
              <span>{lang === "zh" ? "生命游戏" : "Game of Life"}</span>
              <span>·</span>
              <span>{lang === "zh" ? "神经网络" : "Neural Nets"}</span>
              <span>·</span>
              <span>{lang === "zh" ? "蚁群" : "Ant Colonies"}</span>
              <span>·</span>
              <span>{lang === "zh" ? "经济" : "Economies"}</span>
              <span>·</span>
              <span>{lang === "zh" ? "互联网" : "Internet"}</span>
            </div>
          </div>
          <div className="aspect-square hairline rounded-2xl overflow-hidden bg-black/30">
            <Life />
          </div>
        </div>
      </SectionShell>

      {/* ───── 07 · OBSERVER ───────────────────────────────────────────── */}
      <SectionShell id="observer" eyebrow={STR.observer.eyebrow[lang]} className="pt-32 pb-32">
        <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-4xl`}>
          <span className="block">{STR.observer.title[lang]}</span>
          <span className="block italic glyph-gold">{STR.observer.title_b[lang]}</span>
        </h2>
        <p className={`${fontZh} mt-6 max-w-2xl text-bone/85 leading-relaxed text-lg text-pretty`}>
          {STR.observer.body[lang]}
        </p>
        <div className="mt-12 aspect-[16/9] hairline rounded-2xl overflow-hidden bg-black/30">
          <ObserverField />
        </div>
      </SectionShell>

      {/* ───── 08 · FINAL QUESTION ─────────────────────────────────────── */}
      <SectionShell id="final" eyebrow={STR.final.eyebrow[lang]} className="pt-40 pb-44">
        <h2 className={`font-display ${fontZh} font-light text-balance text-[clamp(2.2rem,6vw,5rem)] leading-[1.04] tracking-tight`}>
          <span className="block">{STR.final.title_a[lang]}</span>
          <span className="block">{STR.final.title_b[lang]}</span>
          <span className="block">{STR.final.title_c[lang]}</span>
          <span className="block italic glyph-gold mt-2">{STR.final.title_d[lang]}</span>
        </h2>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-px bg-ivory/[0.06]">
          {(["math","mind","rel","recur","unknown","inf"] as const).map((k, i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.08 }}
              className="group bg-ink/95 hover:bg-ink/70 transition px-8 py-12 text-center"
            >
              <div className="font-mono text-[10px] tracking-cinema text-ash uppercase">0{i + 1}</div>
              <div className={`${fontZh} mt-4 font-display text-2xl md:text-3xl tracking-tight italic group-hover:text-gold transition-colors`}>
                {STR.final.answers[k][lang]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="divider animate-breathe" />
          <p className={`${fontZh} font-display text-lg md:text-xl text-bone/85 italic text-balance`}>
            {STR.final.closing[lang]}
          </p>
        </div>
      </SectionShell>

      {/* ───── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="relative mt-24 border-t border-ivory/[0.06]">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className={`${fontZh} font-display italic text-2xl md:text-3xl leading-tight text-balance text-bone/90`}>
              {STR.footer.line[lang]}
            </div>
            <div className={`${fontZh} mt-4 text-bone/55 text-sm`}>{STR.footer.sub[lang]}</div>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wide2 text-ash flex flex-col gap-2">
            <a href="https://psyverse.fun" className="hover:text-ivory">Psyverse ↗</a>
            <a href="https://psyverse.fun/atlas.html" className="hover:text-ivory">Atlas ↗</a>
            <a href="https://github.com/gewenbo888/beyond-matter" className="hover:text-ivory">Source ↗</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
