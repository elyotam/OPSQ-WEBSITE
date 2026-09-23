import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import {
  Alef,
  Assistant,
  Bellefair,
  David_Libre,
  Frank_Ruhl_Libre,
  Heebo,
  Miriam_Libre,
  Noto_Sans_Hebrew,
  Noto_Serif_Hebrew,
  Rubik,
  Secular_One,
  Suez_One,
  Varela_Round,
} from "next/font/google";
import { VariantHero, type Variant } from "@/components/variants/VariantHero";
import {
  ArchCheck,
  BlockQ,
  BoltMark,
  BracketQ,
  BubbleCheck,
  CalendarCheck,
  CheckQ,
  ClockCheck,
  CompassMark,
  DoubleCheck,
  KeyQ,
  LinkedRings,
  LoopMark,
  SquircleQ,
  StampCheck,
  SunriseMark,
  ToggleMark,
  CutoutQ,
  FriendlyQ,
  GridMark,
  InboxCheck,
  OrbitMark,
  PersonSpark,
  PlaneMark,
  QueueMark,
  SealQ,
  ShieldCheck,
  SparkMark,
  SparkRing,
  SpeechQ,
} from "@/components/variants/Marks";

// Internal page for choosing a brand direction. Not linked from the site and not indexed.
export const metadata: Metadata = { title: "OpsQ — כיווני מיתוג", robots: { index: false } };

const frank = Frank_Ruhl_Libre({ subsets: ["hebrew", "latin"], weight: ["500", "700"] });
const rubik = Rubik({ subsets: ["hebrew", "latin"], weight: ["500", "700"] });
const suez = Suez_One({ subsets: ["hebrew", "latin"], weight: "400" });
const assistant = Assistant({ subsets: ["hebrew", "latin"], weight: ["600", "800"] });
const varela = Varela_Round({ subsets: ["hebrew", "latin"], weight: "400" });
const bellefair = Bellefair({ subsets: ["hebrew", "latin"], weight: "400" });
const secular = Secular_One({ subsets: ["hebrew", "latin"], weight: "400" });
const heebo = Heebo({ subsets: ["hebrew", "latin"], weight: ["600", "800"] });
const notoSerif = Noto_Serif_Hebrew({ subsets: ["hebrew", "latin"], weight: ["600", "700"] });
const alef = Alef({ subsets: ["hebrew", "latin"], weight: ["400", "700"] });
const david = David_Libre({ subsets: ["hebrew", "latin"], weight: ["500", "700"] });
const notoSans = Noto_Sans_Hebrew({ subsets: ["hebrew", "latin"], weight: ["600", "800"] });
const miriam = Miriam_Libre({ subsets: ["hebrew", "latin"], weight: ["400", "700"] });

const word = (text: ReactNode, className: string, style?: CSSProperties) => (
  <span className={className} style={style}>
    {text}
  </span>
);

