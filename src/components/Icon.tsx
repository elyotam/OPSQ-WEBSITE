// Small outline icons for the marketing sections. 24x24, stroke-based, inherit currentColor.
const PATHS: Record<string, string> = {
  mail: "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5l5 5",
  pen: "M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10zM14 7l3 3",
  send: "M20.5 3.5L3.5 10.5l7 3 3 7zM10.5 13.5l10-10",
  calendar: "M4 6h16v14H4zM4 10.5h16M8.5 3.5v4M15.5 3.5v4",
  contacts: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 6.5M18.5 14.8c1.8.8 2.8 2.6 3 5.2",
  memory: "M12 4a5 5 0 0 0-5 5c0 1.8.9 3 2 4v3h6v-3c1.1-1 2-2.2 2-4a5 5 0 0 0-5-5zM9.5 19.5h5",
  chat: "M4 5.5h16v10H9l-5 4z",
  team: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c.6-4 3.6-6 7.5-6s6.9 2 7.5 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
  cart: "M3.5 4.5h2.5l2.3 10.5h10.2l2-7.5H7M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  repeat: "M17 3.5l3 3-3 3M4 11.5v-1a4 4 0 0 1 4-4h12M7 20.5l-3-3 3-3M20 12.5v1a4 4 0 0 1-4 4H4",
  heart: "M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z",
  shield: "M12 3l7.5 3v6c0 4.5-3.2 7.8-7.5 9-4.3-1.2-7.5-4.5-7.5-9V6z",
  lock: "M6 11h12v9.5H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  list: "M8.5 6.5h11M8.5 12h11M8.5 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01",
  key: "M14.5 9.5a4 4 0 1 0-3.9 3.1L4 19.2V21h2.5v-1.5H8V18h1.5l3.4-3.4a4 4 0 0 0 1.6-5.1z",
  unplug: "M9 3.5v4M15 3.5v4M6.5 7.5h11v3.5a5.5 5.5 0 0 1-11 0zM12 16.5v4M4 4l16 16",
  eyeOff: "M3 3l18 18M10.6 6.2A9.7 9.7 0 0 1 12 6c5 0 8.5 4.5 9.5 6-.4.7-1.3 2-2.7 3.2M6.5 7.9C4.6 9.2 3.2 11 2.5 12c1 1.5 4.5 6 9.5 6 1.4 0 2.7-.4 3.9-.9",
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d={PATHS[name] ?? PATHS.check}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return <Icon name="check" className={className} />;
}

/** Points along the reading direction: left in Hebrew, right in English. */
export function FlowArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} rtl:-scale-x-100`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
