"use client";

import { TemplatePlaceholder } from "@/templates/TemplatePlaceholder";
import { type ActiveCampaign } from "@/types/campaign";

export function BrandMarketplaceTemplate({ campaign }: { campaign: ActiveCampaign }) {
  return <TemplatePlaceholder campaign={campaign} label="Brand Marketplace" />;
}

