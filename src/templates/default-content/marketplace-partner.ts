import { type CampaignContent } from "@/types/campaign";

export function marketplacePartnerDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "marketplace-partner",
    slug: "marketplace-partner",
    status: "live",
    seo: {
      title: "Planckly Marketplace — Partner",
      description: "A partner-ready campaign experience for integrations, distribution, and co-marketing.",
    },
    data: {},
  };
}

