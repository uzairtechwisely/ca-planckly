import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { isDevPreviewEnabled } from "@/campaign/devPreview";
import { DevPreviewSwitcherClient } from "@/app/dev/preview/DevPreviewSwitcherClient";

const templates = [
  "seller-product-catalogue",
  "marketplace-seller",
  "marketplace-partner",
  "seller-shop-automation",
  "seller-shop-consultation",
  "brand-loyalty-campaigns",
  "brand-marketplace",
  "government-sector",
  "generic-fallback",
] as const;

type TemplateId = (typeof templates)[number];

export default async function DevPreviewPage() {
  if (!isDevPreviewEnabled()) {
    notFound();
  }

  const c = await cookies();
  const initialHostname = c.get("plk_preview_host")?.value ?? "";
  const initialMode: "route" | "template" = c.get("plk_preview_mode")?.value === "route" ? "route" : "template";
  const rawTemplate = c.get("plk_preview_template")?.value ?? "seller-product-catalogue";
  const initialTemplate = (templates.includes(rawTemplate as TemplateId)
    ? (rawTemplate as TemplateId)
    : "seller-product-catalogue") as TemplateId;

  return (
    <DevPreviewSwitcherClient
      initialHostname={initialHostname}
      initialMode={initialMode}
      initialTemplate={initialTemplate}
    />
  );
}
