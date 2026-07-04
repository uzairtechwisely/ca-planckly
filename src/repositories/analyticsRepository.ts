import "server-only";

import { getRedis, keyPrefix } from "@/lib/redis";
import {
  analyticsCampaignEventCountKey,
  analyticsCampaignEventUvKey,
  analyticsCampaignUvKey,
  analyticsEventCountKey,
  analyticsEventUvKey,
  analyticsLastAttributionKey,
  analyticsUvKey,
  type AnalyticsCampaignKey,
} from "@/redis/analyticsKeys";

export type RecordAnalyticsInput = {
  event: string;
  visitorId: string;
  consent: "granted" | "denied";
  ts: number;
  region?: string;
  locale?: string;
  campaign?: AnalyticsCampaignKey;
  attribution?: Record<string, string | undefined>;
};

function yyyyMmDd(ts: number) {
  const d = new Date(ts);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function recordAnalyticsEvent(input: RecordAnalyticsInput) {
  const redis = getRedis();
  if (!redis) return;

  const date = yyyyMmDd(input.ts);
  const prefix = keyPrefix(process.env.ANALYTICS_KEY_PREFIX ?? process.env.LEADS_KEY_PREFIX);

  await redis.sadd(analyticsUvKey(prefix, date), input.visitorId);
  await redis.sadd(analyticsCampaignUvKey(prefix, input.campaign, date), input.visitorId);

  await redis.sadd(analyticsEventUvKey(prefix, input.event, date), input.visitorId);
  await redis.sadd(analyticsCampaignEventUvKey(prefix, input.event, input.campaign, date), input.visitorId);

  await redis.incr(analyticsEventCountKey(prefix, input.event, date));
  await redis.incr(analyticsCampaignEventCountKey(prefix, input.event, input.campaign, date));

  if (input.consent !== "granted" || !input.attribution) return;

  const attrKey = analyticsLastAttributionKey(prefix, input.visitorId);
  await redis.hset(attrKey, {
    ...Object.fromEntries(Object.entries(input.attribution).map(([k, v]) => [k, v ?? ""])),
    region: input.region ?? "",
    locale: input.locale ?? "",
    campaign_hostname: input.campaign?.hostname ?? "",
    campaign_template: input.campaign?.template ?? "",
    campaign_slug: input.campaign?.slug ?? "",
    updatedAt: new Date(input.ts).toISOString(),
  });
}

