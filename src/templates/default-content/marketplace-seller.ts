import { type CampaignContent } from "@/types/campaign";

export function marketplaceSellerDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "marketplace-seller",
    slug: "marketplace-seller",
    status: "live",
    seo: {
      title: "Planckly Marketplace — Seller",
      description: "A premium seller experience for marketplace growth, automation, and insights.",
    },
    data: {},
  };
}

