"use client";

import { motion } from "framer-motion";

import { useClientContext } from "@/components/ClientProviders";

export function CookieBanner() {
  const { consent, setConsent } = useClientContext();

  if (consent !== "unknown") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="pointer-events-auto w-full max-w-3xl rounded-[22px] border border-[var(--plk-border)] bg-white/90 p-4 shadow-[var(--plk-shadow-card)] backdrop-blur"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="font-[var(--font-heading)] text-sm font-semibold text-[var(--plk-ink-900)]">
              Cookies for analytics (optional)
            </div>
            <div className="text-sm leading-6 text-[var(--plk-ink-600)]">
              Accepting cookies helps us measure unique visitors and improve the experience. You can still use
              the site if you decline.
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="h-11 rounded-full border border-[var(--plk-border)] bg-white px-5 text-sm font-semibold text-[var(--plk-ink-900)] transition hover:bg-[var(--plk-bg-50)]"
            >
              No thanks
            </button>
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="h-11 rounded-full bg-[var(--plk-brand-600)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--plk-brand-700)]"
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

