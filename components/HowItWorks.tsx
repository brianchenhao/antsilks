import Reveal from "./Reveal";
import { Database, Fingerprint, Gauge, Globe, Route, Scan } from "./icons";

const LAYERS = [
  { icon: Globe, label: "threat-intel", note: "IP blocklists" },
  { icon: Gauge, label: "rate limiter", note: "token bucket" },
  { icon: Scan, label: "pattern scan", note: "SQLi · XSS · traversal" },
  { icon: Fingerprint, label: "header check", note: "UA · cookies" },
];

const STEPS = [
  {
    n: "01",
    title: "Inspect every request",
    body: "Threat-intel runs first because it's cheapest, then rate limit, then the regex scan over path / query / non-UA headers, then header sanity. The route never sees a blocked request.",
  },
  {
    n: "02",
    title: "Record what got stopped",
    body: "Every block writes one row to a local SQLite ledger — timestamp, IP, path, rule, severity, status, raw User-Agent. Per-IP details stay on your host.",
  },
  {
    n: "03",
    title: "Carve out routes that need it",
    body: "Webhooks bypass rate limiting, comment endpoints bypass the pattern scan, payment routes bypass threat-intel — each via a single RouteRule dataclass.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          One pipeline, front of every route.
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <div className="card mt-10 p-6 sm:p-10">
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.4fr_auto_1fr]">
            {/* Incoming */}
            <Node
              title="Internet"
              sub="incoming traffic"
              icon={<Globe size={20} />}
              tone="neutral"
            />

            <Connector />

            {/* Middleware */}
            <div className="relative rounded-2xl border border-accent/30 bg-bg p-4">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
                style={{ boxShadow: "inset 0 0 40px -12px var(--color-accent)" }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs font-semibold text-accent">
                    AntsilkMiddleware
                  </span>
                  <span className="mono text-[10px] text-faint">&lt; 1ms</span>
                </div>
                <div className="mt-3 space-y-2">
                  {LAYERS.map((l) => (
                    <div
                      key={l.label}
                      className="flex items-center gap-3 rounded-lg border border-line bg-panel px-3 py-2"
                    >
                      <span className="text-accent">
                        <l.icon size={16} />
                      </span>
                      <span className="text-sm">{l.label}</span>
                      <span className="ml-auto mono text-[10px] text-faint">
                        {l.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Connector split />

            {/* Outputs */}
            <div className="flex flex-col gap-4">
              <Node
                title="Route handlers"
                sub="clean requests pass"
                icon={<Route size={20} />}
                tone="pass"
              />
              <Node
                title="events.db"
                sub="blocks logged (SQLite)"
                icon={<Database size={20} />}
                tone="block"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="card h-full p-5">
              <span className="mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-2 text-base font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Node({
  title,
  sub,
  icon,
  tone,
}: {
  title: string;
  sub: string;
  icon: React.ReactNode;
  tone: "neutral" | "pass" | "block";
}) {
  const ring =
    tone === "pass"
      ? "border-accent/30"
      : tone === "block"
        ? "border-danger/30"
        : "border-line";
  const color =
    tone === "pass" ? "text-accent" : tone === "block" ? "text-danger" : "text-mute";
  return (
    <div className={`flex items-center gap-3 rounded-2xl border ${ring} bg-bg p-4`}>
      <span className={`inline-flex size-10 items-center justify-center rounded-xl border border-line bg-panel ${color}`}>
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-mute">{sub}</div>
      </div>
    </div>
  );
}

function Connector({ split }: { split?: boolean }) {
  return (
    <div className="relative flex min-h-[24px] items-center justify-center lg:min-h-full">
      <div className="hidden h-px w-full overflow-hidden bg-line lg:block">
        <div
          className="h-full w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
            animation: "marquee 2.4s linear infinite",
          }}
        />
      </div>
      <div className="h-6 w-px bg-line lg:hidden" />
      {split ? (
        <span className="absolute right-0 hidden size-1.5 rounded-full bg-accent lg:block" />
      ) : null}
    </div>
  );
}
