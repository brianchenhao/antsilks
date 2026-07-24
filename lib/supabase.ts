import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Public, read-only Supabase client. The publishable key is safe to ship to the
 * browser: the antsilk_block_events table is guarded by an RLS policy that only
 * permits SELECT, so this can never write.
 */
export const supabase =
  url && key
    ? createClient(url, key, { auth: { persistSession: false } })
    : null;

export const isSupabaseConfigured = Boolean(url && key);
