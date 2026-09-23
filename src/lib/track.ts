// Vendor-neutral conversion events. Each event is pushed to window.dataLayer (read by GTM, GA4 or
// any tag manager if one is added later) and dispatched as an "opsq:track" DOM event.
// No personal data is ever put into an event.

export type TrackEvent =
  | "hero_cta_clicked"
  | "demo_cta_clicked"
  | "how_it_works_clicked"
  | "lead_form_started"
  | "lead_form_submitted"
  | "faq_opened";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, props: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("opsq:track", { detail: payload }));
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORAGE = "opsq-utm";
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Keeps the campaign a visitor arrived from for the rest of the visit, so a lead can carry it. */
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 100);
    }
    if (Object.keys(found).length) sessionStorage.setItem(UTM_STORAGE, JSON.stringify(found));
  } catch {
    /* storage blocked: campaign simply isn't attached */
  }
}

export function getUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE) ?? "{}") as Utm;
  } catch {
    return {};
  }
}
