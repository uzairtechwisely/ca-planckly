export type SellerProductCatalogueData = {
  branding: {
    logoSrc: string;
  };
  header: {
    joinLabel: string;
  };
  hero: {
    badge: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    subheading: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    features: Array<{
      icon: "shield-check" | "zap" | "sparkles";
      title: string;
      description: string;
    }>;
    image: {
      src: string;
      alt: string;
    };
    miniStats: Array<{ label: string; value: string }>;
  };
  statsBand: {
    stats: Array<{ value: string; label: string }>;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      cadence: string;
      highlight: boolean;
      badge?: string;
      items: string[];
      ctaLabel: string;
    }>;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: Array<{ q: string; a: string }>;
  };
  footer: {
    description: string;
    contactEmail: string;
    location: string;
  };
};

