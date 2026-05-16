"use client";

import { useState, useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import { STR } from "@/lib/i18n";

type Props = { lang: Lang; onLang: (l: Lang) => void };

export default function Chrome({ lang, onLang }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md bg-ink/65 border-b border-ivory/[0.06]" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <span className="inline-block w-6 h-6 rounded-full border border-gold/70 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ivory" />
          </span>
          <span className="font-display text-[15px] tracking-tight">
            <span className={lang === "zh" ? "font-zh" : ""}>{STR.brand[lang]}</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-wide2 uppercase font-mono text-bone/75">
          <a href="#history" className="hover:text-ivory transition">{STR.nav.history[lang]}</a>
          <a href="#relations" className="hover:text-ivory transition">{STR.nav.relations[lang]}</a>
          <a href="#information" className="hover:text-ivory transition">{STR.nav.information[lang]}</a>
          <a href="#consciousness" className="hover:text-ivory transition">{STR.nav.consciousness[lang]}</a>
          <a href="#mathematics" className="hover:text-ivory transition">{STR.nav.mathematics[lang]}</a>
          <a href="#emergence" className="hover:text-ivory transition">{STR.nav.emergence[lang]}</a>
          <a href="#observer" className="hover:text-ivory transition">{STR.nav.observer[lang]}</a>
          <a href="#final" className="text-gold hover:text-flame transition">{STR.nav.final[lang]}</a>
        </nav>

        <button
          onClick={() => onLang(lang === "en" ? "zh" : "en")}
          className="font-mono text-[11px] tracking-wide2 uppercase border border-ivory/15 hover:border-gold/60 hover:text-gold transition px-3 py-1.5 rounded-full"
          aria-label="Toggle language"
        >
          {STR.ui.lang[lang]}
        </button>
      </div>
    </header>
  );
}
