import { headers } from "next/headers";

import { normalizeHostname } from "@/campaign/hostname";
import { isMarketingPanelEnabled } from "@/campaign/marketingPanel";
import { templateRegistry } from "@/templates/registry";
import { type ActiveCampaign } from "@/types/campaign";
import { listCampaignRoutes } from "@/repositories/campaignRouteAdminRepository";
import { CampaignRoutesAdminClient } from "@/app/ops/campaign-routes/CampaignRoutesAdminClient";

function fallbackCampaign(hostname: string): ActiveCampaign {
  const entry = templateRegistry["generic-fallback"];
  const base = entry.defaultContent(hostname);
  return {
    hostname,
    template: "generic-fallback",
    content: {
      ...base,
      hostname,
      template: "generic-fallback",
    },
  };
}

export default async function CampaignRoutesOpsPage() {
  const h = await headers();
  const hostname = normalizeHostname(h.get("host"));

  if (!isMarketingPanelEnabled(h.get("host"))) {
    const entry = templateRegistry["generic-fallback"];
    const Component = entry.Component;
    return <Component campaign={fallbackCampaign(hostname)} />;
  }

  const routes = await listCampaignRoutes();
  return <CampaignRoutesAdminClient initialRoutes={routes} />;
}
