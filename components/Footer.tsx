import Link from "next/link";
import { Github } from "./icons";

const links = [
  { label: "GitHub", href: "https://github.com/brianchenhao/antsilks" },
  { label: "PyPI", href: "https://pypi.org/project/antsilk/" },
  { label: "Docs", href: "https://github.com/brianchenhao/antsilk#readme" },
  { label: "Changelog", href: "https://github.com/brianchenhao/antsilk/blob/main/CHANGELOG.md" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 64 64" aria-hidden>
              <defs>
                <linearGradient id="footg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6ef7c0" />
                  <stop offset="1" stopColor="#46dbff" />
                </linearGradient>
              </defs>
              <path d="M32 6 L54 15 V32 C54 45 44 54 32 58 C20 54 10 45 10 32 V15 Z" fill="none" stroke="url(#footg)" strokeWidth="3.5" />
              <path d="M20 45 L32 21 L44 45 L37 45 L32 34 L27 45 Z" fill="url(#footg)" />
            </svg>
            <div>
              <div className="text-sm font-semibold">antsilk</div>
              <div className="text-xs text-mute">
                security middleware for Python ASGI apps
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {year} antsilk · MIT licensed · built by{" "}
            <Link href="https://brianchenhao.com" className="text-mute transition-colors hover:text-accent">
              Brian Chen
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <span>Live counts served from Supabase · deployed on Vercel</span>
            <Link href="https://github.com/brianchenhao/antsilks" className="text-mute transition-colors hover:text-fg">
              <Github size={15} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
