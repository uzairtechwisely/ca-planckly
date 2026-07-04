"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroBanner({
  badge,
  headingPrefix,
  headingHighlight,
  headingSuffix,
  subheading,
  primaryCtaLabel,
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
  trust,
  onJoin,
}: {
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  subheading: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: { src: string; alt: string };
  trust: Array<{ label: string; value: string }>;
  onJoin: () => void;
}) {
  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(47,109,246,0.14),transparent_55%),radial-gradient(circle_at_90%_30%,rgba(34,197,94,0.12),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,rgba(47,109,246,0.14)_1px,transparent_0)] [background-size:26px_26px]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--plk-success-50)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--plk-success-600)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--plk-success-600)]" />
              <span>{badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-5 font-[var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-6xl"
            >
              {headingPrefix}{" "}
              <span className="relative inline-block text-[var(--plk-brand-600)]">
                {headingHighlight}
                <span className="pointer-events-none absolute -bottom-2 left-0 right-0 h-[10px] rounded-full bg-[rgba(47,109,246,0.18)]" />
              </span>
              {headingSuffix}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-5 max-w-xl text-base leading-7 text-[var(--plk-ink-600)] sm:text-lg"
            >
              {subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={onJoin}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--plk-brand-600)] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--plk-brand-700)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--plk-brand-600)] focus-visible:ring-offset-2"
              >
                {primaryCtaLabel}
              </button>
              <a
                href={secondaryCtaHref}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white/70 px-6 text-sm font-semibold text-[var(--plk-ink-900)] backdrop-blur transition hover:bg-white"
              >
                {secondaryCtaLabel}
              </a>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {trust.map((stat) => (
                <div
                  key={`${stat.label}:${stat.value}`}
                  className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white/70 p-3 backdrop-blur"
                >
                  <div className="text-[11px] font-semibold tracking-wide text-[var(--plk-ink-600)]">
                    {stat.label.toUpperCase()}
                  </div>
                  <div className="mt-1 font-[var(--font-heading)] text-sm font-extrabold text-[var(--plk-ink-900)]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-[linear-gradient(135deg,rgba(47,109,246,0.18),rgba(34,197,94,0.10))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-[rgba(0,0,0,0.08)] bg-white shadow-[var(--plk-shadow-card)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

