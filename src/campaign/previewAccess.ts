import { headers } from "next/headers";

export type PreviewAccessContext = {
  token?: string;
  host?: string;
  userAgent?: string;
};

export function isCampaignPreviewEnabled() {
  return String(process.env.ENABLE_CAMPAIGN_PREVIEW ?? "").toLowerCase() === "true";
}

export async function authorizeCampaignPreview(ctx: PreviewAccessContext) {
  if (!isCampaignPreviewEnabled()) return false;
  if (!ctx.token) return true;
  const expected = process.env.CAMPAIGN_PREVIEW_TOKEN;
  if (!expected) return false;
  return ctx.token === expected;
}

export async function getPreviewAccessContext(token?: string): Promise<PreviewAccessContext> {
  const h = await headers();
  return {
    token,
    host: h.get("host") ?? undefined,
    userAgent: h.get("user-agent") ?? undefined,
  };
}

