// Candidate logo marks for the brand comparison page. Each takes its colours from props.

type MarkProps = { accent: string; fg: string; bg: string; className?: string };

// A — Q whose tail is a check mark.
export function CheckQ({ accent, fg, bg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="14.5" cy="14.5" r="9.5" fill="none" stroke={fg} strokeWidth="3.4" />
      <path d="M16 20.5l4 4 8-9.5" fill="none" stroke={bg} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 20.5l4 4 8-9.5" fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// B — a chat bubble with an approval check inside.
export function BubbleCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M6 5h20a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H14l-6 5v-5H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"
        fill="none"
        stroke={fg}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M10.5 14.5l3.5 3.5 7.5-8" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// C — a classic monogram seal: ring and straight tail inside a framed square.
export function SealQ({ accent, bg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill={bg} stroke={accent} strokeWidth="1.4" />
      <circle cx="15" cy="15" r="7" fill="none" stroke={accent} strokeWidth="2.6" />
      <path d="M18.5 18.5l5 5" stroke={accent} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

// D — a queue: stacked tasks, the top one active. Plays on the Q in OpsQ.
export function QueueMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="5" width="24" height="6" rx="3" fill={accent} />
      <rect x="4" y="13.5" width="18" height="6" rx="3" fill={fg} opacity="0.55" />
      <rect x="4" y="22" width="12" height="6" rx="3" fill={fg} opacity="0.25" />
      <circle cx="25" cy="25" r="3" fill={accent} />
    </svg>
  );
}

// E — a solid square with the Q cut out as negative space.
export function CutoutQ({ fg, bg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="3" fill={fg} />
      <circle cx="15" cy="15" r="7" fill="none" stroke={bg} strokeWidth="3.2" />
      <path d="M18 18l7 7" stroke={bg} strokeWidth="3.4" strokeLinecap="square" />
    </svg>
  );
}

// F — a ring with a small body orbiting it: the agent working around the business.
export function OrbitMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="10" fill="none" stroke={fg} strokeWidth="2.6" />
      <circle cx="16" cy="16" r="3.2" fill={fg} />
      <circle cx="24.5" cy="9.5" r="3.6" fill={accent} />
    </svg>
  );
}

