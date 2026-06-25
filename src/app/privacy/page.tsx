import { LegalPageClient } from "@/app/LegalPageClient";

export default function PrivacyPage() {
  return (
    <LegalPageClient title="Privacy Policy">
      <p>
        This Privacy Policy explains what information Planckly collects on this landing page and how it is used.
      </p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Information we collect
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Name and email when you submit the Join Planckly form.</li>
        <li>Phone number only if you choose to provide it.</li>
        <li>Traffic source information such as UTM parameters and ad click IDs (if present in the URL).</li>
        <li>Basic usage events like page views and button clicks.</li>
      </ul>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        How we use it
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>To contact you about the California launch and your interest in Planckly.</li>
        <li>To measure unique visitors and improve the landing experience.</li>
        <li>To evaluate campaign performance for marketing (Google/Meta) using standard tracking parameters.</li>
      </ul>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Cookies
      </h2>
      <p>
        Analytics cookies are optional. If you accept, we may store a persistent visitor identifier in a cookie to
        measure unique visits more efficiently. If you decline, we use a session-only identifier without setting
        analytics cookies.
      </p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Contact
      </h2>
      <p>If you have questions, contact us at hello@planckly.com.</p>
    </LegalPageClient>
  );
}

