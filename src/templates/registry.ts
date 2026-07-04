import { type ReactNode } from "react";

import { type ActiveCampaign, type CampaignContent, type CampaignTemplateId } from "@/types/campaign";

import { GenericFallbackTemplate } from "@/templates/GenericFallbackTemplate";
import { MarketplacePartnerTemplate } from "@/templates/MarketplacePartnerTemplate";
import { MarketplaceSellerTemplate } from "@/templates/MarketplaceSellerTemplate";
import { SellerProductCatalogueTemplate } from "@/templates/SellerProductCatalogueTemplate";
import { SellerShopAutomationTemplate } from "@/templates/SellerShopAutomationTemplate";
import { SellerShopConsultationTemplate } from "@/templates/SellerShopConsultationTemplate";
import { BrandLoyaltyCampaignsTemplate } from "@/templates/BrandLoyaltyCampaignsTemplate";
import { BrandMarketplaceTemplate } from "@/templates/BrandMarketplaceTemplate";
import { GovernmentSectorTemplate } from "@/templates/GovernmentSectorTemplate";

import { genericFallbackDefaultContent } from "@/templates/default-content/generic-fallback";
import { marketplacePartnerDefaultContent } from "@/templates/default-content/marketplace-partner";
import { marketplaceSellerDefaultContent } from "@/templates/default-content/marketplace-seller";
import { sellerProductCatalogueDefaultContent } from "@/templates/default-content/seller-product-catalogue";
import { sellerShopAutomationDefaultContent } from "@/templates/default-content/seller-shop-automation";
import { sellerShopConsultationDefaultContent } from "@/templates/default-content/seller-shop-consultation";
import { brandLoyaltyCampaignsDefaultContent } from "@/templates/default-content/brand-loyalty-campaigns";
import { brandMarketplaceDefaultContent } from "@/templates/default-content/brand-marketplace";
import { governmentSectorDefaultContent } from "@/templates/default-content/government-sector";

export type CampaignTemplateComponent = (props: { campaign: ActiveCampaign }) => ReactNode;

export type CampaignTemplateRegistryEntry = {
  id: CampaignTemplateId;
  Component: CampaignTemplateComponent;
  defaultContent: (hostname: string) => CampaignContent;
};

export const templateRegistry: Record<CampaignTemplateId, CampaignTemplateRegistryEntry> = {
  "generic-fallback": {
    id: "generic-fallback",
    Component: GenericFallbackTemplate,
    defaultContent: genericFallbackDefaultContent,
  },
  "marketplace-seller": {
    id: "marketplace-seller",
    Component: MarketplaceSellerTemplate,
    defaultContent: marketplaceSellerDefaultContent,
  },
  "marketplace-partner": {
    id: "marketplace-partner",
    Component: MarketplacePartnerTemplate,
    defaultContent: marketplacePartnerDefaultContent,
  },
  "seller-product-catalogue": {
    id: "seller-product-catalogue",
    Component: SellerProductCatalogueTemplate,
    defaultContent: sellerProductCatalogueDefaultContent,
  },
  "seller-shop-automation": {
    id: "seller-shop-automation",
    Component: SellerShopAutomationTemplate,
    defaultContent: sellerShopAutomationDefaultContent,
  },
  "seller-shop-consultation": {
    id: "seller-shop-consultation",
    Component: SellerShopConsultationTemplate,
    defaultContent: sellerShopConsultationDefaultContent,
  },
  "brand-loyalty-campaigns": {
    id: "brand-loyalty-campaigns",
    Component: BrandLoyaltyCampaignsTemplate,
    defaultContent: brandLoyaltyCampaignsDefaultContent,
  },
  "brand-marketplace": {
    id: "brand-marketplace",
    Component: BrandMarketplaceTemplate,
    defaultContent: brandMarketplaceDefaultContent,
  },
  "government-sector": {
    id: "government-sector",
    Component: GovernmentSectorTemplate,
    defaultContent: governmentSectorDefaultContent,
  },
};

export function isKnownTemplateId(value: string): value is CampaignTemplateId {
  return value in templateRegistry;
}
