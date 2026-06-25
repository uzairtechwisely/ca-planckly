"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";

import { useClientContext } from "@/components/ClientProviders";

type Status = "idle" | "submitting" | "success" | "error";

export function JoinModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { track, attribution } = useClientContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email.trim());
  }, [email, name]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  async function submit() {
    if (!canSubmit || status === "submitting") return;
    setStatus("submitting");
    setError(null);
    track("lead_submit_click");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        plan: "free",
        region: "US-CA",
        locale: "en-US",
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
    track("lead_submit_success");
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-[rgba(11,20,38,0.45)] backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute inset-0 grid place-items-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-[rgba(220,230,245,0.55)] bg-white shadow-[var(--plk-shadow-card)]"
              role="dialog"
              aria-modal="true"
              aria-label="Join Planckly"
            >
              <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[rgba(47,109,246,0.16)] blur-2xl" />
              <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[rgba(34,197,94,0.12)] blur-2xl" />

              <div className="relative p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center rounded-full bg-[var(--plk-success-50)] px-3 py-1 text-xs font-semibold text-[var(--plk-success-600)]">
                      Free Plan
                    </div>
                    <h3 className="mt-3 font-[var(--font-heading)] text-2xl font-extrabold text-[var(--plk-ink-900)]">
                      Join Planckly
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--plk-ink-600)]">
                      Leave your details and we’ll reach out as California launches. Phone is optional.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[var(--plk-border)] bg-white text-[var(--plk-ink-900)] transition hover:bg-[var(--plk-bg-50)]"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                {status === "success" ? (
                  <div className="mt-8 rounded-[26px] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.06)] p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 text-[var(--plk-success-600)]" aria-hidden />
                      <div>
                        <div className="font-[var(--font-heading)] text-base font-extrabold text-[var(--plk-ink-900)]">
                          You’re in.
                        </div>
                        <div className="mt-1 text-sm leading-6 text-[var(--plk-ink-600)]">
                          Thanks — we’ll follow up with next steps for the California launch.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--plk-brand-600)] text-sm font-semibold text-white transition hover:bg-[var(--plk-brand-700)]"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form
                    className="mt-8 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void submit();
                    }}
                  >
                    <Field label="Full name">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
                        placeholder="(555) 123-4567"
                        autoComplete="tel"
                      />
                    </Field>

                    {error ? (
                      <div className="rounded-2xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.06)] px-4 py-3 text-sm text-[rgba(185,28,28,0.92)]">
                        {error}
                      </div>
                    ) : null}

                    <button
                      type="submit"
                      disabled={!canSubmit || status === "submitting"}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--plk-brand-600)] text-sm font-semibold text-white transition hover:bg-[var(--plk-brand-700)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          <span>Submitting…</span>
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>

                    <div className="text-center text-xs leading-5 text-[var(--plk-ink-600)]">
                      By submitting, you agree to our{" "}
                      <a href="/terms" className="font-semibold text-[var(--plk-brand-600)]">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="font-semibold text-[var(--plk-brand-600)]">
                        Privacy Policy
                      </a>
                      .
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <div className="text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">{label}</div>
      {children}
    </label>
  );
}
