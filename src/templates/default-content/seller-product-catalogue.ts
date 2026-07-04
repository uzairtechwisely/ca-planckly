import { type CampaignContent } from "@/types/campaign";
import { type SellerProductCatalogueData } from "@/templates/seller-product-catalogue/types";

export function sellerProductCatalogueDefaultContent(hostname: string): CampaignContent {
  const heroImagePrompt =
    "photorealistic%20diverse%20California%20small%20business%20owners%20at%20a%20coastal%20farmers%20market%2C%20palm%20trees%2C%20warm%20golden%20hour%2C%20Santa%20Monica%20vibe%2C%20candid%20smiles%2C%20modern%20storefronts%2C%20shallow%20depth%20of%20field%2C%2035mm%2C%20ultra%20detailed%2C%20natural%20colors%2C%20no%20text%2C%20no%20logo";
  const ogImagePrompt =
    "photorealistic%20California%20storefront%20scene%20with%20diverse%20customers%2C%20Los%20Angeles%20street%2C%20sunshine%2C%20palm%20trees%2C%20modern%20minimal%20aesthetic%2C%20cinematic%20lighting%2C%20ultra%20realistic%2C%20no%20text";

  const data: SellerProductCatalogueData = {
    branding: {
      logoSrc: "https://joinnnow.plancklyimages.com/Logo.png",
    },
    header: {
      joinLabel: "Join Planckly",
    },
    hero: {
      badge: "Built for California",
      headingPrefix: "Join Planckly and",
      headingHighlight: "sell locally, smarter",
      headingSuffix: ".",
      subheading:
        "Designed for California sellers — from weekend farmers markets and pop-ups to boutique storefronts across LA, the Bay Area, San Diego, and beyond. A premium experience that helps you launch, learn, and grow. Free to start.",
      primaryCtaLabel: "Join Planckly (Free)",
      secondaryCtaLabel: "View pricing",
      secondaryCtaHref: "#pricing",
      features: [
        {
          icon: "shield-check",
          title: "Made for CA",
          description: "Local-first messaging with a premium experience that feels at home in California.",
        },
        {
          icon: "zap",
          title: "Fast to launch",
          description: "Get started in minutes and iterate quickly as you grow local demand.",
        },
        {
          icon: "sparkles",
          title: "Looks premium",
          description: "Beautiful UI and smooth motion designed to convert California visitors.",
        },
      ],
      image: {
        src: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${heroImagePrompt}&image_size=landscape_4_3`,
        alt: "California small business owners",
      },
      miniStats: [
        { label: "Coverage", value: "California" },
        { label: "Setup", value: "Minutes" },
        { label: "Cost", value: "$0 to start" },
      ],
    },
    statsBand: {
      stats: [
        { value: "NorCal", label: "Bay Area energy" },
        { value: "SoCal", label: "LA & SD vibes" },
        { value: "Local", label: "Community-first" },
        { value: "$0", label: "Free to start" },
      ],
    },
    pricing: {
      eyebrow: "PRICING",
      heading: "Simple plans in USD",
      description:
        "Built for California — pricing shown in USD. Start free, then upgrade when you’re ready.",
      plans: [
        {
          name: "Free",
          price: "$0",
          cadence: "forever",
          highlight: true,
          badge: "FREE TO START",
          items: ["Join the waitlist", "California-first onboarding", "Priority launch updates"],
          ctaLabel: "Join Planckly",
        },
        {
          name: "Growth",
          price: "$29",
          cadence: "/month",
          highlight: false,
          items: ["Everything in Free", "Advanced features", "Email support"],
          ctaLabel: "Join Planckly",
        },
        {
          name: "Pro",
          price: "$79",
          cadence: "/month",
          highlight: false,
          items: ["Everything in Growth", "Premium onboarding", "Priority support"],
          ctaLabel: "Join Planckly",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Questions, answered",
      items: [
        {
          q: "Is Planckly available in California today?",
          a: "We’re preparing the California launch experience now. Join for free to get early access updates for your city.",
        },
        {
          q: "Do I need to commit or pay to join?",
          a: "No. The Free Plan is for early access and updates. You can opt into paid plans later.",
        },
        {
          q: "Will you support other regions?",
          a: "Yes. After CA, we’ll replicate the same landing experience for Texas (tx.planckly.com) and then the UK (planckly.co.uk).",
        },
        {
          q: "What tracking do you do?",
          a: "We measure unique visits and traffic sources to improve the California landing page. Analytics cookies are optional.",
        },
      ],
    },
    footer: {
      description:
        "Planckly California is a high-conversion experience designed to capture local interest and onboard early users across the state. Free to start.",
      contactEmail: "hello@planckly.com",
      location: "California, United States",
    },
  };

  return {
    hostname,
    template: "seller-product-catalogue",
    slug: "seller-product-catalogue",
    status: "live",
    country: "US",
    region: "US-CA",
    seo: {
      title: "Planckly",
      description: "A premium experience for sellers to launch products, capture demand, and grow.",
      ogImage: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${ogImagePrompt}&image_size=landscape_16_9`,
    },
    data,
  };
}
