import Reveal from "./Reveal";
import {
  Database,
  Fingerprint,
  Gauge,
  Globe,
  Route,
  Scan,
} from "./icons";

const FEATURES = [
  {
    icon: Globe,
    title: "IP threat-intel",
    body: "Traffic from IPs on FireHOL Level 1 or Spamhaus DROP is dropped before it touches your route. Feeds refresh every 6 hours.",
    tag: "403",
  },
  {
    icon: Gauge,
    title: "Rate limiting",
    body: "Per-IP token bucket, 60 req/min by default. Absorbs credential-stuffing and scraper bursts without a Redis dependency.",
    tag: "429",
  },
  {
    icon: Scan,
    title: "Pattern scanner",
    body: "SQLi, XSS and path-traversal regex over the URL, query string and non-UA headers. Tuned to catch the payloads scanners actually send.",
    tag: "403",
  },
  {
    icon: Fingerprint,
    title: "Header sanity",
    body: "Missing User-Agent, known scanner signatures (sqlmap, nikto, masscan, nmap) and malformed cookies get bounced structurally.",
    tag: "403",
  },
  {
    icon: Database,
    title: "SQLite ledger",
    body: "Every block writes a row — timestamp, IP, path, rule, severity, raw UA — to a local WAL-mode SQLite file. PII never leaves your host.",
    tag: "log",
  },
  {
    icon: Route,
    title: "Per-route overrides",
    body: "Webhooks skip rate limiting, chatbot endpoints skip the pattern scan, payment routes skip threat-intel — all via one RouteRule.",
    tag: "config",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Defense layers
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Four checks, one middleware, zero services.
        </h2>
        <p className="mt-3 max-w-2xl text-mute">
          Each request runs the gauntlet cheapest-check-first. The route never
          sees anything that fails. No external calls, no runtime dependencies.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 70}>
            <div className="card group relative h-full overflow-hidden p-5 transition-colors hover:border-accent/40">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
              />
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-bg text-accent">
                  <f.icon size={20} />
                </span>
                <span className="mono rounded-md border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-faint">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
