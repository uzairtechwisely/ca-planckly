"use client";

export function StatsBand({
  stats,
}: {
  stats?: Array<{ value: string; label: string }>;
} = {}) {
  const resolvedStats =
    stats ?? [
      { value: "2.3k+", label: "Early interest" },
      { value: "US-CA", label: "Launch region" },
      { value: "99.9%", label: "Uptime target" },
      { value: "$0", label: "To start" },
    ];
  return (
    <section className="relative bg-[var(--plk-footer-900)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-14">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {resolvedStats.map((stat) => (
            <Stat key={`${stat.label}:${stat.value}`} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
      <Wave />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[24px] border border-[rgba(220,230,245,0.20)] bg-[rgba(255,255,255,0.06)] p-5">
      <div className="font-[var(--font-heading)] text-2xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-sm font-medium text-[rgba(200,210,226,0.92)]">{label}</div>
    </div>
  );
}

function Wave() {
  return (
    <svg
      className="block w-full text-[var(--plk-bg-0)]"
      viewBox="0 0 1440 84"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,40 C120,70 240,80 360,70 C480,60 600,30 720,28 C840,26 960,55 1080,62 C1200,69 1320,58 1440,42 L1440,84 L0,84 Z"
      />
    </svg>
  );
}
