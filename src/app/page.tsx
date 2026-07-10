import { cookies, headers } from "next/headers";

import { getActiveCampaign, getCampaignPreview } from "@/campaign/activeCampaign";
import { isDevPreviewEnabled } from "@/campaign/devPreview";
import { normalizeHostname } from "@/campaign/hostname";
import { templateRegistry } from "@/templates/registry";
import { type CampaignTemplateId } from "@/types/campaign";

export default async function Home() {
  const h = await headers();
  const requestHostname = normalizeHostname(h.get("host"));

  const c = await cookies();
  const previewEnabled = isDevPreviewEnabled();
  const previewHost = previewEnabled ? normalizeHostname(c.get("plk_preview_host")?.value) : "";
  const previewMode = previewEnabled ? c.get("plk_preview_mode")?.value : undefined;
  const previewTemplate = previewEnabled ? c.get("plk_preview_template")?.value : undefined;

  const templateAllowed =
    previewTemplate && previewTemplate in templateRegistry ? (previewTemplate as CampaignTemplateId) : null;

  const campaign =
    previewEnabled && previewHost && previewMode === "template" && templateAllowed
      ? await getCampaignPreview(previewHost, templateAllowed)
      : await getActiveCampaign(previewEnabled && previewHost ? previewHost : requestHostname);
  const entry = templateRegistry[campaign.template] ?? templateRegistry["generic-fallback"];
  const Component = entry.Component;
  return <Component campaign={campaign} />;
}
