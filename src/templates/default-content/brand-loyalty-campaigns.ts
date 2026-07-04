import { type CampaignContent } from "@/types/campaign";

export function brandLoyaltyCampaignsDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "brand-loyalty-campaigns",
    slug: "brand-loyalty-campaigns",
    status: "live",
    seo: {
      title: "Planckly — Brand Loyalty",
      description: "Launch loyalty campaigns with clean design, clear tracking, and strong conversion flows.",
    },
    data: {},
  };
}

