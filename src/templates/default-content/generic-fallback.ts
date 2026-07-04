import { type CampaignContent } from "@/types/campaign";

export function genericFallbackDefaultContent(hostname: string): CampaignContent {
  return {
    hostname,
    template: "generic-fallback",
    slug: "generic",
    status: "live",
    country: "US",
    seo: {
      title: "Planckly",
      description: "Planckly — modern tools and premium experiences. Join for updates.",
    },
    hero: {
      badge: "Planckly",
      heading: "Welcome to Planckly",
      subheading: "We’re preparing the right campaign for this domain. Leave your details and we’ll follow up.",
      primaryCta: { label: "Join Planckly", action: "join" },
    },
    footer: {
      contactEmail: "hello@planckly.com",
    },
    data: {},
  };
}

