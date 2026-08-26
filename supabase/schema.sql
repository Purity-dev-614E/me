create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id),
  entry_date date not null default current_date,
  body text not null check (char_length(body) between 1 and 5000),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.journal_entries enable row level security;

create policy "Anyone can read published journal entries"
on public.journal_entries for select
using (published = true or auth.uid() = owner_id);

create policy "Owners can create their journal entries"
on public.journal_entries for insert to authenticated
with check (auth.uid() = owner_id);

create policy "Owners can update their journal entries"
on public.journal_entries for update to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Owners can delete their journal entries"
on public.journal_entries for delete to authenticated
using (auth.uid() = owner_id);
