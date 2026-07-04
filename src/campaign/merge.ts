function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function mergeCampaignContent<T extends Record<string, unknown>>(
  base: T,
  overrides: Record<string, unknown> | undefined,
): T {
  if (!overrides) return base;

  const out: Record<string, unknown> = { ...base };
  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = out[key];

    if (Array.isArray(overrideValue)) {
      out[key] = overrideValue;
      continue;
    }

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      out[key] = mergeCampaignContent(baseValue, overrideValue);
      continue;
    }

    out[key] = overrideValue;
  }

  return out as T;
}

