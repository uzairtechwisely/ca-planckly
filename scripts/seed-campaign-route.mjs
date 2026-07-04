import { Redis } from "@upstash/redis";

async function main() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN");
  }

  const hostname = (process.env.SEED_HOSTNAME || "ca.planckly.com").trim().toLowerCase();
  const activeTemplate = (process.env.SEED_TEMPLATE || "seller-product-catalogue").trim();
  const status = (process.env.SEED_STATUS || "live").trim();

  const redis = new Redis({ url, token });
  const key = `campaign-route:${hostname}`;
  const payload = { hostname, activeTemplate, status };

  await redis.set(key, payload);
  process.stdout.write(`Seeded ${key}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err?.stack || err}\n`);
  process.exit(1);
});

