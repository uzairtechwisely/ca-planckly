"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is Planckly available in California today?",
    a: "We’re building the California launch experience now. Join for free to get early access updates.",
  },
  {
    q: "Do I need to commit or pay to join?",
    a: "No. The Free Plan is for early access and updates. You can opt into paid plans later.",
  },
  {
    q: "Will you support other regions?",
    a: "Yes. After CA, we’ll replicate the same landing experience for Texas (tx.planckly.com) and then the UK (planckly.co.uk).",
  },
  {
    q: "What tracking do you do?",
    a: "We measure unique visits and the source of traffic to improve the landing page. Analytics cookies are optional.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-[var(--plk-brand-600)] bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[var(--plk-brand-600)]">
            FAQ
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={item.q}
                className="rounded-[26px] border border-[var(--plk-border)] bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                >
                  <div className="font-[var(--font-heading)] text-base font-bold text-[var(--plk-ink-900)]">
                    {item.q}
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--plk-border)] bg-white text-[var(--plk-ink-900)]">
                    <Plus
                      className={[
                        "h-5 w-5 transition",
                        isOpen ? "rotate-45 text-[var(--plk-brand-600)]" : "",
                      ].join(" ")}
                      aria-hidden
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm leading-7 text-[var(--plk-ink-600)]">
                        {item.a}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

