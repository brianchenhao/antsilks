import CopyButton from "./CopyButton";
import Reveal from "./Reveal";

const SNIPPET = `from fastapi import FastAPI
from antsilk import AntsilkMiddleware

app = FastAPI()
app.add_middleware(AntsilkMiddleware)`;

// tiny hand-rolled highlighter for the snippet
function Code() {
  const line = (children: React.ReactNode) => (
    <span className="block">{children}</span>
  );
  const kw = (t: string) => <span className="text-cyan">{t}</span>;
  const cls = (t: string) => <span className="text-accent">{t}</span>;
  const fn = (t: string) => <span className="text-warn">{t}</span>;
  return (
    <code className="mono text-sm leading-7">
      {line(<>{kw("from")} fastapi {kw("import")} {cls("FastAPI")}</>)}
      {line(<>{kw("from")} antsilk {kw("import")} {cls("AntsilkMiddleware")}</>)}
      {line(<>&nbsp;</>)}
      {line(<>app = {cls("FastAPI")}()</>)}
      {line(<>app.{fn("add_middleware")}({cls("AntsilkMiddleware")})</>)}
    </code>
  );
}

export default function Install() {
  return (
    <section id="install" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Install
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Two lines. A real WAF on day one.
        </h2>
        <p className="mt-3 max-w-2xl text-mute">
          Install the package, add the middleware. Defaults are tuned to be safe
          in production from the very first request — 60 req/min per IP,
          threat-intel from FireHOL + Spamhaus, full pattern scanning.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-2" delay={80}>
          <div className="card flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-mute">
                1 · install
              </span>
              <CopyButton text="pip install antsilk" />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-3">
              <span className="mono text-sm">
                <span className="text-faint">$ </span>
                <span className="text-accent">pip install antsilk</span>
                <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-blink bg-accent align-middle" />
              </span>
            </div>
            <p className="mt-4 text-sm text-mute">
              Zero runtime dependencies. Standard library only — nothing extra
              to audit, nothing to break your lockfile.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={160}>
          <div className="card flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-mute">
                2 · wire it up
              </span>
              <CopyButton text={SNIPPET} />
            </div>
            <div className="mt-4 flex-1 overflow-x-auto rounded-lg border border-line bg-bg p-4">
              <Code />
            </div>
            <p className="mt-4 text-sm text-mute">
              Restart your server. Every incoming request is now inspected,
              rate-limited, and logged.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
