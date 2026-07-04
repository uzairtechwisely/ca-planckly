"use client";

import { useCallback, useState } from "react";

import { useClientContext } from "@/components/ClientProviders";
import { CampaignStateBridge } from "@/components/CampaignStateBridge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JoinModal } from "@/components/JoinModal";
import { type ActiveCampaign } from "@/types/campaign";

export function TemplatePlaceholder({
  campaign,
  label,
}: {
  campaign: ActiveCampaign;
  label: string;
}) {
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
        <div className="overflow-hidden rounded-[34px] border border-[var(--plk-border)] bg-white shadow-[var(--plk-shadow-card)]">
          <div className="bg-[var(--plk-bg-50)] p-8">
            <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[var(--plk-ink-600)]">
              {label}
            </div>
            <h1 className="mt-5 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
              Campaign template is ready for content
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--plk-ink-600)]">
              This domain is configured to use the <span className="font-semibold">{label}</span> template. Add campaign
              content in Redis to make it live without changing code.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onJoin}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--plk-brand-600)] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--plk-brand-700)]"
              >
                Join Planckly
              </button>
            </div>
          </div>
          <div className="p-8">
            <div className="text-sm font-semibold tracking-wide text-[var(--plk-ink-600)]">Hostname</div>
            <div className="mt-2 rounded-2xl border border-[var(--plk-border)] bg-white px-4 py-3 font-mono text-sm text-[var(--plk-ink-900)]">
              {campaign.hostname}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <JoinModal key={joinOpen ? "open" : "closed"} open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
