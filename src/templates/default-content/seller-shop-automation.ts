import { type CampaignContent } from "@/types/campaign";

export function sellerShopAutomationDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "seller-shop-automation",
    slug: "seller-shop-automation",
    status: "live",
    seo: {
      title: "Planckly — Shop Automation",
      description: "Automate workflows, keep operations clean, and scale with confidence.",
    },
    data: {},
  };
}

