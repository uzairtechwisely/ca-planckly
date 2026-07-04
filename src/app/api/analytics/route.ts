import { NextResponse } from "next/server";
import { z } from "zod";

import { recordAnalyticsEvent } from "@/repositories/analyticsRepository";

const eventNameSchema = z.enum([
  "page_view",
  "cta_join_click",
  "lead_submit_click",
  "lead_submit_success",
  "prelaunch_voucher_click",
  "prelaunch_voucher_submit_success",
]);

const requestSchema = z.object({
  event: eventNameSchema,
  visitorId: z.string().trim().min(10).max(80),
  consent: z.enum(["granted", "denied"]),
  ts: z.number().int().positive(),
  region: z.string().trim().max(40).optional(),
  locale: z.string().trim().max(40).optional(),
  campaign: z
    .object({
      hostname: z.string().trim().max(200),
      template: z.string().trim().max(80),
      slug: z.string().trim().max(120).optional(),
    })
    .optional(),
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
  await recordAnalyticsEvent({
    event: data.event,
    visitorId: data.visitorId,
    consent: data.consent,
    ts: data.ts,
    region: data.region,
    locale: data.locale,
    campaign: data.campaign,
    attribution: data.attribution
      ? {
          ...data.attribution,
        }
      : undefined,
  });

  return NextResponse.json({ ok: true });
}
