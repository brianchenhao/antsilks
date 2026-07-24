import type { Rule, Severity } from "./types";

// Tailwind-friendly color tokens per rule, used by the live feed + grid.
export const RULE_COLOR: Record<Rule, { text: string; dot: string; glow: string }> = {
  threat_intel: { text: "text-cyan", dot: "bg-cyan", glow: "shadow-[0_0_10px_var(--color-cyan)]" },
  rate_limit: { text: "text-warn", dot: "bg-warn", glow: "shadow-[0_0_10px_var(--color-warn)]" },
  sqli: { text: "text-danger", dot: "bg-danger", glow: "shadow-[0_0_10px_var(--color-danger)]" },
  xss: { text: "text-danger", dot: "bg-danger", glow: "shadow-[0_0_10px_var(--color-danger)]" },
  path_traversal: { text: "text-warn", dot: "bg-warn", glow: "shadow-[0_0_10px_var(--color-warn)]" },
  bad_header: { text: "text-accent", dot: "bg-accent", glow: "shadow-[0_0_10px_var(--color-accent)]" },
  bad_token: { text: "text-accent", dot: "bg-accent", glow: "shadow-[0_0_10px_var(--color-accent)]" },
};

export const SEVERITY_COLOR: Record<Severity, string> = {
  low: "text-faint border-line",
  medium: "text-warn border-warn/30",
  high: "text-danger border-danger/30",
  critical: "text-danger border-danger/50",
};

export function timeAgo(iso: string): string {
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
