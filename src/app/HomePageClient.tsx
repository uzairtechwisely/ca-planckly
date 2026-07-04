"use client";

import { useCallback, useState } from "react";

import { useClientContext } from "@/components/ClientProviders";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { StatsBand } from "@/components/StatsBand";
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
      <SiteHeader onJoin={onJoin} logoSrc={content.branding.logoSrc} joinLabel={content.header.joinLabel} />
      <main>
        <Hero
          onJoin={onJoin}
          badge={content.hero.badge}
          headingPrefix={content.hero.headingPrefix}
          headingHighlight={content.hero.headingHighlight}
          headingSuffix={content.hero.headingSuffix}
          subheading={content.hero.subheading}
          primaryCtaLabel={content.hero.primaryCtaLabel}
          secondaryCtaLabel={content.hero.secondaryCtaLabel}
          secondaryCtaHref={content.hero.secondaryCtaHref}
          features={content.hero.features}
          image={content.hero.image}
          miniStats={content.hero.miniStats}
        />
        <StatsBand stats={content.statsBand.stats} />
        <Pricing
          onJoin={onJoin}
          eyebrow={content.pricing.eyebrow}
          heading={content.pricing.heading}
          description={content.pricing.description}
          plans={content.pricing.plans}
        />
        <Faq eyebrow={content.faq.eyebrow} heading={content.faq.heading} items={content.faq.items} />
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
