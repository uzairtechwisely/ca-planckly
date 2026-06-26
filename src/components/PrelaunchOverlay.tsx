"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { useClientContext } from "@/components/ClientProviders";

type Status = "idle" | "submitting" | "success" | "error";

type ConfettiPiece = {
  id: string;
  leftPct: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  drift: number;
  color: string;
};

const confettiPalette = [
  "rgba(47,109,246,0.95)",
  "rgba(34,197,94,0.95)",
  "rgba(236,72,153,0.95)",
  "rgba(250,204,21,0.95)",
  "rgba(168,85,247,0.95)",
  "rgba(14,165,233,0.95)",
];

function createConfetti(seed: number, count: number): ConfettiPiece[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  return Array.from({ length: count }).map((_, i) => {
    const r1 = rand();
    const r2 = rand();
    const r3 = rand();
    const r4 = rand();
    const r5 = rand();
    const r6 = rand();

    return {
      id: `${seed}-${i}`,
      leftPct: r1 * 100,
      size: Math.round(6 + r2 * 10),
      delay: r3 * 0.35,
      duration: 1.6 + r4 * 1.1,
      rotate: Math.round(r5 * 720) - 360,
      drift: (r6 - 0.5) * 220,
      color: confettiPalette[Math.floor(rand() * confettiPalette.length)]!,
    };
  });
}

function ConfettiBurst({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;
    const seed = Math.floor(Date.now() % 2147483647);
    setPieces(createConfetti(seed, 46));
  }, [active]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          aria-hidden
        >
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: "110vh",
                x: p.drift,
                rotate: p.rotate,
                opacity: 0.98,
              }}
              transition={{
                delay: p.delay,
                duration: p.duration,
                ease: [0.15, 0.75, 0.25, 1],
              }}
              className="absolute top-0 rounded-sm"
              style={{
                left: `${p.leftPct}%`,
                width: `${p.size}px`,
                height: `${Math.max(6, Math.round(p.size * 1.35))}px`,
                background: p.color,
                boxShadow: "0 10px 26px rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PrelaunchOverlay() {
  const { track, attribution } = useClientContext();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  const canSubmit = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);

  useEffect(() => {
    const t = window.setTimeout(() => setShowConfetti(false), 2400);
    return () => window.clearTimeout(t);
  }, []);

  async function submit() {
    if (!canSubmit || status === "submitting") return;
    setStatus("submitting");
    setError(null);
    track("prelaunch_voucher_click");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        leadType: "pre-launch",
        email: email.trim(),
        plan: "free",
        region: "US-CA",
        locale: "en-US",
        source: "prelaunch_voucher_100",
        utm: attribution
          ? {
              source: attribution.utm_source,
              medium: attribution.utm_medium,
              campaign: attribution.utm_campaign,
              content: attribution.utm_content,
              term: attribution.utm_term,
              gclid: attribution.gclid,
              fbclid: attribution.fbclid,
              msclkid: attribution.msclkid,
              ttclid: attribution.ttclid,
            }
          : undefined,
      }),
    });

    const json = (await res.json().catch(() => null)) as
      | { ok: true; leadId: string }
      | { ok: false; error: string }
      | null;

    if (!res.ok || !json || json.ok === false) {
      setStatus("error");
      setError((json && "error" in json && json.error) || "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    track("prelaunch_voucher_submit_success");
  }

  return (
    <>
      <ConfettiBurst active={showConfetti} />
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-[rgba(8,14,28,0.55)] backdrop-blur-md" />
        <div className="absolute inset-0 grid place-items-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.36, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[34px] border border-[rgba(220,230,245,0.42)] bg-[rgba(255,255,255,0.16)] shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Pre-launch voucher"
          >
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(47,109,246,0.28)] blur-3xl" />
            <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-[rgba(34,197,94,0.22)] blur-3xl" />

            <div className="relative p-6 sm:p-10">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[rgba(255,255,255,0.16)] text-white ring-1 ring-[rgba(255,255,255,0.2)]">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <div className="inline-flex items-center rounded-full bg-[rgba(255,255,255,0.16)] px-3 py-1 text-xs font-semibold tracking-wide text-white ring-1 ring-[rgba(255,255,255,0.18)]">
                    California pre-launch
                  </div>
                  <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    Thank you for your interest.
                  </h1>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[rgba(233,240,255,0.92)] sm:text-base">
                    Planckly is undergoing a brand new look. Leave your email to let us know you were here, and we’ll
                    send you a <span className="font-semibold text-white">$100 voucher*</span>.
                  </p>
                </div>
              </div>

              {status === "success" ? (
                <div className="mt-8 rounded-[28px] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 text-[rgba(134,239,172,0.95)]" aria-hidden />
                    <div>
                      <div className="font-[var(--font-heading)] text-base font-extrabold text-white">
                        You’re on the list.
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[rgba(233,240,255,0.9)]">
                        We’ll email your voucher and keep you posted as the California experience goes live.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submit();
                  }}
                >
                  <label className="block space-y-2">
                    <div className="text-xs font-semibold tracking-wide text-[rgba(233,240,255,0.9)]">Email</div>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-2xl border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.12)] px-4 text-sm text-white outline-none transition placeholder:text-[rgba(233,240,255,0.6)] focus:border-[rgba(255,255,255,0.35)] focus:ring-4 focus:ring-[rgba(47,109,246,0.16)]"
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </label>

                  {error ? (
                    <div className="rounded-2xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.14)] px-4 py-3 text-sm text-[rgba(254,226,226,0.95)]">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={!canSubmit || status === "submitting"}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-extrabold text-[rgba(11,20,38,0.96)] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:bg-[rgba(255,255,255,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <span>Send me $100 voucher</span>
                    )}
                  </button>

                  <div className="text-center text-xs leading-5 text-[rgba(233,240,255,0.78)]">
                    *Voucher is applied toward your monthly bill for using Planckly’s platform. By submitting, you agree
                    to our{" "}
                    <a href="/terms" className="font-semibold text-white underline underline-offset-4">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="font-semibold text-white underline underline-offset-4">
                      Privacy Policy
                    </a>
                    .
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

