"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    highlight: true,
    items: ["Join the waitlist", "California-first onboarding", "Priority launch updates"],
  },
  {
    name: "Growth",
    price: "$29",
    cadence: "/month",
    highlight: false,
    items: ["Everything in Free", "Advanced features", "Email support"],
  },
  {
    name: "Pro",
    price: "$79",
    cadence: "/month",
    highlight: false,
    items: ["Everything in Growth", "Premium onboarding", "Priority support"],
  },
];

export function Pricing({ onJoin }: { onJoin: () => void }) {
  return (
    <section id="pricing" className="bg-[var(--plk-bg-50)] py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-[var(--plk-brand-600)] bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[var(--plk-brand-600)]">
            PRICING
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
            Simple plans in USD
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--plk-ink-600)]">
            A California launch experience with pricing shown in USD. We’ll refine packages as we iterate on
            the visuals and messaging.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              className={[
                "relative overflow-hidden rounded-[28px] border bg-white p-6 shadow-sm",
                plan.highlight
                  ? "border-[rgba(47,109,246,0.35)] shadow-[var(--plk-shadow-card)]"
                  : "border-[var(--plk-border)]",
              ].join(" ")}
            >
              {plan.highlight ? (
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[rgba(47,109,246,0.16)] blur-2xl" />
              ) : null}
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
                    {plan.name}
                  </div>
                  {plan.highlight ? (
                    <div className="rounded-full bg-[var(--plk-success-50)] px-3 py-1 text-xs font-semibold text-[var(--plk-success-600)]">
                      FREE TO START
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <div className="font-[var(--font-heading)] text-4xl font-extrabold text-[var(--plk-ink-900)]">
                    {plan.price}
                  </div>
                  <div className="pb-1 text-sm font-semibold text-[var(--plk-ink-600)]">{plan.cadence}</div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--plk-ink-600)]">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[rgba(34,197,94,0.12)] text-[var(--plk-success-600)]">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onJoin}
                  className={[
                    "mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition",
                    plan.highlight
                      ? "bg-[var(--plk-brand-600)] text-white hover:bg-[var(--plk-brand-700)]"
                      : "border border-[var(--plk-border)] bg-white text-[var(--plk-ink-900)] hover:bg-[var(--plk-bg-50)]",
                  ].join(" ")}
                >
                  Join Planckly
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

