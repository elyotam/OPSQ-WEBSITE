// Four tiles, one lit: the whole operation in view, one action waiting for you.
export function LogoMark({
  className = "h-8 w-8",
  tile = "currentColor",
}: {
  className?: string;
  tile?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3" y="3" width="11.5" height="11.5" rx="3.5" fill={tile} />
      <rect x="17.5" y="3" width="11.5" height="11.5" rx="3.5" fill={tile} opacity="0.35" />
      <rect x="3" y="17.5" width="11.5" height="11.5" rx="3.5" fill={tile} opacity="0.35" />
      <rect x="17.5" y="17.5" width="11.5" height="11.5" rx="5.75" fill="var(--color-mint)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`ltr inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-[1.4rem] font-extrabold tracking-tight">OpsQ</span>
    </span>
  );
}
