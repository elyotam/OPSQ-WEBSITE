import type { ReactNode } from "react";
import type { Status } from "@/i18n/dictionaries";

export function SectionHeader({
  eyebrow,
  title,
  titleB,
  sub,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  titleB?: string;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`text-sm font-semibold ${dark ? "text-mint" : "text-mint-deep"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-[2rem] font-extrabold leading-[1.15] tracking-tight sm:text-[2.6rem] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
        {titleB && (
          <>
            <br />
            <span className={dark ? "text-mint" : "text-mint-deep"}>{titleB}</span>
          </>
        )}
      </h2>
      {sub && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-paper/70" : "text-ink-soft"}`}>{sub}</p>}
    </div>
  );
}

const BADGE: Record<Status, { light: string; dark: string }> = {
  live: { light: "bg-mint-soft text-mint-ink", dark: "bg-mint text-mint-ink" },
  dev: { light: "bg-ink text-mint", dark: "bg-paper/10 text-mint ring-1 ring-mint/40" },
  later: { light: "border border-dashed border-ink/30 text-ink-soft", dark: "border border-dashed border-paper/30 text-paper/70" },
};

/** The one place a capability's availability is rendered. Never render status any other way. */
export function StatusBadge({
  status,
  labels,
  dark = false,
  className = "",
}: {
  status: Status;
  labels: Record<Status, string>;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      data-status={status}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        dark ? BADGE[status].dark : BADGE[status].light
      } ${className}`}
    >
      {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {labels[status]}
    </span>
  );
}
