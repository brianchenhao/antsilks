import Link from "next/link";
import CopyButton from "./CopyButton";
import { Github } from "./icons";

const GITHUB = "https://github.com/brianchenhao/antsilks";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex items-center gap-2.5 rounded-full border border-line bg-panel/70 px-4 py-2 backdrop-blur-md">
          <BrandMark />
          <span className="text-sm font-semibold tracking-tight">antsilk</span>
          <span className="ml-1 rounded-full border border-line px-1.5 py-0.5 text-[10px] font-medium text-mute">
            v0.1
          </span>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-line bg-panel/70 px-2 py-1.5 text-sm text-mute backdrop-blur-md md:flex">
          <a href="#live" className="rounded-full px-3 py-1 transition-colors hover:text-fg">Live</a>
          <a href="#install" className="rounded-full px-3 py-1 transition-colors hover:text-fg">Install</a>
          <a href="#features" className="rounded-full px-3 py-1 transition-colors hover:text-fg">Features</a>
          <a href="#how" className="rounded-full px-3 py-1 transition-colors hover:text-fg">How</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-2 backdrop-blur-md sm:flex">
            <span className="mono text-xs text-mute">
              <span className="text-accent">$</span> pip install antsilk
            </span>
            <CopyButton text="pip install antsilk" />
          </div>
          <Link
            href={GITHUB}
            className="flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3.5 py-2 text-sm backdrop-blur-md transition-colors hover:border-accent/40"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="navg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6ef7c0" />
          <stop offset="1" stopColor="#46dbff" />
        </linearGradient>
      </defs>
      <path
        d="M32 6 L54 15 V32 C54 45 44 54 32 58 C20 54 10 45 10 32 V15 Z"
        fill="none"
        stroke="url(#navg)"
        strokeWidth="3.5"
      />
      <path d="M20 45 L32 21 L44 45 L37 45 L32 34 L27 45 Z" fill="url(#navg)" />
    </svg>
  );
}
