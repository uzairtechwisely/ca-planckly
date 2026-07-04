"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export function ScrollShowcase({
  eyebrow,
  heading,
  description,
  steps,
}: {
  eyebrow: string;
  heading: string;
  description: string;
  steps: Step[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  const safeSteps = useMemo(() => (steps.length ? steps : []), [steps]);

  useEffect(() => {
    if (!safeSteps.length) return;

    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset["stepIndex"] ?? "0");
        if (Number.isFinite(idx)) setActive(idx);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.35, 0.5, 0.65] },
    );

    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, [safeSteps.length]);

  const activeStep = safeSteps[active];

  return (
    <section id="product" className="relative py-16 sm:py-20">
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

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-[28px] border border-[rgba(0,0,0,0.08)] bg-white shadow-[var(--plk-shadow-card)]">
                <div className="relative aspect-[16/10]">
                  <AnimatePresence mode="wait">
                    {activeStep ? (
                      <motion.div
                        key={activeStep.title}
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeStep.image.src}
                          alt={activeStep.image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 520px"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                {safeSteps.map((s, idx) => (
                  <div
                    key={s.title}
                    className={`h-1.5 flex-1 rounded-full transition ${
                      idx === active ? "bg-[var(--plk-brand-600)]" : "bg-[rgba(0,0,0,0.10)]"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {safeSteps.map((s, idx) => (
              <div
                key={s.title}
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                data-step-index={idx}
                className={`rounded-[28px] border px-6 py-6 transition ${
                  idx === active
                    ? "border-[rgba(47,109,246,0.28)] bg-[rgba(47,109,246,0.06)]"
                    : "border-[rgba(0,0,0,0.08)] bg-white"
                }`}
              >
                <div className="text-xs font-semibold tracking-[0.18em] text-[var(--plk-ink-600)]">
                  STEP {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
                  {s.title}
                </div>
                <div className="mt-2 text-sm leading-7 text-[var(--plk-ink-600)]">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

