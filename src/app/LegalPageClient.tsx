"use client";

import { useCallback, useState } from "react";

import { useClientContext } from "@/components/ClientProviders";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JoinModal } from "@/components/JoinModal";

export function LegalPageClient({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { track } = useClientContext();
  const [joinOpen, setJoinOpen] = useState(false);

  const onJoin = useCallback(() => {
    track("cta_join_click");
    setJoinOpen(true);
  }, [track]);

  return (
    <div className="relative flex-1">
      <SiteHeader onJoin={onJoin} />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:pt-32">
        <h1 className="font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.02em] text-[var(--plk-ink-900)] sm:text-4xl">
          {title}
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--plk-ink-600)]">{children}</div>
      </main>
      <SiteFooter />
      <JoinModal key={joinOpen ? "open" : "closed"} open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
