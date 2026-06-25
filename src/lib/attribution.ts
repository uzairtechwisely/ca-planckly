export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  referrer?: string;
  landing_path?: string;
};

export function pickAttributionFromSearchParams(
  searchParams: URLSearchParams,
): Partial<Attribution> {
  const get = (k: string) => {
    const v = searchParams.get(k);
    return v && v.trim() ? v.trim() : undefined;
  };

  return {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    gclid: get("gclid"),
    fbclid: get("fbclid"),
    msclkid: get("msclkid"),
    ttclid: get("ttclid"),
  };
}

export function mergeAttribution(
  existing: Partial<Attribution> | undefined,
  incoming: Partial<Attribution> | undefined,
): Attribution | undefined {
  const next: Attribution = {
    ...(existing ?? {}),
    ...(incoming ?? {}),
  };

  for (const k of Object.keys(next) as (keyof Attribution)[]) {
    const v = next[k];
    if (!v) delete next[k];
  }

  return Object.keys(next).length ? next : undefined;
}

