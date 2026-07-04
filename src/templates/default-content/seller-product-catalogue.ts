import { type CampaignContent } from "@/types/campaign";
import { type SellerProductCatalogueData } from "@/templates/seller-product-catalogue/types";

export function sellerProductCatalogueDefaultContent(hostname: string): CampaignContent {
  const heroImagePrompt =
    "cinematic%20photorealistic%20California%20small%20business%20storefront%20with%20diverse%20owners%2C%20golden%20hour%2C%20palm%20trees%2C%20shallow%20depth%20of%20field%2C%2035mm%2C%20ultra%20detailed%2C%20natural%20colors%2C%20no%20text%2C%20no%20logo";
  const ogImagePrompt =
    "photorealistic%20California%20storefront%20scene%20with%20diverse%20customers%2C%20Los%20Angeles%20street%2C%20sunshine%2C%20palm%20trees%2C%20modern%20minimal%20aesthetic%2C%20cinematic%20lighting%2C%20ultra%20realistic%2C%20no%20text";
  const showcasePrompt1 =
    "photorealistic%20modern%20SaaS%20dashboard%20on%20a%20laptop%20in%20a%20bright%20California%20coffee%20shop%2C%20warm%20sunlight%2C%20shallow%20depth%20of%20field%2C%20ultra%20detailed%2C%20no%20text";
  const showcasePrompt2 =
    "photorealistic%20mobile%20checkout%20experience%20in%20hand%20at%20an%20outdoor%20farmers%20market%20in%20California%2C%20diverse%20crowd%2C%20candid%2C%20natural%20light%2C%20no%20text";
  const showcasePrompt3 =
    "photorealistic%20inventory%20and%20product%20catalogue%20management%20on%20a%20desktop%20monitor%2C%20modern%20minimal%20office%2C%20natural%20light%2C%20ultra%20realistic%2C%20no%20text";

  const data: SellerProductCatalogueData = {
    branding: {
      logoSrc: "https://joinnnow.plancklyimages.com/Logo.png",
    },
    header: {
      joinLabel: "Join Planckly",
      nav: [
        { label: "Benefits", href: "#benefits" },
        { label: "Product", href: "#product" },
        { label: "Use cases", href: "#use-cases" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
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
      image: {
        src: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${heroImagePrompt}&image_size=landscape_16_9`,
        alt: "California small business owners",
      },
      trust: [
        { label: "Launch", value: "California" },
        { label: "Setup", value: "Minutes" },
        { label: "Plan", value: "Free to start" },
      ],
    },
    benefits: {
      eyebrow: "BENEFITS",
      heading: "A modern catalogue experience that feels premium and converts",
      items: [
        {
          icon: "shield-check",
          title: "Trusted experience",
          description: "Clean UI, clear flows, and confidence-first messaging from first scroll to submission.",
        },
        {
          icon: "zap",
          title: "Fast launch",
          description: "A lightweight landing experience that stays smooth on mobile and desktop.",
        },
        {
          icon: "sparkles",
          title: "Cinematic storytelling",
          description: "Scroll-driven sections that explain the value without feeling salesy.",
        },
      ],
    },
    showcase: {
      eyebrow: "PRODUCT",
      heading: "A simple story: list, share, convert, grow",
      description:
        "A scroll-driven product walkthrough that communicates value fast. Content will be personalized per domain later without changing the structure.",
      steps: [
        {
          title: "Publish your catalogue",
          description: "Create a clean catalogue experience that works across devices and feels premium.",
          image: {
            src: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${showcasePrompt3}&image_size=landscape_16_9`,
            alt: "Product catalogue management",
          },
        },
        {
          title: "Share anywhere",
          description: "Make it easy for customers to browse, discover, and reach out from anywhere.",
          image: {
            src: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${showcasePrompt2}&image_size=landscape_16_9`,
            alt: "Mobile checkout experience",
          },
        },
        {
          title: "Track interest",
          description: "Know what’s working: traffic sources, conversion steps, and demand signals.",
          image: {
            src: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${showcasePrompt1}&image_size=landscape_16_9`,
            alt: "Analytics dashboard",
          },
        },
      ],
    },
    useCases: {
      eyebrow: "USE CASES",
      heading: "Built for real sellers and real workflows",
      description:
        "This section becomes domain-specific later (CA, TX, UK) while the layout stays locked and reusable.",
      items: [
        { icon: "zap", title: "Pop-ups & markets", description: "Launch a fast catalogue and capture demand with a clean CTA." },
        { icon: "sparkles", title: "Boutique storefronts", description: "Showcase products in a premium layout that feels on-brand." },
        { icon: "shield-check", title: "Service businesses", description: "Collect leads with a frictionless flow and clear messaging." },
        { icon: "sparkles", title: "Local brands", description: "Tell your story with scroll-driven sections and lifestyle visuals." },
        { icon: "zap", title: "New launches", description: "Measure interest early and iterate quickly before scaling." },
        { icon: "shield-check", title: "Teams", description: "Keep the experience consistent while updating content per campaign." },
      ],
    },
    socialProof: {
      eyebrow: "SOCIAL PROOF",
      heading: "Loved for clarity, speed, and polish",
      items: [
        {
          quote: "The layout feels premium and the story makes sense in seconds. It’s exactly what we needed for a clean launch.",
          name: "Alex M.",
          title: "Owner",
          company: "Local Retail",
        },
        {
          quote: "The scroll showcase explains the value without overwhelming visitors. The CTA placement is perfect.",
          name: "Jordan R.",
          title: "Founder",
          company: "Small Business",
        },
        {
          quote: "Everything feels intentional: spacing, motion, and the flow from hero to pricing. Super high quality.",
          name: "Taylor K.",
          title: "Marketing Lead",
          company: "Growing Brand",
        },
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
