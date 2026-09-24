"use client";

import { useEffect, useState } from "react";

// Phones only: a small request-a-demo pill appears once the hero is behind you and hides again
// while the form itself is on screen. Sits bottom-left so it never covers the accessibility button.
export function StickyCta({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("demo");
    let formVisible = false;
    const io = form
      ? new IntersectionObserver(([e]) => {
          formVisible = e.isIntersecting;
          update();
        })
      : null;
    function update() {
      setShow(window.scrollY > window.innerHeight * 0.9 && !formVisible);
    }
    if (form && io) io.observe(form);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <a
      href="#demo"
      data-track="demo_cta_clicked"
      data-track-location="sticky"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-3 left-3 z-30 flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-paper shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
      {label}
    </a>
  );
}
