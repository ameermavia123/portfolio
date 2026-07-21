// ── Fill these in after creating your free Supabase project ──
// 1. Go to supabase.com → New project (free tier)
// 2. Project Settings → API → copy "Project URL" and "anon public" key
// 3. Paste them below
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

const supabaseClient = (SUPABASE_URL.startsWith("http"))
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
