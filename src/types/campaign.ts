export type CampaignTemplateId =
  | "generic-fallback"
  | "marketplace-seller"
  | "marketplace-partner"
  | "seller-product-catalogue"
  | "seller-shop-automation"
  | "seller-shop-consultation"
  | "brand-loyalty-campaigns"
  | "brand-marketplace"
  | "government-sector";

export type CampaignStatus = "live" | "draft" | "disabled";

export type CampaignRoute = {
  hostname: string;
  activeTemplate: CampaignTemplateId;
  status: CampaignStatus;
  updatedAt?: string;
  updatedBy?: string;
};

export type CampaignSEO = {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
};

export type CampaignTheme = {
  palette?: Record<string, string>;
};

export type CampaignCTA = {
  label: string;
  href?: string;
  action?: string;
};

export type CampaignHero = {
  badge?: string;
  heading?: string;
  subheading?: string;
  image?: {
    src: string;
    alt?: string;
  };
  primaryCta?: CampaignCTA;
  secondaryCta?: CampaignCTA;
};

export type CampaignSection =
  | {
      type: "richText";
      title?: string;
      body?: string;
    }
  | {
      type: "features";
      title?: string;
      items?: Array<{ title: string; description?: string; icon?: string }>;
    }
  | {
      type: string;
      [key: string]: unknown;
    };

export type CampaignTracking = {
  googleAdsId?: string;
  metaPixelId?: string;
  firebaseMeasurementId?: string;
};

export type CampaignLeadForm = {
  mode?: "join" | "pre-launch" | string;
  fields?: Array<"name" | "email" | "phone" | "businessName" | "message" | string>;
};

export type CampaignModal = {
  enabled?: boolean;
  title?: string;
  body?: string;
  cta?: CampaignCTA;
};

export type CampaignFooter = {
  contactEmail?: string;
  location?: string;
};

export type CampaignContent = {
  hostname: string;
  template: CampaignTemplateId;
  slug?: string;
  status?: CampaignStatus;
  region?: string;
  country?: string;
  source?: string;
  seo?: CampaignSEO;
  theme?: CampaignTheme;
  hero?: CampaignHero;
  sections?: CampaignSection[];
  tracking?: CampaignTracking;
  leadForm?: CampaignLeadForm;
  modal?: CampaignModal;
  footer?: CampaignFooter;
  featureFlags?: Record<string, boolean>;
  data?: Record<string, unknown>;
};

export type ActiveCampaign = {
  hostname: string;
  template: CampaignTemplateId;
  route?: CampaignRoute;
  content: CampaignContent;
};
