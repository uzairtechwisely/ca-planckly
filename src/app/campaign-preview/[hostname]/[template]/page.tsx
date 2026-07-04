import { getCampaignPreview } from "@/campaign/activeCampaign";
import { normalizeHostname } from "@/campaign/hostname";
import { authorizeCampaignPreview, getPreviewAccessContext } from "@/campaign/previewAccess";
import { isKnownTemplateId, templateRegistry } from "@/templates/registry";

export default async function CampaignPreviewPage({
  params,
  searchParams,
}: {
  params: { hostname: string; template: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const rawHostname = decodeURIComponent(params.hostname);
  const rawTemplate = decodeURIComponent(params.template);
  const hostname = normalizeHostname(rawHostname);

  const tokenValue = searchParams?.token;
  const token = Array.isArray(tokenValue) ? tokenValue[0] : tokenValue;
  const ctx = await getPreviewAccessContext(token);
  const allowed = await authorizeCampaignPreview(ctx);

  if (!allowed) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:pt-32">
        <div className="rounded-[32px] border border-[var(--plk-border)] bg-white p-8 shadow-[var(--plk-shadow-card)]">
          <h1 className="font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
            Preview is disabled
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--plk-ink-600)]">
            Campaign preview is currently disabled for this deployment.
          </p>
        </div>
      </main>
    );
  }

  if (!isKnownTemplateId(rawTemplate)) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:pt-32">
        <div className="rounded-[32px] border border-[var(--plk-border)] bg-white p-8 shadow-[var(--plk-shadow-card)]">
          <h1 className="font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
            Template unavailable
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--plk-ink-600)]">
            The requested template is not available in this deployment.
          </p>
        </div>
      </main>
    );
  }

  const campaign = await getCampaignPreview(hostname, rawTemplate);
  const entry = templateRegistry[campaign.template] ?? templateRegistry["generic-fallback"];

  const Component = entry.Component;
  return <Component campaign={campaign} />;
}
