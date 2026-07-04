"use client";

import { useCallback, useState } from "react";

import { useClientContext } from "@/components/ClientProviders";
import { CampaignStateBridge } from "@/components/CampaignStateBridge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JoinModal } from "@/components/JoinModal";
import { type ActiveCampaign } from "@/types/campaign";

export function GenericFallbackTemplate({ campaign }: { campaign: ActiveCampaign }) {
  const { track } = useClientContext();
  const [joinOpen, setJoinOpen] = useState(false);

  const onJoin = useCallback(() => {
    track("cta_join_click");
    setJoinOpen(true);
  }, [track]);

  return (
    <div
      className="relative flex-1"
      data-campaign-hostname={campaign.hostname}
      data-campaign-template={campaign.template}
      data-campaign-slug={campaign.content.slug ?? ""}
    >
      <CampaignStateBridge
        campaign={{
          hostname: campaign.hostname,
          template: campaign.template,
          slug: campaign.content.slug,
          region: campaign.content.region,
          country: campaign.content.country,
        }}
      />
      <SiteHeader onJoin={onJoin} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:pt-32">
        <div className="rounded-[32px] border border-[var(--plk-border)] bg-white p-8 shadow-[var(--plk-shadow-card)]">
          <div className="inline-flex items-center rounded-full bg-[var(--plk-bg-50)] px-4 py-2 text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">
            {campaign.hostname}
          </div>
          <h1 className="mt-5 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
            {campaign.content.hero?.heading ?? "Welcome to Planckly"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--plk-ink-600)]">
            {campaign.content.hero?.subheading ??
              "We’re preparing the right campaign for this domain. Leave your details and we’ll follow up."}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onJoin}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--plk-brand-600)] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--plk-brand-700)]"
            >
              {campaign.content.hero?.primaryCta?.label ?? "Join Planckly"}
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
      <JoinModal key={joinOpen ? "open" : "closed"} open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
