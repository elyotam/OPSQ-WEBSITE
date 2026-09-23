import type { CSSProperties, ReactNode } from "react";

export type Palette = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentText: string;
  card: string;
  cardFg: string;
  line: string;
  ok: string;
  /** Optional CSS gradient used for the accent headline, primary button and user bubble. */
  gradient?: string;
  /** Headline accent colour when it should differ from the accent. */
  titleAccent?: string;
  /** Marker-pen highlight colour drawn behind the accent headline. */
  titleHighlight?: string;
  /** Text colour on the approve button; defaults to white. */
  okText?: string;
};

export type Variant = {
  id: string;
  label: string;
  note: string;
  palette: Palette;
  mark: ReactNode;
  wordmark: ReactNode;
  titleA: string;
  titleB: string;
  headingFont?: string;
};

const SUB =
  "OpsQ מתחבר ל-Gmail וליומן Google של העסק. הוא קורא ומסכם מיילים, מנסח תשובות וקובע פגישות, ושום פעולה חשובה לא יוצאת בלי אישור.";

export function VariantHero({ v, index, tag = "כיוון" }: { v: Variant; index: number; tag?: string }) {
  const p = v.palette;
  const vars = {
    "--bg": p.bg,
    "--fg": p.fg,
    "--muted": p.muted,
    "--accent": p.accent,
    "--accent-text": p.accentText,
    "--card": p.card,
    "--card-fg": p.cardFg,
    "--line": p.line,
    "--ok": p.ok,
    "--accent-bg": p.gradient ?? p.accent,
  } as CSSProperties;
  const titleB: CSSProperties = p.gradient
    ? { backgroundImage: p.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
    : {
        color: p.titleAccent ?? p.accent,
        ...(p.titleHighlight && {
          backgroundImage: `linear-gradient(transparent 58%, ${p.titleHighlight} 58%)`,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }),
      };

  return (
    <section id={v.id} style={vars} className="bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] py-4">
          <div className="ltr flex items-center gap-2">
            {v.mark}
            {v.wordmark}
          </div>
          <span className="rounded-full bg-[var(--fg)] px-4 py-2 text-sm font-medium text-[var(--bg)]">
            בקשת הדגמה
          </span>
        </div>

        <div className="grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <h2
              className="text-[2.4rem] font-bold leading-[1.12] tracking-tight sm:text-[3rem] lg:text-[3.2rem]"
              style={v.headingFont ? { fontFamily: v.headingFont } : undefined}
            >
              {v.titleA}
              <br />
              <span style={titleB}>{v.titleB}</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{SUB}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-[image:var(--accent-bg)] bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-text)]">
                בקשת הדגמה
              </span>
              <span className="rounded-full border border-[var(--line)] px-6 py-3 font-medium">
                איך זה עובד
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 text-[var(--card-fg)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-3 text-[0.93rem]">
              <div className="max-w-[85%] self-end rounded-2xl rounded-se-md bg-[image:var(--accent-bg)] bg-[var(--accent)] px-4 py-2.5 text-[var(--accent-text)]">
                תקבע פגישה עם יותם כהן מחר ב-15:00
              </div>
              <div className="max-w-[90%] self-start rounded-2xl rounded-ss-md border border-[var(--line)] px-4 py-2.5">
                מחר ב-15:00 פנוי. להוסיף את הפגישה ליומן?
              </div>
              <div className="self-start rounded-2xl border border-[var(--accent)] p-4" style={{ width: "92%" }}>
                <div className="text-xs font-semibold text-[var(--accent)]">ממתין לאישור</div>
                <div className="mt-1.5 font-medium">יצירת אירוע ביומן</div>
                <div className="mt-0.5 text-sm opacity-70">פגישה עם יותם כהן · מחר, 15:00–16:00</div>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-lg bg-[var(--ok)] px-4 py-1.5 text-sm font-medium" style={{ color: p.okText ?? "#ffffff" }}>אישור</span>
                  <span className="rounded-lg border border-[var(--line)] px-4 py-1.5 text-sm opacity-80">דחייה</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-3 text-center text-sm text-[var(--muted)]">
        <span className="font-semibold text-[var(--fg)]">{tag} {index}</span> · {v.label} · {v.note}
      </div>
    </section>
  );
}
