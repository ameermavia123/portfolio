// ── Fill these in after creating your free Supabase project ──
// 1. Go to supabase.com → New project (free tier)
// 2. Project Settings → API → copy "Project URL" and "anon public" key
// 3. Paste them below
const SUPABASE_URL = "https://ygejdnuxihsmqjgcnwru.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3m9KhKZw2ypNV6pj_xGF0A_eHeqSn1X";

const supabaseClient = (SUPABASE_URL.startsWith("http"))
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
