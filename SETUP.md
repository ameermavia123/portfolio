# Setting up your admin backend (free, ~10 minutes)

Your site uses **Supabase** (free tier) to store projects and images so your
admin page can add/edit/delete them, and the public site shows them live.

## 1. Create your Supabase project
1. Go to https://supabase.com → sign up (free) → **New project**
2. Pick any name/password/region → wait ~2 min for it to spin up

## 2. Create the projects table
Open **SQL Editor** (left sidebar) → **New query** → paste this → **Run**:

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  tags text[] default '{}',
  live_link text,
  github_link text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table projects enable row level security;

-- anyone can view projects (public portfolio)
create policy "Public read access" on projects
  for select using (true);

-- only logged-in users (you) can add/edit/delete
create policy "Authenticated write access" on projects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
```

## 3. Create image storage
Left sidebar → **Storage** → **New bucket** → name it `project-images` →
toggle **Public bucket** ON → Create.

Then go to the bucket → **Policies** → **New policy** → allow:
- `SELECT` for everyone (public read)
- `INSERT` for authenticated users only (so only you can upload)

(Supabase gives you templates for both — just pick "Give public read access"
and "Give authenticated users upload access".)

## 4. Create your admin login
Left sidebar → **Authentication** → **Users** → **Add user** →
enter your own email + a strong password. This is the ONLY account that can
log into your admin page — nobody else can sign up.

## 5. Connect your site to Supabase
Left sidebar → **Project Settings** → **API** → copy:
- **Project URL**
- **anon public** key

Paste both into `config.js` (replacing the placeholder text).

## 6. Deploy
Upload `index.html`, `admin.html`, and `config.js` together to your host
(Vercel, Netlify, or GitHub Pages — all free). Keep all three files in the
same folder.

- Public site: `yourdomain.com/`
- Admin page: `yourdomain.com/admin.html` (bookmark this — it's not linked
  from the public site, so visitors won't find it by browsing)

## Login and add your first project
Go to `/admin.html`, log in with the email/password from step 4, and add a
project — title, subtitle, description, tags, an image, and live link/GitHub
link (leave either blank if it doesn't apply). It appears on your live site
immediately.
