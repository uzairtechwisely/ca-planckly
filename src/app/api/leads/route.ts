import { NextResponse } from "next/server";
import { ulid } from "ulid";
import { z } from "zod";

import { getRedis, keyPrefix } from "@/lib/redis";

const leadTypeSchema = z.enum(["join", "pre-launch"]);

const createLeadSchema = z
  .object({
    leadType: leadTypeSchema.default("join"),
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().max(120),
    phone: z.string().trim().min(7).max(30).optional().or(z.literal("")),
    plan: z.literal("free").default("free"),
    locale: z.literal("en-US").default("en-US"),
    region: z.literal("US-CA").default("US-CA"),
    source: z.string().trim().max(120).optional(),
    utm: z
      .object({
        source: z.string().trim().max(120).optional(),
        medium: z.string().trim().max(120).optional(),
        campaign: z.string().trim().max(120).optional(),
        content: z.string().trim().max(120).optional(),
        term: z.string().trim().max(120).optional(),
        gclid: z.string().trim().max(200).optional(),
        fbclid: z.string().trim().max(200).optional(),
        msclkid: z.string().trim().max(200).optional(),
        ttclid: z.string().trim().max(200).optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.leadType !== "pre-launch") {
      if (!data.name || data.name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "Name is required",
        });
      }
    }
  });

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createLeadSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Validation error", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const leadType = data.leadType ?? "join";
  const phone = leadType === "pre-launch" ? undefined : data.phone?.trim() ? data.phone.trim() : undefined;

  const leadId = ulid();
  const now = Date.now();
  const prefix = keyPrefix(process.env.LEADS_KEY_PREFIX);
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ ok: true, leadId });
  }

  const normalizedEmail = data.email.trim().toLowerCase();
  const emailKey = `${prefix}:leads:email:${normalizedEmail}`;
  const existingLeadId = await redis.get<string>(emailKey);
  if (existingLeadId) {
    if (leadType === "pre-launch") {
      const existingLeadKey = `${prefix}:lead:${existingLeadId}`;
      await redis.hset(existingLeadKey, {
        prelaunchVoucherRequestedAt: new Date(now).toISOString(),
      });
      await redis.zadd(`${prefix}:leads:prelaunch:byCreatedAt`, { score: now, member: existingLeadId });
    }
    return NextResponse.json({ ok: true, leadId: existingLeadId });
  }

  const leadKey = `${prefix}:lead:${leadId}`;
  const createdAt = new Date(now).toISOString();

  await redis.hset(leadKey, {
    name: data.name?.trim() ?? "",
    email: normalizedEmail,
    phone: phone ?? "",
    plan: "free",
    region: data.region,
    locale: data.locale,
    source: data.source ?? "",
    leadType,
    prelaunchVoucherRequestedAt: leadType === "pre-launch" ? createdAt : "",
    createdAt,
    utmJson: data.utm ? JSON.stringify(data.utm) : "",
  });

  await redis.zadd(`${prefix}:leads:byCreatedAt`, { score: now, member: leadId });
  if (leadType === "pre-launch") {
    await redis.zadd(`${prefix}:leads:prelaunch:byCreatedAt`, { score: now, member: leadId });
  }
  await redis.set(emailKey, leadId);

  return NextResponse.json({ ok: true, leadId });
}
