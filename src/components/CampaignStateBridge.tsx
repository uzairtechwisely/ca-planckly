"use client";

import { useEffect } from "react";

import { setCampaign, type CampaignClientContext } from "@/lib/clientState";

export function CampaignStateBridge({ campaign }: { campaign: CampaignClientContext }) {
  const { hostname, template, slug, region, country } = campaign;

  useEffect(() => {
    setCampaign({ hostname, template, slug, region, country });
    return () => setCampaign(undefined);
  }, [country, hostname, region, slug, template]);

  return null;
}
