"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { pickAttributionFromSearchParams } from "@/lib/attribution";
import { useClientContext } from "@/components/ClientProviders";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const { track, updateAttributionFromUrl } = useClientContext();

  useEffect(() => {
    const sp = new URLSearchParams(search);
    const incoming = pickAttributionFromSearchParams(sp);
    if (Object.keys(incoming).length) updateAttributionFromUrl(pathname, sp);

    track("page_view", { pathname, search: search ? `?${search}` : "" });
  }, [pathname, search, track, updateAttributionFromUrl]);

  return null;
}
