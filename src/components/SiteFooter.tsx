"use client";

import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--plk-footer-900)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-28">
                <Image
                  src="https://joinnnow.plancklyimages.com/Logo.png"
                  alt="Planckly"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-[rgba(200,210,226,0.90)]">
              Planckly California is a high-conversion landing experience designed to capture interest and
              onboard early users. Free to start.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-[0.16em] text-[rgba(200,210,226,0.70)]">
              LEGAL
            </div>
            <div className="flex flex-col gap-2 text-sm font-semibold">
              <Link href="/privacy" className="text-white/90 transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/90 transition hover:text-white">
                Terms
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-[0.16em] text-[rgba(200,210,226,0.70)]">
              CONTACT
            </div>
            <div className="text-sm font-semibold text-white/90">hello@planckly.com</div>
            <div className="text-sm text-[rgba(200,210,226,0.90)]">California, United States</div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-[rgba(200,210,226,0.70)]">
          © {new Date().getFullYear()} Planckly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
