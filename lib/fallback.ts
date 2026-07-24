import type { BlockEvent, Stats } from "./types";

// Static fallback so the page renders even if Supabase is unreachable.
const now = Date.now();
const ago = (s: number) => new Date(now - s * 1000).toISOString();

export const fallbackEvents: BlockEvent[] = [
  { id: 1, ts: ago(4), ip: "45.146.87.x", path: "/products?id=1' OR 1=1", method: "GET", rule: "sqli", severity: "critical", status: 403, user_agent: "sqlmap/1.7", country: "RU" },
  { id: 2, ts: ago(11), ip: "185.220.101.x", path: "/", method: "GET", rule: "threat_intel", severity: "high", status: 403, user_agent: "curl/8.4.0", country: "NL" },
  { id: 3, ts: ago(19), ip: "203.0.113.44.x", path: "/comment?msg=<script>", method: "POST", rule: "xss", severity: "high", status: 403, user_agent: "python-requests/2.31", country: "CN" },
  { id: 4, ts: ago(27), ip: "89.248.165.x", path: "/../../../etc/passwd", method: "GET", rule: "path_traversal", severity: "high", status: 403, user_agent: "Mozilla/5.0", country: "IR" },
  { id: 5, ts: ago(33), ip: "141.98.11.x", path: "/api/login", method: "POST", rule: "rate_limit", severity: "medium", status: 429, user_agent: "Go-http-client/2.0", country: "BR" },
  { id: 6, ts: ago(41), ip: "193.32.126.x", path: "/admin", method: "GET", rule: "bad_header", severity: "low", status: 403, user_agent: "Nikto/2.5", country: "US" },
  { id: 7, ts: ago(52), ip: "5.188.206.x", path: "/wp-login.php", method: "GET", rule: "bad_token", severity: "medium", status: 403, user_agent: "masscan/1.3", country: "VN" },
  { id: 8, ts: ago(64), ip: "171.25.193.x", path: "/user?id=1 UNION SELECT", method: "GET", rule: "sqli", severity: "critical", status: 403, user_agent: "sqlmap/1.7", country: "KP" },
  { id: 9, ts: ago(77), ip: "198.51.100.x", path: "/graphql", method: "POST", rule: "bad_token", severity: "medium", status: 403, user_agent: "python-requests/2.31", country: "DE" },
  { id: 10, ts: ago(90), ip: "45.146.90.x", path: "/profile?name=<img onerror=", method: "GET", rule: "xss", severity: "high", status: 403, user_agent: "Mozilla/5.0", country: "UA" },
];

export const fallbackStats: Stats = {
  total: 180,
  byRule: {
    threat_intel: 24,
    rate_limit: 22,
    sqli: 31,
    xss: 26,
    path_traversal: 25,
    bad_header: 28,
    bad_token: 24,
  },
  firstSeen: ago(7 * 86400),
  lastSeen: ago(4),
  uniqueIps: 63,
};
