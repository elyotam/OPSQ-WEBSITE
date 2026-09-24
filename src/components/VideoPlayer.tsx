"use client";

import { useState } from "react";
import { track } from "@/lib/track";

// Nothing downloads until the visitor presses play: the poster (or a dark frame) with a play button,
// then the native player with controls. Never autoplays with sound.
export function VideoPlayer({ src, poster, playLabel, title }: { src: string; poster?: string; playLabel: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-night-line bg-night shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {playing ? (
        <video className="h-full w-full" src={src} poster={poster} controls autoPlay playsInline preload="auto" aria-label={title} />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            track("proof_interaction", { location: "product_video_play" });
          }}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={playLabel}
        >
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element -- static export, plain poster image
            <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80" />
          )}
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-mint text-mint-ink shadow-[0_10px_40px_-8px_rgba(20,184,166,0.9)] transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ms-1 h-8 w-8" aria-hidden="true">
              <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
