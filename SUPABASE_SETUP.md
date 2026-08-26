# Supabase journal setup

1. Create a Supabase project.
2. In its SQL Editor, run [schema.sql](./supabase/schema.sql).
3. In **Authentication → Users**, create your own email/password user. Do not enable public sign-ups.
4. Copy `.env.example` to `.env.local` and replace both values with the project's **URL** and **anon/publishable key** from **Settings → API**.
5. Restart `npm run dev`.

If you already ran the original schema, run [001_add_journal_categories.sql](./supabase/migrations/001_add_journal_categories.sql) in Supabase's SQL Editor too. It adds journal topics used for filters and streaks.

The anonymous key is intended for browser use. The database policies in `schema.sql` are what keep writing private: visitors can read published entries only, while each signed-in owner can manage their own entries.

Use `#/admin` to sign in and add entries. `#/journal` is the public all-entries page.
