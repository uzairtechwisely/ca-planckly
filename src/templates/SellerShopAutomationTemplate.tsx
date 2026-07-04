"use client";

import { TemplatePlaceholder } from "@/templates/TemplatePlaceholder";
import { type ActiveCampaign } from "@/types/campaign";

export function SellerShopAutomationTemplate({ campaign }: { campaign: ActiveCampaign }) {
  return <TemplatePlaceholder campaign={campaign} label="Seller Shop Automation" />;
}

