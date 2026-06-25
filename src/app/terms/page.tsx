import { LegalPageClient } from "@/app/LegalPageClient";

export default function TermsPage() {
  return (
    <LegalPageClient title="Terms">
      <p>
        These Terms apply to your use of the Planckly California landing page and the Free Plan signup interest
        form.
      </p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Free Plan
      </h2>
      <p>
        Submitting the form registers your interest for the Free Plan and early access updates. It does not
        guarantee availability, and features may change during launch.
      </p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Acceptable use
      </h2>
      <p>You agree not to misuse the site, attempt to disrupt it, or submit false information.</p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Disclaimers
      </h2>
      <p>
        The landing page is provided “as is” for informational purposes. Planckly makes no warranties regarding
        availability or fitness for a particular purpose.
      </p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Changes
      </h2>
      <p>We may update these Terms as the product launches. Continued use means you accept the updated Terms.</p>
      <h2 className="font-[var(--font-heading)] text-lg font-extrabold text-[var(--plk-ink-900)]">
        Contact
      </h2>
      <p>If you have questions, contact us at hello@planckly.com.</p>
    </LegalPageClient>
  );
}

