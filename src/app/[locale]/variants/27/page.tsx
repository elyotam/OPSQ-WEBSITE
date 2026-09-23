import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import { VariantHero, type Palette, type Variant } from "@/components/variants/VariantHero";
import { GridMark } from "@/components/variants/Marks";

// Colour studies for brand direction 27 (graphite + one lit tile). Internal, not indexed.
export const metadata: Metadata = { title: "OpsQ — כיוון 27, גוונים", robots: { index: false } };

const notoSans = Noto_Sans_Hebrew({ subsets: ["hebrew", "latin"], weight: ["600", "800"] });

type Shade = {
  id: string;
  label: string;
  note: string;
  /** Colour of the lit tile in the logo. */
  lit: string;
  palette: Palette;
};

const graphite = {
  bg: "#f5f5f4",
  fg: "#1c1917",
  muted: "#57534e",
  card: "#1c1917",
  cardFg: "#f5f5f4",
  line: "#e2e0de",
};

const shades: Shade[] = [
  {
    id: "orange",
    label: "גרפיט וכתום",
    note: "המקורי. חם, אנרגטי, בולט",
    lit: "#ea580c",
    palette: { ...graphite, accent: "#ea580c", accentText: "#1c1917", titleAccent: "#c2410c", ok: "#ea580c", okText: "#1c1917" },
  },
  {
    id: "teal",
    label: "גרפיט וטורקיז",
    note: "רענן ומקצועי, מרגיש טכנולוגי ובטוח",
    lit: "#14b8a6",
    palette: { ...graphite, accent: "#0f766e", accentText: "#ffffff", titleAccent: "#0f766e", ok: "#14b8a6", okText: "#042f2e" },
  },
  {
    id: "yellow",
    label: "גרפיט וצהוב",
    note: "כמו שלטי אזהרה ומכונות: תעשייתי במלוא מובן המילה",
    lit: "#facc15",
    palette: { ...graphite, accent: "#facc15", accentText: "#1c1917", titleAccent: "#a16207", ok: "#facc15", okText: "#1c1917" },
  },
  {
    id: "blue",
    label: "גרפיט וכחול חשמלי",
    note: "אמין ומוכר, הכי \"עסקי\" מכולם",
    lit: "#3b82f6",
    palette: { ...graphite, accent: "#2563eb", accentText: "#ffffff", titleAccent: "#1d4ed8", ok: "#2563eb", okText: "#ffffff" },
  },
  {
    id: "red",
    label: "גרפיט ואדום",
    note: "חד ונחרץ, תופס את העין מיד",
    lit: "#ef4444",
    palette: { ...graphite, accent: "#dc2626", accentText: "#ffffff", titleAccent: "#b91c1c", ok: "#dc2626", okText: "#ffffff" },
  },
  {
    id: "lime",
    label: "גרפיט וליים",
    note: "צעיר ורענן, מרגיש כמו סטארטאפ",
    lit: "#84cc16",
    palette: { ...graphite, accent: "#84cc16", accentText: "#1c1917", titleAccent: "#4d7c0f", ok: "#84cc16", okText: "#1c1917" },
  },
  {
    id: "violet",
    label: "גרפיט וסגול",
    note: "חדשני, קרוב לשפה של עולם ה-AI",
    lit: "#8b5cf6",
    palette: { ...graphite, accent: "#7c3aed", accentText: "#ffffff", titleAccent: "#6d28d9", ok: "#7c3aed", okText: "#ffffff" },
  },
  {
    id: "magenta",
    label: "גרפיט ומג׳נטה",
    note: "נועז ושונה, אף אחד בתחום לא נראה ככה",
    lit: "#ec4899",
    palette: { ...graphite, accent: "#db2777", accentText: "#ffffff", titleAccent: "#be185d", ok: "#db2777", okText: "#ffffff" },
  },
  {
    id: "dark",
    label: "גרפיט כהה וכתום",
    note: "אותו כתום על רקע כהה: יוקרתי ודרמטי",
    lit: "#f97316",
    palette: {
      bg: "#1c1917", fg: "#f5f5f4", muted: "#a8a29e", card: "#292524", cardFg: "#f5f5f4", line: "#3a3531",
      accent: "#f97316", accentText: "#1c1917", titleAccent: "#fb923c", ok: "#f97316", okText: "#1c1917",
    },
  },
  {
    id: "cream",
    label: "שמנת חמה וכתום",
    note: "אותו כתום על רקע חם במקום אפור: נעים ומזמין יותר",
    lit: "#ea580c",
    palette: {
      bg: "#f6f1e9", fg: "#231d17", muted: "#5f564c", card: "#231d17", cardFg: "#f6f1e9", line: "#e6ddd0",
      accent: "#ea580c", accentText: "#1c1917", titleAccent: "#c2410c", ok: "#ea580c", okText: "#1c1917",
    },
  },
  {
    id: "teal-deep",
    label: "טורקיז פטרול",
    note: "טורקיז עמוק וכהה: הכי רציני ובוגר מבין הטורקיזים",
    lit: "#0d9488",
    palette: { ...graphite, accent: "#115e59", accentText: "#ffffff", titleAccent: "#115e59", ok: "#115e59", okText: "#ffffff" },
  },
  {
    id: "teal-mint",
    label: "טורקיז מנטה",
    note: "טורקיז בהיר ומואר: הכי רענן וקליל",
    lit: "#2dd4bf",
    palette: { ...graphite, accent: "#2dd4bf", accentText: "#042f2e", titleAccent: "#0f766e", ok: "#2dd4bf", okText: "#042f2e" },
  },
  {
    id: "teal-cyan",
    label: "טורקיז כחלחל",
    note: "נוטה לכחול: מרגיש טכנולוגי וקריר יותר",
    lit: "#06b6d4",
    palette: { ...graphite, accent: "#0e7490", accentText: "#ffffff", titleAccent: "#0e7490", ok: "#0e7490", okText: "#ffffff" },
  },
  {
    id: "teal-dark",
    label: "טורקיז על רקע כהה",
    note: "טורקיז זוהר על רקע כמעט שחור: דרמטי ויוקרתי",
    lit: "#2dd4bf",
    palette: {
      bg: "#0f1716", fg: "#ecfdf5", muted: "#9fb5b0", card: "#17211f", cardFg: "#ecfdf5", line: "#26332f",
      accent: "#2dd4bf", accentText: "#042f2e", titleAccent: "#5eead4", ok: "#2dd4bf", okText: "#042f2e",
    },
  },
  {
    id: "teal-cool",
    label: "טורקיז על אפור קריר",
    note: "אותו טורקיז של גוון 2, על רקע אפור-ירקרק במקום אפור חם: נקי ואחיד יותר",
    lit: "#14b8a6",
    palette: {
      bg: "#f1f5f5", fg: "#0f1f1e", muted: "#4b5d5b", card: "#0f1f1e", cardFg: "#f1f5f5", line: "#dbe5e4",
      accent: "#0f766e", accentText: "#ffffff", titleAccent: "#0f766e", ok: "#14b8a6", okText: "#042f2e",
    },
  },
];

