import "server-only";

import { ulid } from "ulid";

import { getRedis, keyPrefix } from "@/lib/redis";
import {
  leadDedupKey,
  leadKey,
  leadsByCreatedAtCampaignKey,
  leadsByCreatedAtKey,
  leadsPrelaunchByCreatedAtCampaignKey,
} from "@/redis/leadsKeys";

export type SaveLeadInput = {
  leadType: "join" | "pre-launch" | string;
  hostname: string;
  template: string;
  slug?: string;
  region?: string;
  country?: string;
  locale?: string;
  plan?: string;
  source?: string;
  name?: string;
  email: string;
  phone?: string;
  utm?: Record<string, string | undefined>;
  userAgent?: string;
};

export type SaveLeadResult = {
  leadId: string;
  deduped: boolean;
};

function parsePositiveInt(value: string | undefined) {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return n;
}

function dedupWindowSeconds() {
  return parsePositiveInt(process.env.LEAD_DEDUP_WINDOW_SECONDS);
}

export async function saveLead(input: SaveLeadInput): Promise<SaveLeadResult> {
  const leadId = ulid();
  const now = Date.now();
  const prefix = keyPrefix(process.env.LEADS_KEY_PREFIX);
  const redis = getRedis();
  if (!redis) return { leadId, deduped: false };

  const hostname = input.hostname.trim().toLowerCase();
  const template = input.template.trim().toLowerCase();
  const normalizedEmail = input.email.trim().toLowerCase();

  const dedupKey = leadDedupKey(prefix, hostname, template, normalizedEmail);
  const existingLeadKey = await redis.get<string>(dedupKey);
  if (existingLeadKey) {
    const existingId = existingLeadKey.split(":").pop() ?? "";
    if (input.leadType === "pre-launch") {
      await redis.hset(existingLeadKey, { prelaunchVoucherRequestedAt: new Date(now).toISOString() });
      await redis.zadd(leadsPrelaunchByCreatedAtCampaignKey(prefix, hostname, template), {
        score: now,
        member: existingLeadKey,
      });
    }

    return { leadId: existingId || leadId, deduped: true };
  }

  const leadHashKey = leadKey(prefix, hostname, template, now, leadId);
  const createdAt = new Date(now).toISOString();

  await redis.hset(leadHashKey, {
    leadId,
    leadType: input.leadType,
    hostname,
    template,
    slug: input.slug ?? "",
    email: normalizedEmail,
    name: input.name?.trim() ?? "",
    phone: input.phone?.trim() ?? "",
    plan: input.plan ?? "",
    region: input.region ?? "",
    country: input.country ?? "",
    locale: input.locale ?? "",
    source: input.source ?? "",
    userAgent: input.userAgent ?? "",
    prelaunchVoucherRequestedAt: input.leadType === "pre-launch" ? createdAt : "",
    createdAt,
    utmJson: input.utm ? JSON.stringify(input.utm) : "",
  });

  await redis.zadd(leadsByCreatedAtKey(prefix), { score: now, member: leadHashKey });
  await redis.zadd(leadsByCreatedAtCampaignKey(prefix, hostname, template), { score: now, member: leadHashKey });
  if (input.leadType === "pre-launch") {
    await redis.zadd(leadsPrelaunchByCreatedAtCampaignKey(prefix, hostname, template), { score: now, member: leadHashKey });
  }

  const ttl = dedupWindowSeconds();
  if (ttl) {
    await redis.set(dedupKey, leadHashKey, { ex: ttl });
  } else {
    await redis.set(dedupKey, leadHashKey);
  }

  return { leadId, deduped: false };
}

