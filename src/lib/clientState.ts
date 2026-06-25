import { ulid } from "ulid";

import { type Attribution, mergeAttribution } from "@/lib/attribution";

export type CookieConsent = "unknown" | "granted" | "denied";

export type ClientState = {
  consent: CookieConsent;
  visitorId: string;
  attribution?: Attribution;
};

type Listener = () => void;

let state: ClientState = {
  consent: "unknown",
  visitorId: "",
  attribution: undefined,
};

let initialized = false;
const listeners = new Set<Listener>();
const serverSnapshot: ClientState = { consent: "unknown", visitorId: "", attribution: undefined };

function emit() {
  for (const l of listeners) l();
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return undefined;
  const value = decodeURIComponent(match[1] ?? "");
  return value || undefined;
}

function setCookie(name: string, value: string, maxAgeSeconds?: number) {
  const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", "SameSite=Lax"];
  if (maxAgeSeconds) parts.push(`Max-Age=${maxAgeSeconds}`);
  document.cookie = parts.join("; ");
}

function readJson<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function ensureVisitorId(consent: Exclude<CookieConsent, "unknown">) {
  if (consent === "granted") {
    const cookieVid = getCookie("plk_vid");
    if (cookieVid) return cookieVid;
    const next = ulid();
    setCookie("plk_vid", next, 60 * 60 * 24 * 365);
    return next;
  }

  const sessionVid = sessionStorage.getItem("plk_vid");
  if (sessionVid) return sessionVid;
  const next = ulid();
  sessionStorage.setItem("plk_vid", next);
  return next;
}

function init() {
  if (initialized) return;
  if (typeof window === "undefined") return;
  initialized = true;

  const storedConsent = localStorage.getItem("plk_consent");
  const consent: CookieConsent =
    storedConsent === "granted" || storedConsent === "denied" ? storedConsent : "unknown";

  const effectiveConsent: Exclude<CookieConsent, "unknown"> =
    consent === "granted" ? "granted" : "denied";

  const visitorId = ensureVisitorId(effectiveConsent);
  const attribution = readJson<Attribution>("plk_attr");

  state = { consent, visitorId, attribution };
}

export function subscribe(listener: Listener) {
  init();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): ClientState {
  init();
  return state;
}

export function getServerSnapshot(): ClientState {
  return serverSnapshot;
}

export function setConsent(value: Exclude<CookieConsent, "unknown">) {
  init();
  state = {
    ...state,
    consent: value,
    visitorId: ensureVisitorId(value),
  };

  try {
    localStorage.setItem("plk_consent", value);
  } catch {}

  setCookie("plk_consent", value, 60 * 60 * 24 * 365);
  emit();
}

export function updateAttribution(next: Attribution) {
  init();
  const merged = mergeAttribution(state.attribution, next);
  if (sameAttribution(state.attribution, merged)) return;
  state = { ...state, attribution: merged };
  if (merged) writeJson("plk_attr", merged);
  emit();
}

function sameAttribution(a: Attribution | undefined, b: Attribution | undefined) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  const aKeys = Object.keys(a) as (keyof Attribution)[];
  const bKeys = Object.keys(b) as (keyof Attribution)[];
  if (aKeys.length !== bKeys.length) return false;
  for (const k of aKeys) {
    if (a[k] !== b[k]) return false;
  }
  return true;
}
