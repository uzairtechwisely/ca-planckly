"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export function Hero({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(47,109,246,0.18) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[var(--plk-bg-50)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-12 h-[420px] w-[420px] rounded-full bg-[rgba(34,197,94,0.10)] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--plk-success-50)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--plk-success-600)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--plk-success-600)]" />
            <span>Built for California</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 font-[var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-5xl"
          >
            Join Planckly and{" "}
            <span className="relative inline-block text-[var(--plk-brand-600)]">
              grow with confidence
              <span className="pointer-events-none absolute -bottom-2 left-0 right-0 h-[10px] rounded-full bg-[rgba(47,109,246,0.18)]" />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 max-w-xl text-base leading-7 text-[var(--plk-ink-600)] sm:text-lg"
          >
            A premium, modern platform designed to help California teams move faster — with better tools,
            clearer insights, and a smooth onboarding experience. Free to start.
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
              Join Planckly (Free)
            </button>
            <a
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--plk-border)] bg-white px-6 text-sm font-semibold text-[var(--plk-ink-900)] transition hover:bg-[var(--plk-bg-50)]"
            >
              View pricing
            </a>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
              title="Trusted local"
              desc="Clear policies, transparent onboarding, and California-first messaging."
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" aria-hidden />}
              title="Fast setup"
              desc="A streamlined flow that feels great on mobile and desktop."
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" aria-hidden />}
              title="Premium experience"
              desc="Polished UI, smooth motion, and clean design language."
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[32px] bg-[linear-gradient(135deg,rgba(47,109,246,0.18),rgba(34,197,94,0.10))] blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--plk-border)] bg-white shadow-[var(--plk-shadow-card)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="https://joinnnow.plancklyimages.com/hero_img.avif"
                alt="Planckly"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              <MiniStat label="Coverage" value="CA first" />
              <MiniStat label="Setup" value="Minutes" />
              <MiniStat label="Cost" value="$0 to start" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[24px] border border-[var(--plk-border)] bg-white p-4 shadow-sm transition hover:shadow-[var(--plk-shadow-card)]">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--plk-bg-50)] text-[var(--plk-brand-700)]">
          {icon}
        </div>
        <div className="font-[var(--font-heading)] text-sm font-bold text-[var(--plk-ink-900)]">
          {title}
        </div>
      </div>
      <div className="mt-2 text-sm leading-6 text-[var(--plk-ink-600)]">{desc}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--plk-border)] bg-white p-3">
      <div className="text-[11px] font-semibold tracking-wide text-[var(--plk-ink-600)]">
        {label.toUpperCase()}
      </div>
      <div className="mt-1 font-[var(--font-heading)] text-sm font-extrabold text-[var(--plk-ink-900)]">
        {value}
      </div>
    </div>
  );
}
