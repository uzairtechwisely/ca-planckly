"use client";

import { useMemo, useState } from "react";

import { type CampaignRoute, type CampaignStatus, type CampaignTemplateId } from "@/types/campaign";

const templates: CampaignTemplateId[] = [
  "seller-product-catalogue",
  "marketplace-seller",
  "marketplace-partner",
  "seller-shop-automation",
  "seller-shop-consultation",
  "brand-loyalty-campaigns",
  "brand-marketplace",
  "government-sector",
  "generic-fallback",
];

const statuses: CampaignStatus[] = ["live", "draft", "disabled"];

export function CampaignRoutesAdminClient({ initialRoutes }: { initialRoutes: CampaignRoute[] }) {
  const [routes, setRoutes] = useState<CampaignRoute[]>(initialRoutes);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newHostname, setNewHostname] = useState("");
  const [newTemplate, setNewTemplate] = useState<CampaignTemplateId>("seller-product-catalogue");
  const [newStatus, setNewStatus] = useState<CampaignStatus>("live");

  const canAdd = useMemo(() => newHostname.trim().length > 0, [newHostname]);

  async function refresh() {
    const res = await fetch("/api/ops/campaign-routes", { method: "GET" });
    const json = (await res.json().catch(() => null)) as
      | { ok: true; routes: CampaignRoute[] }
      | { ok: false; error: string }
      | null;
    if (!res.ok || !json || json.ok === false) {
      throw new Error((json && "error" in json && json.error) || "Failed to load routes");
    }
    setRoutes(json.routes);
  }

  async function addRoute() {
    if (!canAdd || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ops/campaign-routes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hostname: newHostname.trim(),
          activeTemplate: newTemplate,
          status: newStatus,
        }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true; route: CampaignRoute }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !json || json.ok === false) {
        setError((json && "error" in json && json.error) || "Failed to save route");
        return;
      }
      setNewHostname("");
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function saveRoute(route: CampaignRoute) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ops/campaign-routes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hostname: route.hostname,
          activeTemplate: route.activeTemplate,
          status: route.status,
        }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true; route: CampaignRoute }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !json || json.ok === false) {
        setError((json && "error" in json && json.error) || "Failed to save route");
        return;
      }
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function removeRoute(hostname: string) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ops/campaign-routes", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ hostname }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string }
        | null;
      if (!res.ok || !json || json.ok === false) {
        setError((json && "error" in json && json.error) || "Failed to delete route");
        return;
      }
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  function updateLocal(hostname: string, patch: Partial<CampaignRoute>) {
    setRoutes((prev) => prev.map((r) => (r.hostname === hostname ? { ...r, ...patch } : r)));
  }

  return (
    <div className="min-h-screen bg-[var(--plk-bg-50)] px-4 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-[32px] border border-[var(--plk-border)] bg-white p-6 shadow-[var(--plk-shadow-card)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-[var(--font-heading)] text-2xl font-extrabold text-[var(--plk-ink-900)]">
                Campaign Routes
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--plk-ink-600)]">
                Map hostnames to templates. Changes update Redis immediately.
              </div>
            </div>
            <button
              type="button"
              onClick={() => void refresh().catch(() => null)}
              disabled={busy}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--plk-border)] bg-white px-5 text-sm font-semibold text-[var(--plk-ink-900)] transition hover:bg-[var(--plk-bg-50)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Refresh
            </button>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.06)] px-4 py-3 text-sm text-[rgba(185,28,28,0.92)]">
              {error}
            </div>
          ) : null}

          <div className="mt-8 rounded-[28px] border border-[var(--plk-border)] bg-[var(--plk-bg-50)] p-5">
            <div className="grid gap-4 md:grid-cols-4">
              <input
                value={newHostname}
                onChange={(e) => setNewHostname(e.target.value)}
                placeholder="partner.planckly.com"
                className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)] md:col-span-2"
                autoComplete="off"
              />
              <select
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value as CampaignTemplateId)}
                className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
              >
                {templates.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as CampaignStatus)}
                className="h-12 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void addRoute()}
                disabled={!canAdd || busy}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--plk-brand-600)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--plk-brand-700)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add Domain
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-[var(--plk-border)] bg-white">
            <div className="grid grid-cols-12 gap-3 border-b border-[var(--plk-border)] bg-[var(--plk-bg-50)] px-5 py-3 text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">
              <div className="col-span-5">Hostname</div>
              <div className="col-span-4">Template</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            <div className="divide-y divide-[var(--plk-border)]">
              {routes.length ? (
                routes.map((r) => (
                  <div key={r.hostname} className="grid grid-cols-12 gap-3 px-5 py-4">
                    <div className="col-span-12 md:col-span-5">
                      <div className="text-sm font-semibold text-[var(--plk-ink-900)]">{r.hostname}</div>
                      <div className="mt-1 text-xs text-[var(--plk-ink-600)]">
                        {r.updatedAt ? `Updated ${new Date(r.updatedAt).toLocaleString()}` : "Not updated yet"}
                        {r.updatedBy ? ` • ${r.updatedBy}` : ""}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <select
                        value={r.activeTemplate}
                        onChange={(e) => updateLocal(r.hostname, { activeTemplate: e.target.value as CampaignTemplateId })}
                        className="h-11 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
                      >
                        {templates.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-12 md:col-span-2">
                      <select
                        value={r.status}
                        onChange={(e) => updateLocal(r.hostname, { status: e.target.value as CampaignStatus })}
                        className="h-11 w-full rounded-2xl border border-[var(--plk-border)] bg-white px-4 text-sm text-[var(--plk-ink-900)] outline-none transition focus:border-[rgba(47,109,246,0.45)] focus:ring-4 focus:ring-[rgba(47,109,246,0.12)]"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-12 flex items-center justify-end gap-2 md:col-span-1">
                      <button
                        type="button"
                        onClick={() => void saveRoute(r)}
                        disabled={busy}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--plk-brand-600)] px-4 text-xs font-semibold text-white transition hover:bg-[var(--plk-brand-700)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!window.confirm(`Delete route for ${r.hostname}?`)) return;
                          void removeRoute(r.hostname);
                        }}
                        disabled={busy}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--plk-border)] bg-white px-4 text-xs font-semibold text-[rgba(185,28,28,0.92)] transition hover:bg-[rgba(239,68,68,0.06)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-10 text-sm text-[var(--plk-ink-600)]">No routes yet.</div>
              )}
            </div>
          </div>

          <div className="mt-6 text-xs leading-6 text-[var(--plk-ink-600)]">
            Domain must be added to Vercel separately for it to serve traffic. This panel only controls template routing.
          </div>
        </div>
      </div>
    </div>
  );
}
