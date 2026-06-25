import "server-only";

import { Redis } from "@upstash/redis";

let cachedRedis: Redis | null = null;

export function getRedis() {
  if (cachedRedis) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  cachedRedis = new Redis({
    url,
    token,
  });
  return cachedRedis;
}

export function keyPrefix(prefix?: string) {
  const base = prefix ?? process.env.LEADS_KEY_PREFIX ?? "ca";
  return base.trim() || "ca";
}
