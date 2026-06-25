"use client";

import React, { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

import { type Attribution } from "@/lib/attribution";
import {
  getServerSnapshot,
  getSnapshot,
  setConsent as setConsentStore,
  subscribe,
  type CookieConsent,
  updateAttribution,
} from "@/lib/clientState";

export type AnalyticsEventName =
  | "page_view"
  | "cta_join_click"
  | "lead_submit_click"
  | "lead_submit_success";

type AnalyticsPayload = {
  pathname?: string;
  search?: string;
};

type ClientContextValue = {
  consent: CookieConsent;
  setConsent: (value: Exclude<CookieConsent, "unknown">) => void;
  visitorId: string;
  attribution?: Attribution;
  track: (event: AnalyticsEventName, payload?: AnalyticsPayload) => void;
  updateAttributionFromUrl: (pathname: string, searchParams: URLSearchParams) => void;
};

const ClientContext = createContext<ClientContextValue | null>(null);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const { consent, visitorId, attribution } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setConsent = useCallback((value: Exclude<CookieConsent, "unknown">) => {
    setConsentStore(value);
  }, []);

  const updateAttributionFromUrl = useCallback((pathname: string, searchParams: URLSearchParams) => {
    const next: Attribution = {
      referrer: document.referrer || undefined,
      landing_path: `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
    };

    for (const [k, v] of searchParams.entries()) {
      if (!v.trim()) continue;
      if (k.startsWith("utm_") || k === "gclid" || k === "fbclid" || k === "msclkid" || k === "ttclid") {
        (next as Record<string, string>)[k] = v.trim();
      }
    }

    updateAttribution(next);
  }, []);

  const track = useCallback(
    (event: AnalyticsEventName, payload?: AnalyticsPayload) => {
      const effectiveConsent = consent === "granted" ? "granted" : "denied";
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event,
          visitorId,
          consent: effectiveConsent,
          ts: Date.now(),
          region: "US-CA",
          locale: "en-US",
          attribution: {
            ...(attribution ?? {}),
            landing_path:
              payload?.pathname !== undefined
                ? `${payload.pathname}${payload.search ?? ""}`
                : attribution?.landing_path,
            referrer: attribution?.referrer ?? (typeof document !== "undefined" ? document.referrer : undefined),
          },
        }),
      }).catch(() => {});
    },
    [attribution, consent, visitorId],
  );

  const value = useMemo<ClientContextValue>(
    () => ({
      consent,
      setConsent,
      visitorId,
      attribution,
      track,
      updateAttributionFromUrl,
    }),
    [attribution, consent, setConsent, track, updateAttributionFromUrl, visitorId],
  );

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}

export function useClientContext() {
  const ctx = useContext(ClientContext);
  if (!ctx) {
    throw new Error("ClientProviders missing");
  }
  return ctx;
}
