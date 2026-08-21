-- Blog posts table
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_created_at_idx
  on posts (published, created_at desc);

alter table posts enable row level security;

-- Anyone can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Authenticated users (admin) can do everything
create policy "Authenticated users manage posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for cover images (run once; skip if it already exists)
insert into storage.buckets (id, name, public)
values ('blog-image', 'blog-image', true)
on conflict (id) do nothing;

create policy "Public can read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-image');

create policy "Authenticated users can upload blog images"
  on storage.objects for insert
  with check (bucket_id = 'blog-image' and auth.role() = 'authenticated');
