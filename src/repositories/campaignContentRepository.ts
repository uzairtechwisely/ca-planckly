import { z } from "zod";

import { getRedis } from "@/lib/redis";
import { campaignContentKey } from "@/redis/keys";
import { type CampaignContent, type CampaignTemplateId } from "@/types/campaign";

const campaignContentSchema = z.object({
  hostname: z.string().trim().min(1),
  template: z.string().trim().min(1),
  slug: z.string().trim().min(1).optional(),
  status: z.enum(["live", "draft", "disabled"]).optional(),
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

export async function getCampaignContent(
  hostname: string,
  template: CampaignTemplateId,
): Promise<CampaignContent | null> {
  const redis = getRedis();
  if (!redis) return null;

  const raw = await redis.get<string>(campaignContentKey(hostname, template));
  if (!raw) return null;

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }

  const parsed = campaignContentSchema.safeParse(json);
  if (!parsed.success) return null;
  if (!isTemplateId(parsed.data.template)) return null;

  const content = json as Record<string, unknown>;
  return {
    hostname: parsed.data.hostname,
    template: parsed.data.template,
    ...(content as Omit<CampaignContent, "hostname" | "template">),
  };
}

