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

export function HomePageClient() {
  const { track } = useClientContext();
  const [joinOpen, setJoinOpen] = useState(false);

  const onJoin = useCallback(() => {
    track("cta_join_click");
    setJoinOpen(true);
  }, [track]);

  return (
    <div className="relative flex-1">
      <SiteHeader onJoin={onJoin} />
      <main>
        <Hero onJoin={onJoin} />
        <StatsBand />
        <Pricing onJoin={onJoin} />
        <Faq />
      </main>
      <SiteFooter />
      <JoinModal key={joinOpen ? "open" : "closed"} open={joinOpen} onClose={() => setJoinOpen(false)} />
      <PrelaunchOverlay />
    </div>
  );
}
