import Link from "next/link";
import CopyButton from "./CopyButton";
import Reveal from "./Reveal";
import { ArrowRight, Github } from "./icons";

const GITHUB = "https://github.com/brianchenhao/antsilks";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <div className="card relative overflow-hidden p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 0%, color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Stop shipping unprotected routes.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-mute">
              Add a real WAF to your ASGI app in the time it takes to read this
              sentence.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3">
                <span className="mono text-sm">
                  <span className="text-faint">$ </span>
                  <span className="text-accent">pip install antsilk</span>
                </span>
                <span className="h-4 w-px bg-line" />
                <CopyButton text="pip install antsilk" label="copy" />
              </div>
              <Link
                href={GITHUB}
                className="btn-accent inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
              >
                <Github size={16} />
                View on GitHub
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
