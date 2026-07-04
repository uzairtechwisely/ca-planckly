"use client";

import { TemplatePlaceholder } from "@/templates/TemplatePlaceholder";
import { type ActiveCampaign } from "@/types/campaign";

export function SellerShopConsultationTemplate({ campaign }: { campaign: ActiveCampaign }) {
  return <TemplatePlaceholder campaign={campaign} label="Seller Shop Consultation" />;
}

