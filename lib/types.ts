export type Rule =
  | "threat_intel"
  | "rate_limit"
  | "sqli"
  | "xss"
  | "path_traversal"
  | "bad_header"
  | "bad_token";

export type Severity = "low" | "medium" | "high" | "critical";

export interface BlockEvent {
  id: number;
  ts: string;
  ip: string;
  path: string;
  method: string;
  rule: Rule;
  severity: Severity;
  status: number;
  user_agent: string;
  country: string;
}

export interface Stats {
  total: number;
  byRule: Record<Rule, number>;
  firstSeen: string | null;
  lastSeen: string | null;
  uniqueIps: number;
}

export const RULE_ORDER: Rule[] = [
  "threat_intel",
  "rate_limit",
  "sqli",
  "xss",
  "path_traversal",
  "bad_header",
  "bad_token",
];

export const RULE_LABEL: Record<Rule, string> = {
  threat_intel: "threat-intel",
  rate_limit: "rate limit",
  sqli: "SQL injection",
  xss: "XSS",
  path_traversal: "path traversal",
  bad_header: "bad header",
  bad_token: "bad token",
};

export const SEVERITY_RANK: Record<Severity, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
};
