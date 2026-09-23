"use client";

import { useEffect } from "react";
import { captureUtm, track, type TrackEvent } from "@/lib/track";

// One listener for the whole page: any element with data-track="<event>" reports its click,
// and opening an FAQ item reports faq_opened. Keeps tracking out of every component.
export function Analytics() {
  useEffect(() => {
    captureUtm();

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as TrackEvent, el.dataset.trackLocation ? { location: el.dataset.trackLocation } : {});
    };
    // "toggle" doesn't bubble, so listen in the capture phase.
    const onToggle = (e: Event) => {
      const details = e.target as HTMLDetailsElement;
      if (details.tagName !== "DETAILS" || !details.open || !details.closest("#faq")) return;
      track("faq_opened", { question: details.querySelector("summary")?.textContent?.trim().slice(0, 80) ?? "" });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return null;
}