const variants: Variant[] = [
  {
    id: "a",
    label: "שמנת וכתום",
    note: "חם ונגיש. הלוגו: Q שהזנב שלה הוא סימן אישור",
    palette: {
      bg: "#faf7f2", fg: "#1a1714", muted: "#5b544c", accent: "#e2552d", accentText: "#ffffff",
      card: "#15120f", cardFg: "#faf7f2", line: "#e6ded1", ok: "#2f9e72",
    },
    mark: <CheckQ fg="#1a1714" accent="#e2552d" bg="#faf7f2" />,
    wordmark: word(<>Ops<span style={{ color: "#e2552d" }}>Q</span></>, "text-2xl font-semibold tracking-tight"),
    titleA: "העבודה נעשית לבד.",
    titleB: "ההחלטות נשארות אצלך.",
  },
  {
    id: "b",
    label: "לילה ומנטה",
    note: "טכנולוגי ויוקרתי. הלוגו: בועת שיחה עם סימן אישור",
    palette: {
      bg: "#0d1211", fg: "#eef5f1", muted: "#9fb0a8", accent: "#34d399", accentText: "#06231a",
      card: "#152019", cardFg: "#eef5f1", line: "#26332d", ok: "#10b981",
    },
    mark: <BubbleCheck fg="#eef5f1" accent="#34d399" bg="#0d1211" />,
    wordmark: word("OpsQ", "text-2xl font-semibold tracking-tight"),
    titleA: "עובד דיגיטלי שעושה את העבודה,",
    titleB: "ולא זז בלי אישור.",
  },
  {
    id: "c",
    label: "כחול לילה וזהב",
    note: "מקצועי ובטוח, כמו משרד ייעוץ. הלוגו: חותם עם מונוגרמה",
    palette: {
      bg: "#f6f4ef", fg: "#0f1b2d", muted: "#4a5568", accent: "#b8892f", accentText: "#ffffff",
      card: "#0f1b2d", cardFg: "#f6f4ef", line: "#ddd6c8", ok: "#b8892f",
    },
    mark: <SealQ fg="#0f1b2d" accent="#c9a24b" bg="#0f1b2d" />,
    wordmark: word("OpsQ", `${frank.className} text-2xl font-bold tracking-wide`),
    titleA: "המיילים והיומן של העסק מסודרים.",
    titleB: "בלי לוותר על השליטה.",
    headingFont: frank.style.fontFamily,
  },
  {
    id: "d",
    label: "לבן וסגול חשמלי",
    note: "מינימליסטי ועכשווי. הלוגו: תור משימות (Q = Queue)",
    palette: {
      bg: "#ffffff", fg: "#15132b", muted: "#5d5a78", accent: "#5b3df5", accentText: "#ffffff",
      card: "#f4f2ff", cardFg: "#15132b", line: "#e6e3f5", ok: "#5b3df5",
    },
    mark: <QueueMark fg="#15132b" accent="#5b3df5" bg="#ffffff" />,
    wordmark: word("opsq", `${rubik.className} text-2xl font-bold tracking-tight`),
    titleA: "כל המשימות בתור.",
    titleB: "כל ההחלטות אצלך.",
    headingFont: rubik.style.fontFamily,
  },
  {
    id: "e",
    label: "שחור־לבן עיתונאי",
    note: "נקי ואלגנטי כמו מגזין. הלוגו: Q חצובה בתוך ריבוע שחור",
    palette: {
      bg: "#f7f6f3", fg: "#111111", muted: "#555555", accent: "#111111", accentText: "#f7f6f3",
      card: "#ffffff", cardFg: "#111111", line: "#dcdad4", ok: "#111111", titleAccent: "#8a8a8a",
    },
    mark: <CutoutQ fg="#111111" accent="#111111" bg="#f7f6f3" />,
    wordmark: word("OpsQ", `${suez.className} text-2xl`),
    titleA: "עובד אחד שלא נח.",
    titleB: "ואף פעם לא פועל לבד.",
    headingFont: suez.style.fontFamily,
  },
  {
    id: "f",
    label: "ירוק יער ושמנת",
    note: "רגוע, טבעי ובוגר. הלוגו: מסלול שהסוכן מקיף בו את העסק",
    palette: {
      bg: "#f3f0e6", fg: "#1f3d2b", muted: "#52614f", accent: "#2f6b45", accentText: "#f3f0e6",
      card: "#1f3d2b", cardFg: "#f3f0e6", line: "#d9d4c3", ok: "#9bc53d",
    },
    mark: <OrbitMark fg="#1f3d2b" accent="#9bc53d" bg="#f3f0e6" />,
    wordmark: word("OpsQ", `${assistant.className} text-2xl font-extrabold`),
    titleA: "העסק ממשיך לזוז,",
    titleB: "גם בלי לשבת מול המחשב.",
    headingFont: assistant.style.fontFamily,
  },
  {
    id: "g",
    label: "אלמוג ופודרה",
    note: "ידידותי וחייכני, לעסקים קטנים. הלוגו: אריח עם פרצוף מחייך",
    palette: {
      bg: "#fff6f2", fg: "#2b1d1a", muted: "#6e5a54", accent: "#ff6b5b", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#2b1d1a", line: "#f5ddd5", ok: "#2bb673",
    },
    mark: <FriendlyQ fg="#2b1d1a" accent="#ff6b5b" bg="#fff6f2" />,
    wordmark: word("OpsQ", `${varela.className} text-2xl`),
    titleA: "עובד חדש בצוות,",
    titleB: "שכבר מכיר את המייל והיומן.",
    headingFont: varela.style.fontFamily,
  },
  {
    id: "h",
    label: "אורורה",
    note: "עתידני, עם מעבר צבע סגול־טורקיז. הלוגו: טבעת עם ניצוץ",
    palette: {
      bg: "#0b0f1f", fg: "#eef0ff", muted: "#a3a9c9", accent: "#8b7cf6", accentText: "#0b0f1f",
      card: "#131936", cardFg: "#eef0ff", line: "#252c52", ok: "#22d3ee",
      gradient: "linear-gradient(100deg, #a78bfa, #22d3ee)",
    },
    mark: <SparkRing fg="#eef0ff" accent="#22d3ee" bg="#0b0f1f" id="spark-h" />,
    wordmark: word("OpsQ", "text-2xl font-semibold tracking-tight"),
    titleA: "ה-AI מבצע.",
    titleB: "ההחלטה שלך.",
  },
  {
    id: "i",
    label: "טרקוטה ואבן",
    note: "חם, ארצי ויוקרתי בשקט. הלוגו: קשת כמו דלת לעסק, עם סימן אישור",
    palette: {
      bg: "#efe9e1", fg: "#2a2420", muted: "#6b5f56", accent: "#b5532f", accentText: "#ffffff",
      card: "#3a2f28", cardFg: "#efe9e1", line: "#d8cdbf", ok: "#b5532f",
    },
    mark: <ArchCheck fg="#2a2420" accent="#b5532f" bg="#efe9e1" />,
    wordmark: word("OpsQ", `${bellefair.className} text-[1.7rem] tracking-wide`),
    titleA: "שקט תפעולי.",
    titleB: "כל פעולה עוברת דרכך.",
    headingFont: bellefair.style.fontFamily,
  },
  {
    id: "j",
    label: "צהוב ושחור",
    note: "נועז, אנרגטי ובולט. הלוגו: Q כבדה עם זנב מרובע",
    palette: {
      bg: "#ffd60a", fg: "#0b0b0b", muted: "#3d3a2a", accent: "#0b0b0b", accentText: "#ffd60a",
      card: "#ffffff", cardFg: "#0b0b0b", line: "#e0bb00", ok: "#0b0b0b", titleAccent: "#ffffff",
    },
    mark: <BlockQ fg="#0b0b0b" accent="#0b0b0b" bg="#ffd60a" />,
    wordmark: word("OPSQ", `${secular.className} text-2xl`),
    titleA: "פחות מיילים. פחות תיאומים.",
    titleB: "יותר עסק.",
    headingFont: secular.style.fontFamily,
  },
  {
    id: "k",
    label: "תכלת עמוק ולבן",
    note: "צלול ובטוח. הלוגו: מתג במצב פעיל, השליטה אצל העסק",
    palette: {
      bg: "#f5f9fc", fg: "#0d2233", muted: "#46596a", accent: "#0b6e99", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#0d2233", line: "#dbe6ee", ok: "#0b6e99",
    },
    mark: <ToggleMark fg="#0d2233" accent="#0b6e99" bg="#ffffff" />,
    wordmark: word("OpsQ", `${heebo.className} text-2xl font-extrabold`),
    titleA: "את השליטה לא מוסרים.",
    titleB: "רק את העבודה.",
    headingFont: heebo.style.fontFamily,
  },
  {
    id: "l",
    label: "זית ושמנת",
    note: "בוגר וטבעי. הלוגו: Q שהזנב שלה הוא מפתח",
    palette: {
      bg: "#f6f4ec", fg: "#232a1c", muted: "#5a6150", accent: "#56642a", accentText: "#ffffff",
      card: "#2c3423", cardFg: "#f6f4ec", line: "#dedac9", ok: "#7d8f3c",
    },
    mark: <KeyQ fg="#232a1c" accent="#8a9a3f" bg="#f6f4ec" />,
    wordmark: word("OpsQ", `${notoSerif.className} text-2xl font-bold`),
    titleA: "המפתחות אצלך.",
    titleB: "העבודה אצלו.",
    headingFont: notoSerif.style.fontFamily,
  },
  {
    id: "m",
    label: "בורדו ושמנת",
    note: "קלאסי ומכובד. הלוגו: חותמת אישור עגולה",
    palette: {
      bg: "#fbf6f1", fg: "#2a1316", muted: "#6a5052", accent: "#9e1b32", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#2a1316", line: "#eddcd3", ok: "#9e1b32",
    },
    mark: <StampCheck fg="#2a1316" accent="#9e1b32" bg="#fbf6f1" />,
    wordmark: word("OpsQ", `${frank.className} text-2xl font-bold`),
    titleA: "כל פעולה מקבלת חותמת.",
    titleB: "את החותמת שלך.",
    headingFont: frank.style.fontFamily,
  },
  {
    id: "n",
    label: "כחול רויאל ולבן",
    note: "נקי וחד, מוכר ומרגיע. הלוגו: שעון שהמחוגים שלו הם סימן אישור",
    palette: {
      bg: "#ffffff", fg: "#0c1a3a", muted: "#4b5775", accent: "#1f4fd6", accentText: "#ffffff",
      card: "#0c1a3a", cardFg: "#ffffff", line: "#e3e8f3", ok: "#22a06b",
    },
    mark: <ClockCheck fg="#0c1a3a" accent="#1f4fd6" bg="#ffffff" />,
    wordmark: word("OpsQ", `${assistant.className} text-2xl font-extrabold`),
    titleA: "הזמן שלך חוזר אליך.",
    titleB: "העבודה ממשיכה.",
    headingFont: assistant.style.fontFamily,
  },
  {
    id: "o",
    label: "מרווה ופחם",
    note: "רגוע וברור. הלוגו: שני סימני וי, ביקשת ובוצע",
    palette: {
      bg: "#f2f5f1", fg: "#1c2320", muted: "#4e5a54", accent: "#2e7d5b", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#1c2320", line: "#d9e2dc", ok: "#2e7d5b",
    },
    mark: <DoubleCheck fg="#1c2320" accent="#6fd3a3" bg="#f2f5f1" />,
    wordmark: word("OpsQ", `${rubik.className} text-2xl font-bold`),
    titleA: "ביקשת. הוא בדק.",
    titleB: "אישרת. זה בוצע.",
    headingFont: rubik.style.fontFamily,
  },
  {
    id: "p",
    label: "אפרסק וכחול כהה",
    note: "חם ומזמין, עם ניגוד חזק. הלוגו: שתי טבעות שלובות, העסק והסוכן",
    palette: {
      bg: "#fff4ec", fg: "#1b2440", muted: "#555d78", accent: "#c2410c", accentText: "#ffffff",
      card: "#1b2440", cardFg: "#fff4ec", line: "#f1dccc", ok: "#c2410c",
    },
    mark: <LinkedRings fg="#1b2440" accent="#c2410c" bg="#fff4ec" />,
    wordmark: word("OpsQ", `${alef.className} text-2xl font-bold`),
    titleA: "הצוות גדל באחד.",
    titleB: "בלי ראיונות ובלי גיוס.",
    headingFont: alef.style.fontFamily,
  },
  {
    id: "q",
    label: "שזיף ובז׳",
    note: "אלגנטי ושונה. הלוגו: דף יומן עם סימן אישור",
    palette: {
      bg: "#f8f5f0", fg: "#2a1b33", muted: "#5f5266", accent: "#6b2fa3", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#2a1b33", line: "#e8e0e8", ok: "#6b2fa3",
    },
    mark: <CalendarCheck fg="#2a1b33" accent="#6b2fa3" bg="#f8f5f0" />,
    wordmark: word("OpsQ", `${david.className} text-[1.7rem] font-bold`),
    titleA: "היומן מתמלא.",
    titleB: "תיבת המייל מתרוקנת.",
    headingFont: david.style.fontFamily,
  },
  {
    id: "r",
    label: "טורקיז עמוק",
    note: "רענן ומקצועי. הלוגו: חץ מעגלי, השגרה רצה לבד",
    palette: {
      bg: "#f4fbfa", fg: "#0f2a2a", muted: "#48605f", accent: "#0f766e", accentText: "#ffffff",
      card: "#0f2a2a", cardFg: "#f4fbfa", line: "#d5ebe8", ok: "#14b8a6",
    },
    mark: <LoopMark fg="#0f2a2a" accent="#0f766e" bg="#f4fbfa" />,
    wordmark: word("OpsQ", `${notoSans.className} text-2xl font-extrabold`),
    titleA: "השגרה רצה לבד.",
    titleB: "החריגים מגיעים אליך.",
    headingFont: notoSans.style.fontFamily,
  },
  {
    id: "s",
    label: "שחור וליים",
    note: "צעיר ושובב, עם הדגשה כמו טוש זוהר. הלוגו: q קטנה בתוך ריבוע רך",
    palette: {
      bg: "#fafaf5", fg: "#111111", muted: "#4d4d4d", accent: "#111111", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#111111", line: "#e5e5dc", ok: "#111111",
      titleAccent: "#111111", titleHighlight: "#c8f169",
    },
    mark: <SquircleQ fg="#111111" accent="#c8f169" bg="#fafaf5" />,
    wordmark: word("opsq", `${miriam.className} text-2xl font-bold`),
    titleA: "העוזר האישי של העסק.",
    titleB: "מדבר עברית, עובד בלי הפסקה.",
    headingFont: miriam.style.fontFamily,
  },
  {
    id: "t",
    label: "זריחה וכחול לילה",
    note: "אופטימי וחם. הלוגו: שמש עולה, היום מתחיל מסודר",
    palette: {
      bg: "#fffaf3", fg: "#1d2340", muted: "#565c78", accent: "#b4410f", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#1d2340", line: "#f0e2cf", ok: "#1d2340",
    },
    mark: <SunriseMark fg="#1d2340" accent="#e8742c" bg="#fffaf3" />,
    wordmark: word("OpsQ", `${rubik.className} text-2xl font-bold`),
    titleA: "שואלים ״מה חשוב היום?״",
    titleB: "ומקבלים תשובה.",
    headingFont: rubik.style.fontFamily,
  },
  {
    id: "u",
    label: "כחול פלדה ולבן",
    note: "יציב ומגן. הלוגו: מגן עם סימן אישור",
    palette: {
      bg: "#f4f6f8", fg: "#13202e", muted: "#4a5866", accent: "#2b5a8a", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#13202e", line: "#dce3ea", ok: "#2b5a8a",
    },
    mark: <ShieldCheck fg="#13202e" accent="#2b5a8a" bg="#f4f6f8" />,
    wordmark: word("OpsQ", `${assistant.className} text-2xl font-extrabold`),
    titleA: "גישה מלאה לעבודה.",
    titleB: "אפס פעולות בלי אישור.",
    headingFont: assistant.style.fontFamily,
  },
  {
    id: "v",
    label: "מנדרינה ולבן",
    note: "שיחתי ואנרגטי. הלוגו: בועת שיחה שהזנב שלה הוא הזנב של ה-Q",
    palette: {
      bg: "#ffffff", fg: "#1f1a17", muted: "#5c534d", accent: "#c24a00", accentText: "#ffffff",
      card: "#1f1a17", cardFg: "#ffffff", line: "#efe6de", ok: "#c24a00",
    },
    mark: <SpeechQ fg="#ffffff" accent="#c24a00" bg="#ffffff" />,
    wordmark: word("OpsQ", `${varela.className} text-2xl`),
    titleA: "כותבים לו כמו לעובד.",
    titleB: "הוא עונה כמו עובד.",
    headingFont: varela.style.fontFamily,
  },
  {
    id: "w",
    label: "אינדיגו ולבנדר",
    note: "רך ומקצועי. הלוגו: מגש דואר עם סימן אישור",
    palette: {
      bg: "#f6f5ff", fg: "#1e1b4b", muted: "#524f7a", accent: "#4338ca", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#1e1b4b", line: "#e2e0f7", ok: "#4338ca",
    },
    mark: <InboxCheck fg="#1e1b4b" accent="#4338ca" bg="#f6f5ff" />,
    wordmark: word("OpsQ", `${heebo.className} text-2xl font-extrabold`),
    titleA: "תיבת מייל עמוסה?",
    titleB: "מקבלים סיכום בשורה.",
    headingFont: heebo.style.fontFamily,
  },
  {
    id: "x",
    label: "חול וזהב חם",
    note: "יוקרתי וחם. הלוגו: ניצוץ, הסימן המוכר של AI",
    palette: {
      bg: "#fbf7ef", fg: "#2b2111", muted: "#62553f", accent: "#8a5a00", accentText: "#ffffff",
      card: "#2b2111", cardFg: "#fbf7ef", line: "#ebe1cd", ok: "#b07a12",
    },
    mark: <SparkMark fg="#2b2111" accent="#c99a2e" bg="#fbf7ef" />,
    wordmark: word("OpsQ", `${frank.className} text-2xl font-bold`),
    titleA: "AI שעובד בשבילך.",
    titleB: "לא במקומך.",
    headingFont: frank.style.fontFamily,
  },
  {
    id: "y",
    label: "אלמוג עמוק",
    note: "הגרסה הנגישה של כיוון 7: חם וידידותי אבל רציני יותר. הלוגו: דמות עם ניצוץ",
    palette: {
      bg: "#fff7f5", fg: "#2b1d1a", muted: "#6e5a54", accent: "#c53a2c", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#2b1d1a", line: "#f3dcd5", ok: "#1f8a5b",
    },
    mark: <PersonSpark fg="#2b1d1a" accent="#c53a2c" bg="#fff7f5" />,
    wordmark: word("OpsQ", `${rubik.className} text-2xl font-bold`),
    titleA: "העובד החדש כבר כאן.",
    titleB: "עם גישה רק למה שאישרת.",
    headingFont: rubik.style.fontFamily,
  },
  {
    id: "z",
    label: "חשמל ושחור",
    note: "כהה, מהיר ובולט. הלוגו: ברק בתוך עיגול",
    palette: {
      bg: "#0f0f10", fg: "#f5f5f5", muted: "#a1a1a6", accent: "#facc15", accentText: "#111111",
      card: "#1a1a1c", cardFg: "#f5f5f5", line: "#2c2c30", ok: "#facc15",
    },
    mark: <BoltMark fg="#0f0f10" accent="#facc15" bg="#0f0f10" />,
    wordmark: word("OpsQ", `${secular.className} text-2xl`),
    titleA: "מהיר כמו הודעה.",
    titleB: "זהיר כמו רואה חשבון.",
    headingFont: secular.style.fontFamily,
  },
  {
    id: "aa",
    label: "גרפיט וכתום",
    note: "תעשייתי ומסודר. הלוגו: ארבעה אריחים, אחד דולק",
    palette: {
      bg: "#f5f5f4", fg: "#1c1917", muted: "#57534e", accent: "#ea580c", accentText: "#1c1917",
      card: "#1c1917", cardFg: "#f5f5f4", line: "#e2e0de", ok: "#ea580c", titleAccent: "#c2410c",
    },
    mark: <GridMark fg="#1c1917" accent="#ea580c" bg="#f5f5f4" />,
    wordmark: word("OpsQ", `${notoSans.className} text-2xl font-extrabold`),
    titleA: "כל התפעול במקום אחד.",
    titleB: "כל אישור בלחיצה.",
    headingFont: notoSans.style.fontFamily,
  },
  {
    id: "ab",
    label: "שמיים ולבן",
    note: "קליל ואוורירי. הלוגו: מטוס נייר, הטיוטה מוכנה לשליחה",
    palette: {
      bg: "#f0f7ff", fg: "#0b2545", muted: "#48607d", accent: "#0369a1", accentText: "#ffffff",
      card: "#ffffff", cardFg: "#0b2545", line: "#d7e7f7", ok: "#0369a1",
    },
    mark: <PlaneMark fg="#0b2545" accent="#38bdf8" bg="#f0f7ff" />,
    wordmark: word("OpsQ", `${alef.className} text-2xl font-bold`),
    titleA: "הטיוטה מוכנה.",
    titleB: "רק צריך לאשר ולשלוח.",
    headingFont: alef.style.fontFamily,
  },
  {
    id: "ac",
    label: "ירוק טרמינל",
    note: "כהה וטכני, בסגנון מסוף מחשב. הלוגו: Q בתוך סוגריים מרובעים",
    palette: {
      bg: "#0c1410", fg: "#d1fae5", muted: "#8fb5a2", accent: "#4ade80", accentText: "#052e16",
      card: "#111c16", cardFg: "#d1fae5", line: "#1f3328", ok: "#22c55e",
    },
    mark: <BracketQ fg="#d1fae5" accent="#4ade80" bg="#0c1410" />,
    wordmark: word("OpsQ", "text-2xl font-semibold tracking-tight"),
    titleA: "תפעול על טייס אוטומטי.",
    titleB: "היד נשארת על ההגה.",
  },
  {
    id: "ad",
    label: "כחול ים ואדום",
    note: "ימי ובטוח, עם ניגוד חזק. הלוגו: מצפן",
    palette: {
      bg: "#fdf8f3", fg: "#102a43", muted: "#4f6275", accent: "#c53030", accentText: "#ffffff",
      card: "#102a43", cardFg: "#fdf8f3", line: "#ece2d6", ok: "#c53030",
    },
    mark: <CompassMark fg="#102a43" accent="#c53030" bg="#fdf8f3" />,
    wordmark: word("OpsQ", `${notoSerif.className} text-2xl font-bold`),
    titleA: "יותר זמן לנהל את העסק.",
    titleB: "פחות זמן לתפעל אותו.",
    headingFont: notoSerif.style.fontFamily,
  },
];

export default function VariantsPage() {
  return (
    <main>
      <div className="bg-[#1a1714] px-4 py-5 text-center text-[#faf7f2]">
        <p className="text-lg font-semibold">30 כיווני מיתוג ל-OpsQ</p>
        <p className="mt-1 text-sm opacity-70">
          לכל כיוון לוגו, צבעים, גופן וכותרת משלו. אפשר לבחור כיוון שלם, או לשלב, למשל &quot;הלוגו של 2 עם הצבעים של 1&quot;.
        </p>
        <nav className="mt-3 flex flex-wrap justify-center gap-2 text-sm">
          {variants.map((v, i) => (
            <a key={v.id} href={`#${v.id}`} className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10">
              {i + 1}. {v.label}
            </a>
          ))}
        </nav>
      </div>
      {variants.map((v, i) => (
        <VariantHero key={v.id} v={v} index={i + 1} />
      ))}
    </main>
  );
}
