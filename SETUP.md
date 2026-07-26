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

## 3. Create the experience, skills, and profile tables
Same place — **SQL Editor** → **New query** → paste this → **Run**:

```sql
create table experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table experience enable row level security;
create policy "Public read access" on experience for select using (true);
create policy "Authenticated write access" on experience
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  level text,
  percent int default 50,
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table skills enable row level security;
create policy "Public read access" on skills for select using (true);
create policy "Authenticated write access" on skills
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table site_profile (
  id int primary key default 1,
  first_name text, last_name text, initials text, handle text,
  role text, bio text, about_p1 text, about_p2 text,
  location text, focus text, education text,
  email text, phone text, whatsapp text,
  github_url text, linkedin_url text,
  contact_heading text, contact_sub text, availability text,
  footer_tagline text,
  updated_at timestamptz default now()
);
insert into site_profile (id) values (1);
alter table site_profile enable row level security;
create policy "Public read access" on site_profile for select using (true);
create policy "Authenticated write access" on site_profile
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
```

## 4. Create image storage
Left sidebar → **Storage** → **New bucket** → name it `project-images` →
toggle **Public bucket** ON → Create.

Then go to the bucket → **Policies** → **New policy** → allow:
- `SELECT` for everyone (public read)
- `INSERT` for authenticated users only (so only you can upload)

(Supabase gives you templates for both — just pick "Give public read access"
and "Give authenticated users upload access".)

## 5. Create your admin login
Left sidebar → **Authentication** → **Users** → **Add user** →
enter your own email + a strong password. This is the ONLY account that can
log into your admin page — nobody else can sign up.

## 6. Connect your site to Supabase
Left sidebar → **Project Settings** → **API** → copy:
- **Project URL**
- **anon public** key

Paste both into `config.js` (replacing the placeholder text).

## 7. Deploy
Upload `index.html`, `admin.html`, and `config.js` together to your host
(Vercel, Netlify, or GitHub Pages — all free). Keep all three files in the
same folder.

- Public site: `yourdomain.com/`
- Admin page: `yourdomain.com/admin.html` (bookmark this — it's not linked
  from the public site, so visitors won't find it by browsing)

## Login and manage your content
Go to `/admin.html`, log in with the email/password from step 5. You can now
add/edit/delete your **Projects**, **Experience**, and **Skills/Tech Stack**
entries — everything appears on your live site immediately, no code changes
needed.
