import { getCampaignContent } from "@/repositories/campaignContentRepository";
import { getCampaignRoute } from "@/repositories/campaignRouteRepository";
import { mergeCampaignContent } from "@/campaign/merge";
import { templateRegistry } from "@/templates/registry";
import { type ActiveCampaign, type CampaignContent, type CampaignTemplateId } from "@/types/campaign";

const defaultTemplateByHostname: Record<string, CampaignTemplateId> = {
  "ca.planckly.com": "seller-product-catalogue",
  localhost: "seller-product-catalogue",
};

function ensureContentShape(
  hostname: string,
  template: CampaignTemplateId,
  content: CampaignContent,
): CampaignContent {
  return {
    ...content,
    hostname,
    template,
  };
}

export async function getActiveCampaign(hostname: string): Promise<ActiveCampaign> {
  const route = hostname ? await getCampaignRoute(hostname) : null;
  const template: CampaignTemplateId =
    route?.activeTemplate ?? defaultTemplateByHostname[hostname] ?? "generic-fallback";
  const entry = templateRegistry[template] ?? templateRegistry["generic-fallback"];

  const base = entry.defaultContent(hostname || "");
  const overrides = hostname ? await getCampaignContent(hostname, entry.id) : null;
  const merged = mergeCampaignContent(base as Record<string, unknown>, (overrides ?? undefined) as Record<string, unknown>);

  return {
    hostname: hostname || "",
    template: entry.id,
    route: route ?? undefined,
    content: ensureContentShape(hostname || "", entry.id, merged as CampaignContent),
  };
}

export async function getCampaignPreview(
  hostname: string,
  template: CampaignTemplateId,
): Promise<ActiveCampaign> {
  const entry = templateRegistry[template] ?? templateRegistry["generic-fallback"];

  const base = entry.defaultContent(hostname);
  const overrides = await getCampaignContent(hostname, entry.id);
  const merged = mergeCampaignContent(base as Record<string, unknown>, (overrides ?? undefined) as Record<string, unknown>);

  return {
    hostname,
    template: entry.id,
    content: ensureContentShape(hostname, entry.id, merged as CampaignContent),
  };
}
