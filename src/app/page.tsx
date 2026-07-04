import { headers } from "next/headers";

import { getActiveCampaign } from "@/campaign/activeCampaign";
import { normalizeHostname } from "@/campaign/hostname";
import { templateRegistry } from "@/templates/registry";

export default async function Home() {
  const h = await headers();
  const hostname = normalizeHostname(h.get("host"));
  const campaign = await getActiveCampaign(hostname);
  const entry = templateRegistry[campaign.template] ?? templateRegistry["generic-fallback"];
  const Component = entry.Component;
  return <Component campaign={campaign} />;
}
