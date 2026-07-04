function sanitize(part: string) {
  return part.trim().replaceAll(":", "_").replaceAll(" ", "_");
}

export function leadKey(prefix: string, hostname: string, template: string, ts: number, id: string) {
  return `${prefix}:lead:${sanitize(hostname)}:${sanitize(template)}:${ts}:${id}`;
}

export function leadDedupKey(prefix: string, hostname: string, template: string, email: string) {
  return `${prefix}:leads:dedup:${sanitize(hostname)}:${sanitize(template)}:${sanitize(email)}`;
}

export function leadsByCreatedAtKey(prefix: string) {
  return `${prefix}:leads:byCreatedAt`;
}

export function leadsByCreatedAtCampaignKey(prefix: string, hostname: string, template: string) {
  return `${prefix}:leads:${sanitize(hostname)}:${sanitize(template)}:byCreatedAt`;
}

export function leadsPrelaunchByCreatedAtCampaignKey(prefix: string, hostname: string, template: string) {
  return `${prefix}:leads:${sanitize(hostname)}:${sanitize(template)}:prelaunch:byCreatedAt`;
}

