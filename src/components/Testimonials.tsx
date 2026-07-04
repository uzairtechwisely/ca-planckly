"use client";

import { motion } from "framer-motion";

export function Testimonials({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: Array<{ quote: string; name: string; title: string; company: string }>;
}) {
  return (
    <section id="testimonials" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-[var(--plk-ink-600)]">{eyebrow}</div>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
              {heading}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {items.map((t, idx) => (
            <motion.figure
              key={`${t.name}:${t.company}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-[28px] border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[var(--plk-shadow-card)]"
            >
              <blockquote className="text-sm leading-7 text-[var(--plk-ink-600)]">“{t.quote}”</blockquote>
              <figcaption className="mt-5">
                <div className="font-[var(--font-heading)] text-sm font-extrabold text-[var(--plk-ink-900)]">
                  {t.name}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">
                  {t.title} · {t.company}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

