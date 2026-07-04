"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

type UseCaseIcon = "shield-check" | "zap" | "sparkles";

function Icon({ icon }: { icon: UseCaseIcon }) {
  if (icon === "shield-check") return <ShieldCheck className="h-5 w-5" aria-hidden />;
  if (icon === "zap") return <Zap className="h-5 w-5" aria-hidden />;
  return <Sparkles className="h-5 w-5" aria-hidden />;
}

export function UseCasesGrid({
  eyebrow,
  heading,
  description,
  items,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  items: Array<{ title: string; description: string; icon: UseCaseIcon }>;
}) {
  return (
    <section id="use-cases" className="relative py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold tracking-[0.22em] text-[var(--plk-ink-600)]">{eyebrow}</div>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
              {heading}
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--plk-ink-600)] sm:text-base">{description}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-[28px] border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-[var(--plk-shadow-card)] transition hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--plk-bg-50)] text-[var(--plk-brand-700)]">
                  <Icon icon={item.icon} />
                </div>
                <div className="font-[var(--font-heading)] text-sm font-extrabold text-[var(--plk-ink-900)]">
                  {item.title}
                </div>
              </div>
              <div className="mt-3 text-sm leading-6 text-[var(--plk-ink-600)]">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