const toVariant = (s: Shade): Variant => ({
  id: s.id,
  label: s.label,
  note: s.note,
  palette: s.palette,
  mark: <GridMark fg={s.palette.fg} accent={s.lit} bg={s.palette.bg} />,
  wordmark: <span className={`${notoSans.className} text-2xl font-extrabold`}>OpsQ</span>,
  titleA: "כל התפעול במקום אחד.",
  titleB: "כל אישור בלחיצה.",
  headingFont: notoSans.style.fontFamily,
});

export default function Direction27Page() {
  return (
    <main>
      <div className="bg-[#1c1917] px-4 py-6 text-center text-[#f5f5f4]">
        <p className="text-lg font-semibold">כיוון 27 · 15 גוונים (11–15: טורקיז)</p>
        <p className="mt-1 text-sm opacity-70">אותו לוגו, אותו גופן ואותה כותרת. משתנים רק הצבעים.</p>
      </div>

      <section className="bg-[#e7e5e4] px-4 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {shades.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ background: s.palette.bg, color: s.palette.fg }}
            >
              <span className="ltr flex items-center gap-2">
                <GridMark fg={s.palette.fg} accent={s.lit} bg={s.palette.bg} className="h-10 w-10" />
                <span className={`${notoSans.className} text-2xl font-extrabold`}>OpsQ</span>
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: s.palette.accent, color: s.palette.accentText }}
              >
                בקשת הדגמה
              </span>
              <span className="text-sm font-medium">
                {i + 1}. {s.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {shades.map((s, i) => (
        <VariantHero key={s.id} v={toVariant(s)} index={i + 1} tag="גוון" />
      ))}
    </main>
  );
}
