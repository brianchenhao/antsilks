import Link from "next/link";
import CopyButton from "./CopyButton";
import { ArrowRight, Bolt, Github } from "./icons";
import type { Stats } from "@/lib/types";

const GITHUB = "https://github.com/brianchenhao/antsilks";

export default function Hero({ stats }: { stats: Stats }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-36 pb-10 sm:pt-44">
      <div className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 text-xs text-mute backdrop-blur">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        {stats.total.toLocaleString()} malicious requests blocked &amp; counting
      </div>

      <h1
        className="reveal mt-6 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl"
        style={{ animationDelay: "60ms" }}
      >
        <span className="text-gradient">Security middleware</span>
        <br />
        that installs in two lines.
      </h1>

      <p
        className="reveal mt-6 max-w-2xl text-base leading-relaxed text-mute sm:text-lg"
        style={{ animationDelay: "140ms" }}
      >
        <span className="mono text-accent">antsilk</span> sits in front of your
        FastAPI / Starlette / Litestar app and does the boring half of web
        security for you — rate limiting, IP threat-intel, and SQLi / XSS /
        path-traversal scanning on every request. Blocks land as structured
        events in a local SQLite ledger.
      </p>

      <div
        className="reveal mt-8 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "220ms" }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3">
          <span className="mono text-sm">
            <span className="text-faint">$ </span>
            <span className="text-accent">pip install antsilk</span>
          </span>
          <span className="h-4 w-px bg-line" />
          <CopyButton text="pip install antsilk" label="copy" />
        </div>

        <Link
          href="#how"
          className="btn-accent inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
        >
          See how it works
          <ArrowRight size={16} />
        </Link>

        <Link
          href={GITHUB}
          className="btn-ghost inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
        >
          <Github size={16} />
          Star on GitHub
        </Link>
      </div>

      <div
        className="reveal mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        style={{ animationDelay: "300ms" }}
      >
        <Metric value="< 1ms" label="p99 overhead" accent />
        <Metric value="0" label="runtime deps" />
        <Metric value="4" label="defense layers" />
        <Metric value="98%" label="test coverage" />
      </div>
    </section>
  );
}

function Metric({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-panel px-5 py-4">
      <div
        className={`flex items-center gap-1.5 text-2xl font-semibold tracking-tight ${accent ? "text-accent" : "text-fg"}`}
      >
        {accent ? <Bolt size={18} className="text-accent" /> : null}
        {value}
      </div>
      <div className="mt-1 text-xs text-mute">{label}</div>
    </div>
  );
}
