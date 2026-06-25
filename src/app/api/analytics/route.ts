import { NextResponse } from "next/server";
import { z } from "zod";

import { getRedis, keyPrefix } from "@/lib/redis";

const eventNameSchema = z.enum([
  "page_view",
  "cta_join_click",
  "lead_submit_click",
  "lead_submit_success",
]);

const requestSchema = z.object({
  event: eventNameSchema,
  visitorId: z.string().trim().min(10).max(80),
  consent: z.enum(["granted", "denied"]),
  ts: z.number().int().positive(),
  region: z.literal("US-CA"),
  locale: z.literal("en-US"),
  attribution: z
    .object({
      utm_source: z.string().trim().max(120).optional(),
      utm_medium: z.string().trim().max(120).optional(),
      utm_campaign: z.string().trim().max(120).optional(),
      utm_content: z.string().trim().max(120).optional(),
      utm_term: z.string().trim().max(120).optional(),
      gclid: z.string().trim().max(200).optional(),
      fbclid: z.string().trim().max(200).optional(),
      msclkid: z.string().trim().max(200).optional(),
      ttclid: z.string().trim().max(200).optional(),
      referrer: z.string().trim().max(500).optional(),
      landing_path: z.string().trim().max(300).optional(),
    })
    .optional(),
});

function yyyyMmDd(ts: number) {
  const d = new Date(ts);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation error" }, { status: 400 });
  }

  const data = parsed.data;
  const date = yyyyMmDd(data.ts);
  const prefix = keyPrefix(process.env.ANALYTICS_KEY_PREFIX ?? process.env.LEADS_KEY_PREFIX);
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ ok: true });
  }

  const uvKey = `${prefix}:analytics:uv:${date}`;
  const eventUvKey = `${prefix}:analytics:event:${data.event}:${date}`;
  const eventCountKey = `${prefix}:analytics:counts:${data.event}:${date}`;

  await redis.sadd(uvKey, data.visitorId);
  await redis.sadd(eventUvKey, data.visitorId);
  await redis.incr(eventCountKey);

  if (data.consent === "granted" && data.attribution) {
    const attrKey = `${prefix}:analytics:lastAttribution:${data.visitorId}`;
    await redis.hset(attrKey, {
      ...Object.fromEntries(
        Object.entries(data.attribution).map(([k, v]) => [k, v ?? ""]),
      ),
      updatedAt: new Date(data.ts).toISOString(),
    });
  }

  return NextResponse.json({ ok: true });
}
