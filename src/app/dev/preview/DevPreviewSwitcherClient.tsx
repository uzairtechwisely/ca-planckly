"use client";

import { useMemo, useState } from "react";

type PreviewMode = "template" | "route";

const templates = [
  "seller-product-catalogue",
  "marketplace-seller",
  "marketplace-partner",
  "seller-shop-automation",
  "seller-shop-consultation",
  "brand-loyalty-campaigns",
  "brand-marketplace",
  "government-sector",
  "generic-fallback",
] as const;

export function DevPreviewSwitcherClient({
  initialHostname,
  initialMode,
  initialTemplate,
}: {
  initialHostname: string;
  initialMode: PreviewMode;
  initialTemplate: (typeof templates)[number];
}) {
  const [hostname, setHostname] = useState(initialHostname);
  const [mode, setMode] = useState<PreviewMode>(initialMode);
  const [template, setTemplate] = useState<(typeof templates)[number]>(initialTemplate);
  const canSubmit = useMemo(() => hostname.trim().length > 0, [hostname]);
  const [busy, setBusy] = useState(false);

  async function apply() {
    if (!canSubmit || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/dev/preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hostname: hostname.trim(),
          mode,
          template,
        }),
      });
      if (!res.ok) return;
      window.location.href = "/?no_prelaunch=1";
    } finally {
      setBusy(false);
    }
  }

  async function clear() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/dev/preview", { method: "DELETE" });
      if (!res.ok) return;
      window.location.href = "/?no_prelaunch=1";
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--plk-bg-50)] px-4 py-24">
      <div className="mx-auto w-full max-w-2xl rounded-[32px] border border-[var(--plk-border)] bg-white p-6 shadow-[var(--plk-shadow-card)] sm:p-8">
        <div className="font-[var(--font-heading)] text-2xl font-extrabold text-[var(--plk-ink-900)]">
          Dev Preview Switcher
        </div>
        <div className="mt-2 text-sm leading-6 text-[var(--plk-ink-600)]">
          Simulate hostname and template selection on Vercel preview deployments without creating Redis entries. This
          page is disabled in production.
        </div>

        <div className="mt-8 space-y-5">
          <label className="block space-y-2">
            <div className="text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">Hostname</div>
            <input
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
              placeholder="ca.planckly.com"
              autoComplete="off"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <div className="text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">Mode</div>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as PreviewMode)}
                className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
              >
                <option value="template">Force template (bypass route)</option>
                <option value="route">Use campaign route (Redis)</option>
              </select>
            </label>

            <label className="block space-y-2">
              <div className="text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">Template</div>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as (typeof templates)[number])}
                disabled={mode !== "template"}
                className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)] disabled:opacity-60"
              >
                {templates.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void apply()}
              disabled={!canSubmit || busy}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--plk-brand-600)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--plk-brand-700)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Apply & View Site
            </button>
            <button
              type="button"
              onClick={() => void clear()}
              disabled={busy}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[var(--plk-border)] bg-white px-6 text-sm font-semibold text-[var(--plk-ink-900)] transition hover:bg-[var(--plk-bg-50)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Clear Preview
            </button>
          </div>

          <div className="rounded-2xl border border-[var(--plk-border)] bg-[var(--plk-bg-50)] p-4 text-xs leading-6 text-[var(--plk-ink-600)]">
            Tip: This redirects to <span className="font-semibold">/?no_prelaunch=1</span> so you can scroll and inspect
            sections without the overlay.
          </div>
        </div>
      </div>
    </div>
  );
}

