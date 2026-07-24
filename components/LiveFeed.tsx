"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp";
import { Terminal } from "./icons";
import { RULE_COLOR, timeAgo } from "@/lib/ruleStyle";
import {
  RULE_LABEL,
  RULE_ORDER,
  type BlockEvent,
  type Stats,
} from "@/lib/types";

const MAX_ROWS = 11;
const TICK_MS = 1700;

export default function LiveFeed({
  initialEvents,
  stats,
}: {
  initialEvents: BlockEvent[];
  stats: Stats;
}) {
  const source = initialEvents.length ? initialEvents : [];
  const [rows, setRows] = useState<BlockEvent[]>(() =>
    source.slice(0, MAX_ROWS),
  );
  const cursor = useRef(source.length ? source.length % Math.max(1, source.length) : 0);
  const nextId = useRef(1_000_000);

  // Roll the tail like a live `tail -f` on the event ledger.
  useEffect(() => {
    if (!source.length) return;
    const t = setInterval(() => {
      setRows((prev) => {
        const src = source[cursor.current % source.length];
        cursor.current += 1;
        const fresh: BlockEvent = {
          ...src,
          id: nextId.current++,
          ts: new Date().toISOString(),
        };
        return [fresh, ...prev].slice(0, MAX_ROWS);
      });
    }, TICK_MS);
    return () => clearInterval(t);
  }, [source]);

  const maxRule = Math.max(1, ...RULE_ORDER.map((r) => stats.byRule[r] ?? 0));

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Counter + rule breakdown */}
      <div className="lg:col-span-2">
        <div className="card p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">
            requests blocked
          </p>
          <div className="mt-2 flex items-end gap-3">
            <CountUp
              value={stats.total}
              className="text-6xl font-semibold tracking-tight text-fg sm:text-7xl"
            />
            <span className="mb-2 flex items-center gap-1.5 text-xs text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              live
            </span>
          </div>
          <p className="mt-1 text-xs text-faint">
            aggregate hits recorded in antsilk&apos;s SQLite ledger
          </p>

          <div className="mt-7 space-y-2.5">
            {RULE_ORDER.map((rule, i) => {
              const n = stats.byRule[rule] ?? 0;
              const c = RULE_COLOR[rule];
              return (
                <div key={rule} className="flex items-center gap-3">
                  <span className={`size-1.5 rounded-full ${c.dot}`} />
                  <span className="w-28 shrink-0 text-xs text-mute">
                    {RULE_LABEL[rule]}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <Bar
                      pct={(n / maxRule) * 100}
                      className={c.dot}
                      delay={i * 90}
                    />
                  </div>
                  <span className={`w-8 text-right mono text-xs ${c.text}`}>
                    {n}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Terminal feed */}
      <div className="lg:col-span-3">
        <div className="card relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-danger/70" />
              <span className="size-2.5 rounded-full bg-warn/70" />
              <span className="size-2.5 rounded-full bg-accent/70" />
            </span>
            <span className="ml-2 flex items-center gap-1.5 mono text-xs text-mute">
              <Terminal size={13} />
              antsilk_events.db — tail -f
            </span>
            <span className="ml-auto mono text-[11px] text-faint">
              403 / 429 · newest first
            </span>
          </div>

          <div className="relative h-[420px] overflow-hidden px-2 py-2">
            {rows.map((e, i) => (
              <FeedRow key={e.id} e={e} dim={i / rows.length} />
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bar({
  pct,
  className,
  delay,
}: {
  pct: number;
  className: string;
  delay: number;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 150 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div
      className={`h-full rounded-full ${className}`}
      style={{ width: `${w}%`, transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }}
    />
  );
}

function FeedRow({ e, dim }: { e: BlockEvent; dim: number }) {
  const c = RULE_COLOR[e.rule];
  return (
    <div
      className="flex items-center gap-2 rounded-md px-2 py-[7px] mono text-xs"
      style={{ animation: "row-in 0.5s ease both", opacity: 1 - dim * 0.55 }}
    >
      <span className="w-14 shrink-0 text-faint">{timeAgo(e.ts)}</span>
      <span
        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
          e.status === 429 ? "bg-warn/15 text-warn" : "bg-danger/15 text-danger"
        }`}
      >
        {e.status}
      </span>
      <span className="w-11 shrink-0 text-mute">{e.method}</span>
      <span className={`flex w-24 shrink-0 items-center gap-1.5 ${c.text}`}>
        <span className={`size-1.5 rounded-full ${c.dot}`} />
        {RULE_LABEL[e.rule]}
      </span>
      <span className="flex-1 truncate text-fg/80">{e.path}</span>
      <span className="hidden shrink-0 text-faint sm:inline">{e.ip}</span>
      <span className="hidden shrink-0 rounded border border-line px-1 text-[10px] text-faint md:inline">
        {e.country}
      </span>
    </div>
  );
}
