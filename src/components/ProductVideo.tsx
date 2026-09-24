import { existsSync } from "node:fs";
import path from "node:path";
import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import { VideoPlayer } from "./VideoPlayer";

// A real product recording goes in public/videos/. The section appears only once the file exists
// (checked at build time), so the page never shows an empty box or anything that could pass for fake proof.
// Set PRODUCT_VIDEO_PREVIEW=1 to see the clearly labelled placeholder while designing.
const VIDEO = "/videos/opsq-real-demo.mp4";
const POSTER = "/videos/opsq-real-demo-poster.jpg";

const publicFile = (p: string) => existsSync(path.join(process.cwd(), "public", p));

export function ProductVideo({ t }: { t: Dictionary["video"] }) {
  const hasVideo = publicFile(VIDEO);
  const preview = process.env.PRODUCT_VIDEO_PREVIEW === "1";
  if (!hasVideo && !preview) return null;

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <section id="video" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        </Reveal>
        <Reveal className="mt-10">
          {hasVideo ? (
            <VideoPlayer src={base + VIDEO} poster={publicFile(POSTER) ? base + POSTER : undefined} playLabel={t.play} title={t.title} />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-3xl border border-dashed border-ink/25 bg-paper-2 text-center text-ink-mute">
              <p className="px-6 text-lg font-semibold">{t.placeholder}</p>
            </div>
          )}
        </Reveal>
        <ol className="mt-6 flex flex-wrap gap-2 text-sm">
          {t.chapters.map((c, i) => (
            <li key={c} className="flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-ink-soft">
              <span className="font-bold text-mint-deep">{i + 1}</span>
              {c}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
