import { type CampaignContent } from "@/types/campaign";

export function brandMarketplaceDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "brand-marketplace",
    slug: "brand-marketplace",
    status: "live",
    seo: {
      title: "Planckly — Brand Marketplace",
      description: "A premium marketplace campaign for brands, partners, and growth-focused teams.",
    },
    data: {},
  };
}

