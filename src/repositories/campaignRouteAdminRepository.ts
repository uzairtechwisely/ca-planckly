import { getRedis } from "@/lib/redis";
import { campaignRouteIndexKey, campaignRouteKey } from "@/redis/keys";
import { getCampaignRoute } from "@/repositories/campaignRouteRepository";
import { type CampaignRoute } from "@/types/campaign";

export async function listCampaignRoutes(): Promise<CampaignRoute[]> {
  const redis = getRedis();
  if (!redis) return [];

  const hostnames = await redis.smembers<string[]>(campaignRouteIndexKey());
  if (!hostnames?.length) return [];

  const routes = await Promise.all(hostnames.map((h) => getCampaignRoute(h)));
  return routes
    .filter((r): r is CampaignRoute => Boolean(r))
    .sort((a, b) => a.hostname.localeCompare(b.hostname));
}

export async function upsertCampaignRoute(route: CampaignRoute) {
  const redis = getRedis();
  if (!redis) return;

  const key = campaignRouteKey(route.hostname);
  await redis.set(key, JSON.stringify(route));
  await redis.sadd(campaignRouteIndexKey(), route.hostname);
}

export async function deleteCampaignRoute(hostname: string) {
  const redis = getRedis();
  if (!redis) return;

  await redis.del(campaignRouteKey(hostname));
  await redis.srem(campaignRouteIndexKey(), hostname);
}
