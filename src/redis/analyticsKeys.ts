export type AnalyticsCampaignKey = {
  hostname?: string;
  template?: string;
  slug?: string;
};

function sanitize(part: string) {
  return part.trim().replaceAll(":", "_").replaceAll(" ", "_");
}

export function analyticsCampaignKey(campaign?: AnalyticsCampaignKey) {
  const hostname = sanitize((campaign?.hostname ?? "unknown-host").toLowerCase());
  const template = sanitize((campaign?.template ?? "unknown-template").toLowerCase());
  const slug = campaign?.slug ? sanitize(campaign.slug.toLowerCase()) : "";
  return slug ? `${hostname}:${template}:${slug}` : `${hostname}:${template}`;
}

export function analyticsUvKey(prefix: string, date: string) {
  return `${prefix}:analytics:uv:${date}`;
}

export function analyticsCampaignUvKey(prefix: string, campaign: AnalyticsCampaignKey | undefined, date: string) {
  return `${prefix}:analytics:uv:${analyticsCampaignKey(campaign)}:${date}`;
}

export function analyticsEventUvKey(prefix: string, event: string, date: string) {
  return `${prefix}:analytics:event:${event}:${date}`;
}

export function analyticsCampaignEventUvKey(
  prefix: string,
  event: string,
  campaign: AnalyticsCampaignKey | undefined,
  date: string,
) {
  return `${prefix}:analytics:event:${event}:${analyticsCampaignKey(campaign)}:${date}`;
}

export function analyticsEventCountKey(prefix: string, event: string, date: string) {
  return `${prefix}:analytics:counts:${event}:${date}`;
}

export function analyticsCampaignEventCountKey(
  prefix: string,
  event: string,
  campaign: AnalyticsCampaignKey | undefined,
  date: string,
) {
  return `${prefix}:analytics:counts:${event}:${analyticsCampaignKey(campaign)}:${date}`;
}

export function analyticsLastAttributionKey(prefix: string, visitorId: string) {
  return `${prefix}:analytics:lastAttribution:${visitorId}`;
}

