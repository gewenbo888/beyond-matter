"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionShell({ id, eyebrow, children, className = "" }: Props) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 md:px-10 ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] tracking-cinema uppercase text-gold/80 mb-8 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px bg-gold/60" />
          {eyebrow}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
