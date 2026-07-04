export function normalizeHostname(hostHeader: string | null | undefined) {
  const raw = (hostHeader ?? "").trim().toLowerCase();
  if (!raw) return "";

  const host = raw.includes(":") ? raw.split(":")[0] ?? "" : raw;
  const withoutWww = host.startsWith("www.") ? host.slice(4) : host;
  return withoutWww;
}

