import { NextResponse } from "next/server";
import { z } from "zod";

import { isMarketingPanelEnabled } from "@/campaign/marketingPanel";
import { normalizeHostname } from "@/campaign/hostname";
import {
  deleteCampaignRoute,
  listCampaignRoutes,
  upsertCampaignRoute,
} from "@/repositories/campaignRouteAdminRepository";
import { type CampaignRoute, type CampaignTemplateId } from "@/types/campaign";

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

const statusSchema = z.enum(["live", "draft", "disabled"]);

const upsertSchema = z.object({
  hostname: z.string().trim().min(1).max(200),
  activeTemplate: templateSchema,
  status: statusSchema.default("live"),
});

const deleteSchema = z.object({
  hostname: z.string().trim().min(1).max(200),
});

function getUpdatedBy(req: Request) {
  return (
    req.headers.get("cf-access-authenticated-user-email") ??
    req.headers.get("Cf-Access-Authenticated-User-Email") ??
    req.headers.get("x-forwarded-email") ??
    undefined
  );
}

function authorize(req: Request) {
  return isMarketingPanelEnabled(req.headers.get("host"));
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const routes = await listCampaignRoutes();
  return NextResponse.json({ ok: true, routes });
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = upsertSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation error" }, { status: 400 });
  }

  const hostname = normalizeHostname(parsed.data.hostname);
  if (!hostname) {
    return NextResponse.json({ ok: false, error: "Invalid hostname" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const updatedBy = getUpdatedBy(req);
  const route: CampaignRoute = {
    hostname,
    activeTemplate: parsed.data.activeTemplate,
    status: parsed.data.status,
    updatedAt: now,
    updatedBy: updatedBy?.trim() || undefined,
  };

  await upsertCampaignRoute(route);
  return NextResponse.json({ ok: true, route });
}

export async function DELETE(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = deleteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation error" }, { status: 400 });
  }

  const hostname = normalizeHostname(parsed.data.hostname);
  if (!hostname) {
    return NextResponse.json({ ok: false, error: "Invalid hostname" }, { status: 400 });
  }

  await deleteCampaignRoute(hostname);
  return NextResponse.json({ ok: true });
}

