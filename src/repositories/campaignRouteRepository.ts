import { z } from "zod";

import { getRedis } from "@/lib/redis";
import { campaignRouteKey } from "@/redis/keys";
import { type CampaignRoute, type CampaignTemplateId } from "@/types/campaign";

const campaignRouteSchema = z.object({
  hostname: z.string().trim().min(1),
  activeTemplate: z.string().trim().min(1),
  status: z.enum(["live", "draft", "disabled"]),
  updatedAt: z.string().trim().min(1).optional(),
  updatedBy: z.string().trim().min(1).optional(),
});

function isTemplateId(value: string): value is CampaignTemplateId {
  return (
    value === "generic-fallback" ||
    value === "marketplace-seller" ||
    value === "marketplace-partner" ||
    value === "seller-product-catalogue" ||
    value === "seller-shop-automation" ||
    value === "seller-shop-consultation" ||
    value === "brand-loyalty-campaigns" ||
    value === "brand-marketplace" ||
    value === "government-sector"
  );
}

export async function getCampaignRoute(hostname: string): Promise<CampaignRoute | null> {
  const redis = getRedis();
  if (!redis) return null;

  const raw = await redis.get<string>(campaignRouteKey(hostname));
  if (!raw) return null;

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }

  const parsed = campaignRouteSchema.safeParse(json);
  if (!parsed.success) return null;

  if (!isTemplateId(parsed.data.activeTemplate)) return null;

  return {
    hostname: parsed.data.hostname,
    activeTemplate: parsed.data.activeTemplate,
    status: parsed.data.status,
    updatedAt: parsed.data.updatedAt,
    updatedBy: parsed.data.updatedBy,
  };
}
