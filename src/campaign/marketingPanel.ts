import "server-only";

import { normalizeHostname } from "@/campaign/hostname";

export function isMarketingPanelEnabled(hostHeader: string | null | undefined) {
  if (process.env.ENABLE_MARKETING_PANEL !== "true") return false;
  const configured = (process.env.MARKETING_PANEL_HOSTNAME ?? "marketing-admin.planckly.com").trim().toLowerCase();
  const requestHostname = normalizeHostname(hostHeader);
  if (!configured) return false;
  return requestHostname === configured;
}

