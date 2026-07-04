import { NextResponse } from "next/server";
import { z } from "zod";

import { getActiveCampaign } from "@/campaign/activeCampaign";
import { normalizeHostname } from "@/campaign/hostname";
import { saveLead } from "@/repositories/leadRepository";

const leadTypeSchema = z.enum(["join", "pre-launch"]);

const createLeadSchema = z
  .object({
    leadType: leadTypeSchema.default("join"),
    name: z.string().trim().min(2).max(80).optional(),
    email: z.string().trim().email().max(120),
    phone: z.string().trim().min(7).max(30).optional().or(z.literal("")),
    plan: z.literal("free").default("free"),
    locale: z.string().trim().max(40).default("en-US"),
    region: z.string().trim().max(40).optional(),
    country: z.string().trim().max(40).optional(),
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
  const hostname = normalizeHostname(req.headers.get("host"));
  const activeCampaign = await getActiveCampaign(hostname);
  const resolvedRegion = activeCampaign.content.region ?? data.region ?? "US-CA";
  const resolvedCountry = activeCampaign.content.country ?? data.country;
  const resolvedSlug = activeCampaign.content.slug;

  const result = await saveLead({
    leadType,
    hostname: activeCampaign.hostname || hostname,
    template: activeCampaign.template,
    slug: resolvedSlug,
    region: resolvedRegion,
    country: resolvedCountry,
    locale: data.locale,
    plan: "free",
    source: data.source,
    name: data.name,
    email: data.email,
    phone,
    utm: data.utm,
    userAgent: req.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true, leadId: result.leadId });
}
