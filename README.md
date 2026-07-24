# antsilks

The marketing site for [**antsilk**](https://github.com/brianchenhao/antsilk) —
drop-in security middleware for Python ASGI apps.

A modern rebuild of the antsilk landing page: **Next.js 15** (App Router) +
**Tailwind CSS v4** + **Supabase** + **Vercel**. The headline "requests blocked"
counter and the live attack feed are backed by a real Supabase table, so the
page shows genuine ledger data instead of a static JSON snapshot.

## Stack

| Layer     | Choice                                              |
| --------- | --------------------------------------------------- |
| Framework | Next.js 15 (App Router, React 19, server components)|
| Styling   | Tailwind CSS v4 (`@theme` tokens, custom keyframes) |
| Data      | Supabase Postgres (RLS, public read-only)           |
| Hosting   | Vercel                                              |

No animation or icon libraries — reveals, the count-up, the live tail and the
pipeline are hand-rolled with CSS keyframes + small React hooks.

## Data model

A single namespaced table, `antsilk_block_events`, holds one row per blocked
request (timestamp, masked IP, path, rule, severity, status, UA, country). It's
locked down with an RLS policy that only allows `SELECT`, and the browser talks
to it with a **publishable** key — safe to ship. Aggregate counts come from a
`SECURITY DEFINER` function, `antsilk_rule_counts()`.

If Supabase is unreachable the site falls back to a seeded snapshot in
[`lib/fallback.ts`](lib/fallback.ts), so it always renders.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + publishable key
npm run dev
```

Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

## Deploy

Push to GitHub and import into Vercel, or `vercel --prod`. Set the two env
vars above in the Vercel project settings.

---

Built by [Brian Chen](https://brianchenhao.com) · MIT licensed
