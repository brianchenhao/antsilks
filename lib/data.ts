import { supabase } from "./supabase";
import { fallbackEvents, fallbackStats } from "./fallback";
import type { BlockEvent, Rule, Stats } from "./types";
import { RULE_ORDER } from "./types";

const emptyByRule = () =>
  RULE_ORDER.reduce(
    (acc, r) => ({ ...acc, [r]: 0 }),
    {} as Record<Rule, number>,
  );

/** Most-recent blocked requests, newest first. Falls back to a seeded set. */
export async function getRecentEvents(limit = 40): Promise<BlockEvent[]> {
  if (!supabase) return fallbackEvents.slice(0, limit);
  const { data, error } = await supabase
    .from("antsilk_block_events")
    .select("id, ts, ip, path, method, rule, severity, status, user_agent, country")
    .order("ts", { ascending: false })
    .limit(limit);
  if (error || !data) return fallbackEvents.slice(0, limit);
  return data as BlockEvent[];
}

/** Aggregate counts for the headline counter + per-rule grid. */
export async function getStats(): Promise<Stats> {
  if (!supabase) return fallbackStats;

  const byRule = emptyByRule();

  const [{ data: counts }, { count }, { data: bounds }] = await Promise.all([
    supabase.rpc("antsilk_rule_counts"),
    supabase
      .from("antsilk_block_events")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("antsilk_block_events")
      .select("ts")
      .order("ts", { ascending: true })
      .limit(1),
  ]);

  if (Array.isArray(counts)) {
    for (const row of counts as { rule: Rule; n: number }[]) {
      if (row.rule in byRule) byRule[row.rule] = Number(row.n);
    }
  }

  const { data: latest } = await supabase
    .from("antsilk_block_events")
    .select("ts")
    .order("ts", { ascending: false })
    .limit(1);

  const total = count ?? Object.values(byRule).reduce((a, b) => a + b, 0);
  if (!total) return fallbackStats;

  return {
    total,
    byRule,
    firstSeen: bounds?.[0]?.ts ?? null,
    lastSeen: latest?.[0]?.ts ?? null,
    uniqueIps: 0,
  };
}
