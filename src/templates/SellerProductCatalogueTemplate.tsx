"use client";

import { HomePageClient } from "@/app/HomePageClient";
import { CampaignStateBridge } from "@/components/CampaignStateBridge";
import { type ActiveCampaign } from "@/types/campaign";
import { sellerProductCatalogueDefaultContent } from "@/templates/default-content/seller-product-catalogue";
import { type SellerProductCatalogueData } from "@/templates/seller-product-catalogue/types";

export function SellerProductCatalogueTemplate({ campaign }: { campaign: ActiveCampaign }) {
  const fallback = sellerProductCatalogueDefaultContent(campaign.hostname).data as SellerProductCatalogueData;
  const content = (campaign.content.data as SellerProductCatalogueData | undefined) ?? fallback;
  return (
    <div
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
      <HomePageClient content={content} />
    </div>
  );
}
