"use client";

import { TemplatePlaceholder } from "@/templates/TemplatePlaceholder";
import { type ActiveCampaign } from "@/types/campaign";

export function MarketplacePartnerTemplate({ campaign }: { campaign: ActiveCampaign }) {
  return <TemplatePlaceholder campaign={campaign} label="Marketplace Partner" />;
}

