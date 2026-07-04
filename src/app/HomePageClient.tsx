"use client";

import { useCallback, useState } from "react";

import { useClientContext } from "@/components/ClientProviders";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroBanner } from "@/components/HeroBanner";
import { BenefitsBand } from "@/components/BenefitsBand";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { UseCasesGrid } from "@/components/UseCasesGrid";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { SiteFooter } from "@/components/SiteFooter";
import { JoinModal } from "@/components/JoinModal";
import { PrelaunchOverlay } from "@/components/PrelaunchOverlay";
import { type SellerProductCatalogueData } from "@/templates/seller-product-catalogue/types";

export function HomePageClient({ content }: { content: SellerProductCatalogueData }) {
  const { track } = useClientContext();
  const [joinOpen, setJoinOpen] = useState(false);

  const onJoin = useCallback(() => {
    track("cta_join_click");
    setJoinOpen(true);
  }, [track]);

  return (
    <div className="relative flex-1">
      <SiteHeader
        onJoin={onJoin}
        logoSrc={content.branding.logoSrc}
        joinLabel={content.header.joinLabel}
        navItems={content.header.nav}
        variant="nav"
      />
      <main>
        <HeroBanner
          onJoin={onJoin}
          badge={content.hero.badge}
          headingPrefix={content.hero.headingPrefix}
          headingHighlight={content.hero.headingHighlight}
          headingSuffix={content.hero.headingSuffix}
          subheading={content.hero.subheading}
          primaryCtaLabel={content.hero.primaryCtaLabel}
          secondaryCtaLabel={content.hero.secondaryCtaLabel}
          secondaryCtaHref={content.hero.secondaryCtaHref}
          image={content.hero.image}
          trust={content.hero.trust}
        />
        <BenefitsBand eyebrow={content.benefits.eyebrow} heading={content.benefits.heading} items={content.benefits.items} />
        <ScrollShowcase
          eyebrow={content.showcase.eyebrow}
          heading={content.showcase.heading}
          description={content.showcase.description}
          steps={content.showcase.steps}
        />
        <UseCasesGrid
          eyebrow={content.useCases.eyebrow}
          heading={content.useCases.heading}
          description={content.useCases.description}
          items={content.useCases.items}
        />
        <Testimonials eyebrow={content.socialProof.eyebrow} heading={content.socialProof.heading} items={content.socialProof.items} />
        <div id="pricing">
          <Pricing
            onJoin={onJoin}
            eyebrow={content.pricing.eyebrow}
            heading={content.pricing.heading}
            description={content.pricing.description}
            plans={content.pricing.plans}
          />
        </div>
        <div id="faq">
          <Faq eyebrow={content.faq.eyebrow} heading={content.faq.heading} items={content.faq.items} />
        </div>
      </main>
      <SiteFooter
        logoSrc={content.branding.logoSrc}
        description={content.footer.description}
        contactEmail={content.footer.contactEmail}
        location={content.footer.location}
      />
      <JoinModal key={joinOpen ? "open" : "closed"} open={joinOpen} onClose={() => setJoinOpen(false)} />
      <PrelaunchOverlay />
    </div>
  );
}