// G — a friendly rounded tile: the Q ring reads as a face with a smile tail.
export function FriendlyQ({ accent, bg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="11" fill={accent} />
      <circle cx="12" cy="13.5" r="1.8" fill={bg} />
      <circle cx="20" cy="13.5" r="1.8" fill={bg} />
      <path d="M10.5 19.5c3 3.2 8 3.2 11 0l3 3" fill="none" stroke={bg} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// H — a gradient ring with a spark where the tail would be.
export function SparkRing({ className = "h-9 w-9", id = "spark" }: MarkProps & { id?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="14.5" cy="15.5" r="9" fill="none" stroke={`url(#${id})`} strokeWidth="3.4" />
      <path d="M25 19l1.3 3.2 3.2 1.3-3.2 1.3L25 28l-1.3-3.2-3.2-1.3 3.2-1.3z" fill="#22d3ee" />
    </svg>
  );
}

// I — an arch, like a doorway into the business, with a check at its threshold.
export function ArchCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6 29V14a10 10 0 0 1 20 0v15" fill="none" stroke={fg} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M11 20.5l3.5 3.5 6.5-7.5" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// J — a heavy block Q: solid disc with a square tail. Loud and simple.
export function BlockQ({ fg, bg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill={fg} />
      <circle cx="14" cy="14" r="5" fill={bg} />
      <rect x="19" y="19" width="11" height="11" rx="1.5" fill={fg} />
    </svg>
  );
}

// K — a switch in the "on" position: control stays with the owner.
export function ToggleMark({ accent, bg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="8" width="28" height="16" rx="8" fill={accent} />
      <circle cx="22" cy="16" r="5.5" fill={bg} />
      <path d="M19.6 16.2l1.7 1.7 3.2-3.6" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// L — a Q whose tail is a key: access is given, and can be taken back.
export function KeyQ({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke={fg} strokeWidth="3" />
      <path d="M17.5 17.5L28 28M23.5 23.5l-2.5 2.5M26 26l-2 2" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// M — a round approval stamp.
export function StampCheck({ accent, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13.5" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="16" cy="16" r="10" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M11 16.5l3.5 3.5 7-8" fill="none" stroke={accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// N — a clock face whose hands form a check: time given back.
export function ClockCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12.5" fill="none" stroke={fg} strokeWidth="2.6" />
      <path d="M11 16.5l4 4 7.5-9" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// O — two stacked checks: asked, and done.
export function DoubleCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill={fg} />
      <path d="M5.5 17l4 4 8.5-10" fill="none" stroke={accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 21l1.2-1.2 8.3-8.8" fill="none" stroke={accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// P — two interlocking rings: the business and its agent, working together.
export function LinkedRings({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="12" cy="16" r="8" fill="none" stroke={fg} strokeWidth="3" />
      <circle cx="20" cy="16" r="8" fill="none" stroke={accent} strokeWidth="3" />
    </svg>
  );
}

// Q — a calendar page with a check.
export function CalendarCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="6" width="24" height="22" rx="5" fill="none" stroke={fg} strokeWidth="2.6" />
      <path d="M4 12.5h24M11 3.5v5M21 3.5v5" stroke={fg} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M11 20l3.5 3.5 6.5-7" fill="none" stroke={accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// R — a loop arrow: routine work that runs on its own.
export function LoopMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M26 16a10 10 0 1 1-3-7.1" fill="none" stroke={fg} strokeWidth="3" strokeLinecap="round" />
      <path d="M24.5 3.5v6h-6" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3" fill={accent} />
    </svg>
  );
}

// S — a soft squircle with a lowercase q.
export function SquircleQ({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 1.5c11 0 14.5 3.5 14.5 14.5S27 30.5 16 30.5 1.5 27 1.5 16 5 1.5 16 1.5z" fill={accent} />
      <circle cx="14.5" cy="14" r="5" fill="none" stroke={fg} strokeWidth="2.8" />
      <path d="M19.5 10v14" stroke={fg} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

// T — a sunrise: the day starts already organised.
export function SunriseMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M7 22a9 9 0 0 1 18 0" fill={accent} />
      <path d="M3 25.5h26" stroke={fg} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16 5v4M6.5 9l2.8 2.8M25.5 9l-2.8 2.8" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// U — a shield with a check: nothing gets through without approval.
export function ShieldCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 2.5l11 4v8.5c0 7-4.7 12-11 14.5C9.7 27 5 22 5 15V6.5z" fill="none" stroke={fg} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M11 16l3.5 3.5 6.5-7.5" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// V — a speech bubble whose tail is the tail of the Q.
export function SpeechQ({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M26.5 22.5A12 12 0 1 0 22 26.5l6.5 3z" fill={accent} />
      <circle cx="15" cy="15" r="5.5" fill="none" stroke={fg} strokeWidth="2.6" />
    </svg>
  );
}

// W — an inbox tray with a check: email handled.
export function InboxCheck({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M3.5 18l4-11.5h17l4 11.5v7.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5z" fill="none" stroke={fg} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M3.5 18h7l2 3.5h7l2-3.5h7" fill="none" stroke={fg} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M12 11.5l3 3 5.5-6" fill="none" stroke={accent} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// X — a four-point spark, the common sign for AI, drawn heavy.
export function SparkMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M14 3c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10z" fill={fg} />
      <path d="M25 19c.5 3 1.5 4 4.5 4.5-3 .5-4 1.5-4.5 4.5-.5-3-1.5-4-4.5-4.5 3-.5 4-1.5 4.5-4.5z" fill={accent} />
    </svg>
  );
}

// Y — a person with a spark: an AI employee.
export function PersonSpark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="14" cy="10" r="5.5" fill={fg} />
      <path d="M3.5 29c0-6.5 4.7-10.5 10.5-10.5S24.5 22.5 24.5 29z" fill={fg} />
      <path d="M26 3c.6 3 1.6 4 4.5 4.5-2.9.6-3.9 1.6-4.5 4.5-.6-2.9-1.6-3.9-4.5-4.5 2.9-.5 3.9-1.5 4.5-4.5z" fill={accent} />
    </svg>
  );
}

// Z — a lightning bolt in a circle: quick to act.
export function BoltMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill={accent} />
      <path d="M17.5 5.5L9 18h6l-1.5 8.5L22 14h-6z" fill={fg} />
    </svg>
  );
}

// AA — a 2x2 grid of tiles with one lit: operations at a glance.
export function GridMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3" y="3" width="11.5" height="11.5" rx="3.5" fill={fg} />
      <rect x="17.5" y="3" width="11.5" height="11.5" rx="3.5" fill={fg} opacity="0.35" />
      <rect x="3" y="17.5" width="11.5" height="11.5" rx="3.5" fill={fg} opacity="0.35" />
      <rect x="17.5" y="17.5" width="11.5" height="11.5" rx="5.75" fill={accent} />
    </svg>
  );
}

// AB — a paper plane: the draft is ready to go.
export function PlaneMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M29 3L3 14l9.5 3.5L29 3z" fill={accent} />
      <path d="M29 3L12.5 17.5 16 29l4.5-8.5z" fill={fg} />
    </svg>
  );
}

// AC — a Q between square brackets, like a command.
export function BracketQ({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M8 4H4v24h4M24 4h4v24h-4" fill="none" stroke={fg} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="15" r="5.5" fill="none" stroke={accent} strokeWidth="2.8" />
      <path d="M18.5 18.5l3.5 3.5" stroke={accent} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

// AD — a compass needle: the business keeps its direction.
export function CompassMark({ accent, fg, className = "h-9 w-9" }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="none" stroke={fg} strokeWidth="2.6" />
      <path d="M21.5 10.5L17.8 17.8 10.5 21.5l3.7-7.3z" fill={accent} />
      <circle cx="16" cy="16" r="1.6" fill={fg} />
    </svg>
  );
}
