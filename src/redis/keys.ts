import { type CampaignTemplateId } from "@/types/campaign";

export function campaignRouteKey(hostname: string) {
  return `campaign-route:${hostname}`;
}

export function campaignContentKey(hostname: string, template: CampaignTemplateId) {
  return `campaign-content:${hostname}:${template}`;
}

