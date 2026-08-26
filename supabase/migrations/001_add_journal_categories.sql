alter table public.journal_entries
  add column if not exists category text not null default 'Building'
  check (category in ('Building', 'LeetCode', 'Learning', 'Other'));
