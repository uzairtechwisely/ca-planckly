import { type CampaignContent } from "@/types/campaign";

export function sellerShopConsultationDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "seller-shop-consultation",
    slug: "seller-shop-consultation",
    status: "live",
    seo: {
      title: "Planckly — Shop Consultation",
      description: "A premium consultation experience to plan growth, diagnose issues, and ship improvements.",
    },
    data: {},
  };
}

