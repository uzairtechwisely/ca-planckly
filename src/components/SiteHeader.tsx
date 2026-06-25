"use client";

import Image from "next/image";
import { Menu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function SiteHeader({
  onJoin,
}: {
  onJoin: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="pointer-events-auto w-full max-w-6xl rounded-[999px] border border-[var(--plk-border)] bg-white/85 px-3 py-2 shadow-[var(--plk-shadow-header)] backdrop-blur"
      >
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-3 pl-2">
            <div className="relative h-9 w-28">
              <Image
                src="https://joinnnow.plancklyimages.com/Logo.png"
                alt="Planckly"
                fill
                sizes="112px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onJoin}
              className="group relative inline-flex h-11 items-center gap-3 rounded-full bg-[var(--plk-brand-600)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--plk-brand-700)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--plk-brand-600)] focus-visible:ring-offset-2"
            >
              <span>Join Planckly</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--plk-brand-700)] transition group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </div>
          <div className="flex justify-end pr-1">
            <button
              type="button"
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--plk-border)] bg-white/70 text-[var(--plk-ink-900)] transition hover:bg-[var(--plk-bg-50)]"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
