import type { Dictionary, Status } from "@/i18n/dictionaries";
import { DownArrow, FlowArrow, Icon } from "./Icon";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeader, StatusBadge } from "./Section";

type Labels = Dictionary["status"];

function Chips({ items, dark = false, highlight }: { items: string[]; dark?: boolean; highlight?: string }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-1.5">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              item === highlight
                ? "bg-mint text-mint-ink"
                : dark
                  ? "border border-night-line bg-night-2 text-paper/85"
                  : "border border-line bg-paper text-ink"
            }`}
          >
            {item}
          </span>
          {i < items.length - 1 && <FlowArrow className={`h-3.5 w-3.5 ${dark ? "text-paper/35" : "text-ink/30"}`} />}
        </li>
      ))}
    </ol>
  );
}

function CardHead({ icon, title, status, labels, dark = false }: { icon: string; title: string; status: Status; labels: Labels; dark?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-mint/15 text-mint" : "bg-ink text-mint"}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <StatusBadge status={status} labels={labels} dark={dark} />
      </div>
      <h3 className={`mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem] ${dark ? "text-paper" : "text-ink"}`}>{title}</h3>
    </div>
  );
}

export function Future({ t, labels }: { t: Dictionary["future"]; labels: Labels }) {
  const { whatsapp, phone, browser, shopping, recurring, personal } = t;
  return (
    <section id="future" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        </Reveal>

        {/* WhatsApp */}
        <Reveal className="mt-12 grid gap-8 rounded-3xl border border-line bg-white/70 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <CardHead icon="chat" title={whatsapp.title} status="dev" labels={labels} />
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{whatsapp.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {whatsapp.same.map((s) => (
                <li key={s} className="rounded-full bg-mint-soft px-3 py-1 text-sm font-medium text-mint-ink">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-start gap-1.5">
              {whatsapp.flow.map((step, i) => (
                <div key={step} className="flex flex-col items-start gap-1.5">
                  <span
                    className={`rounded-xl px-4 py-2 font-semibold ${
                      i === 1 ? "flex items-center gap-2 bg-ink text-paper" : "border border-line bg-paper text-ink"
                    }`}
                  >
                    {i === 1 && <LogoMark className="h-5 w-5" tile="var(--color-paper)" />}
                    {step}
                  </span>
                  {i < whatsapp.flow.length - 1 && <DownArrow className="ms-5 h-4 w-4 text-ink/30" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[2rem] border-[6px] border-ink bg-paper-2 p-3 shadow-xl">
            <div className="flex items-center gap-2.5 rounded-2xl bg-ink px-3 py-2.5 text-paper">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-night-2">
                <LogoMark className="h-5 w-5" tile="var(--color-paper)" />
              </span>
              <span className="text-sm font-semibold">{whatsapp.chatName}</span>
            </div>
            <div className="flex min-h-[15rem] flex-col gap-2 px-1 py-4">
              {whatsapp.examples.map((msg) => (
                <span key={msg} className="max-w-[85%] self-end rounded-2xl rounded-se-md bg-mint-soft px-3.5 py-2 text-[0.95rem] text-mint-ink">
                  {msg}
                </span>
              ))}
              <span className="typing mt-1 flex gap-1 self-start rounded-2xl bg-paper px-3.5 py-3" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-ink/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink/50" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Phone: full-bleed dark block */}
      <div className="mt-8 bg-night py-16 text-paper sm:py-20">
        <Reveal className="mx-auto max-w-6xl px-4 sm:px-6">
          <CardHead icon="phone" title={phone.title} status="dev" labels={labels} dark />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/70">{phone.body}</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {phone.examples.map((ex) => (
              <li key={ex} className="rounded-2xl border border-night-line bg-night-2 p-5 text-xl font-semibold leading-snug text-paper">
                {ex}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Chips items={phone.flow} dark highlight={phone.flow[4]} />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Browser operator */}
        <Reveal className="mt-8 grid gap-8 rounded-3xl border border-line bg-white/70 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div>
            <CardHead icon="globe" title={browser.title} status="later" labels={labels} />
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{browser.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {browser.examples.map((ex) => (
                <li key={ex} className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink">
                  {ex}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-paper-2 px-4 py-3 font-semibold text-ink">{browser.prompt}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-lg">
            <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              </span>
              <span className="ltr flex-1 truncate rounded-md bg-paper px-3 py-1 text-xs text-ink-mute">{browser.url}</span>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {browser.fields.map((f, i) => (
                <div key={f}>
                  <div className="text-xs font-semibold text-ink-soft">{f}</div>
                  <div className="mt-1 h-9 overflow-hidden rounded-lg border border-line bg-white">
                    <div className="h-full bg-mint-soft/70" style={{ width: `${[72, 38, 58][i] ?? 50}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-mint-deep/40 bg-mint-soft/60 px-4 py-3 text-sm font-semibold text-mint-ink">
                <span>{browser.stop}</span>
                <Icon name="lock" className="h-4 w-4 shrink-0" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Shopping */}
          <Reveal className="flex flex-col rounded-3xl border border-line bg-white/70 p-6">
            <CardHead icon="cart" title={shopping.title} status="later" labels={labels} />
            <p className="mt-4 rounded-2xl bg-paper-2 px-4 py-3 font-semibold text-ink">{shopping.prompt}</p>
            <div className="mt-5">
              <Chips items={shopping.flow} highlight={shopping.flow[4]} />
            </div>
            <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
              <div className="text-sm font-semibold text-ink">{shopping.budgetTitle}</div>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {shopping.budget.map((b, i) => (
                  <li key={b.range} className="flex items-center justify-between gap-2">
                    <span className="text-ink-soft">{b.range}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        i === 0 ? "bg-paper-2 text-ink" : i === 1 ? "bg-mint-soft text-mint-ink" : "bg-ink text-mint"
                      }`}
                    >
                      {b.rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm font-medium text-ink">{shopping.note}</p>
          </Reveal>

          {/* Recurring */}
          <Reveal delay={100} className="flex flex-col rounded-3xl border border-line bg-white/70 p-6">
            <CardHead icon="repeat" title={recurring.title} status="later" labels={labels} />
            <p className="mt-4 leading-relaxed text-ink-soft">{recurring.body}</p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="rounded-2xl border border-dashed border-ink/20 px-4 py-3">
                <div className="text-xs font-semibold text-ink-mute">{recurring.taskLabel}</div>
                <div className="mt-1 text-ink-soft">{recurring.taskText}</div>
              </div>
              <DownArrow className="mx-auto h-4 w-4 text-ink/30" />
              <div className="rounded-2xl bg-ink px-4 py-3 text-paper">
                <div className="text-xs font-semibold text-mint">{recurring.respLabel}</div>
                <div className="mt-1 font-semibold">{recurring.respText}</div>
              </div>
            </div>
            <ul className="mt-5 flex flex-col gap-2 text-[0.95rem] text-ink-soft">
              {recurring.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </Reveal>

          {/* Personal / family */}
          <Reveal delay={200} className="flex flex-col rounded-3xl border border-line bg-white/70 p-6">
            <CardHead icon="heart" title={personal.title} status="later" labels={labels} />
            <p className="mt-4 rounded-2xl bg-paper-2 px-4 py-3 font-semibold text-ink">{personal.prompt}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {personal.actions.map((a) => (
                <li key={a} className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border border-line bg-paper p-4 text-sm leading-relaxed text-ink-soft">
              {personal.disclaimer}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
