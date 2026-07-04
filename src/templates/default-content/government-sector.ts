import { type CampaignContent } from "@/types/campaign";

export function governmentSectorDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "government-sector",
    slug: "government-sector",
    status: "live",
    seo: {
      title: "Planckly — Government Sector",
      description: "A secure, accessible campaign experience tailored for government and public sector needs.",
    },
    data: {},
  };
}

