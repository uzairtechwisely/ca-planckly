import { NextResponse } from "next/server";
import { z } from "zod";

import { isDevPreviewEnabled } from "@/campaign/devPreview";
import { normalizeHostname } from "@/campaign/hostname";
import { type CampaignTemplateId } from "@/types/campaign";

const templates: CampaignTemplateId[] = [
  "generic-fallback",
  "marketplace-seller",
  "marketplace-partner",
  "seller-product-catalogue",
  "seller-shop-automation",
  "seller-shop-consultation",
  "brand-loyalty-campaigns",
  "brand-marketplace",
  "government-sector",
];

const templateSchema = z
  .string()
  .trim()
  .refine((value): value is CampaignTemplateId => templates.includes(value as CampaignTemplateId));
const modeSchema = z.enum(["route", "template"]);

const requestSchema = z.object({
  hostname: z.string().trim().min(1).max(200),
  mode: modeSchema.default("template"),
  template: templateSchema.optional(),
});

export async function POST(req: Request) {
  if (!isDevPreviewEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

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

  const hostname = normalizeHostname(parsed.data.hostname);
  if (!hostname) {
    return NextResponse.json({ ok: false, error: "Invalid hostname" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("plk_preview_host", hostname, { path: "/" });
  res.cookies.set("plk_preview_mode", parsed.data.mode, { path: "/" });
  res.cookies.set("plk_preview_template", parsed.data.template ?? "seller-product-catalogue", { path: "/" });
  return res;
}

export async function DELETE() {
  if (!isDevPreviewEnabled()) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("plk_preview_host", "", { path: "/", maxAge: 0 });
  res.cookies.set("plk_preview_mode", "", { path: "/", maxAge: 0 });
  res.cookies.set("plk_preview_template", "", { path: "/", maxAge: 0 });
  return res;
}
