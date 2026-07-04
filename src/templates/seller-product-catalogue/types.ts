export type SellerProductCatalogueData = {
  branding: {
    logoSrc: string;
  };
  header: {
    joinLabel: string;
    nav: Array<{ label: string; href: string }>;
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
    image: { src: string; alt: string };
    trust: Array<{ label: string; value: string }>;
  };
  benefits: {
    eyebrow: string;
    heading: string;
    items: Array<{
      icon: "shield-check" | "zap" | "sparkles";
      title: string;
      description: string;
    }>;
  };
  showcase: {
    eyebrow: string;
    heading: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      image: { src: string; alt: string };
    }>;
  };
  useCases: {
    eyebrow: string;
    heading: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: "shield-check" | "zap" | "sparkles";
    }>;
  };
  socialProof: {
    eyebrow: string;
    heading: string;
    items: Array<{
      quote: string;
      name: string;
      title: string;
      company: string;
    }>;
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
