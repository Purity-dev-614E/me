import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { View } from "../../components";
import { RightNowData } from "../../widgets/now/data";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import styles from "./journal.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(`${date}T00:00:00`),
  );

const PAGE_SIZE = 6;
const categories = ["All", "Building", "LeetCode", "Learning", "Other"];

function getStreaks(dates) {
  const uniqueDates = [...new Set(dates)];
  const dateSet = new Set(uniqueDates);
  const toKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const dayBefore = (date) => new Date(date.getTime() - 86_400_000);
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!dateSet.has(toKey(cursor))) cursor = dayBefore(cursor);
  let current = 0;
  while (dateSet.has(toKey(cursor))) { current += 1; cursor = dayBefore(cursor); }
  let longest = 0;
  uniqueDates.sort().forEach((date) => {
    const previous = dayBefore(new Date(`${date}T00:00:00`));
    const length = dateSet.has(toKey(previous)) ? 0 : 1;
    if (length) {
      let run = 1;
      let next = new Date(`${date}T00:00:00`);
      while (dateSet.has(toKey(new Date(next.getTime() + 86_400_000)))) { run += 1; next = new Date(next.getTime() + 86_400_000); }
      longest = Math.max(longest, run);
    }
  });
  return { current, longest };
}

export default function Journal() {
  const [entries, setEntries] = useState(RightNowData.journalEntries.map((entry) => ({ ...entry, category: "Building" })));
  const [total, setTotal] = useState(isSupabaseConfigured ? 0 : RightNowData.journalEntries.length);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let query = supabase.from("journal_entries").select("id, entry_date, body, category", { count: "exact" }).eq("published", true);
    if (category !== "All") query = query.eq("category", category);
    query
      .order("entry_date", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
      .then(({ data, error, count }) => {
        if (!error && data) {
          setEntries(data.map((entry) => ({ ...entry, date: entry.entry_date, entry: entry.body })));
          setTotal(count ?? 0);
        }
      });
  }, [category, page]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let query = supabase.from("journal_entries").select("entry_date").eq("published", true);
    if (category !== "All") query = query.eq("category", category);
    query.then(({ data }) => {
      setTotal(data?.length ?? 0);
      setStreaks(getStreaks((data ?? []).map((entry) => entry.entry_date)));
    });
  }, [category]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <View>
      <div className={styles.page}>
        <a className={styles.back} href="#rn"><ArrowLeft size={18} /> Back to right now</a>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>DEV JOURNAL</p>
            <h1 className={styles.title}>Notes from the build.</h1>
            <p className={styles.summary}>Small decisions, experiments, and lessons gathered while turning ideas into working software.</p>
          </div>
          <p className={styles.count}><strong>{total}</strong> published {total === 1 ? "entry" : "entries"}</p>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.streak}><span>🔥</span><p><strong>{streaks.current} day</strong> current streak</p></div>
          <div className={styles.streak}><span>✦</span><p><strong>{streaks.longest} days</strong> longest streak</p></div>
          <div className={styles.filters} aria-label="Filter journal entries by topic">
            {categories.map((item) => <button key={item} className={item === category ? styles.activeFilter : ""} onClick={() => { setCategory(item); setPage(1); }}>{item}</button>)}
          </div>
        </div>
        <div className={styles.entries}>
          {entries.map((entry, index) => (
            <article className={styles.entry} key={entry.id ?? entry.date}>
              <div className={styles.date}><span className={styles.dot} /><time dateTime={entry.date}>{formatDate(entry.date)}</time></div>
              <div className={styles.note}><div className={styles.meta}><span className={styles.number}>LOG {String((page - 1) * PAGE_SIZE + index + 1).padStart(2, "0")}</span><span className={styles.category}>{entry.category ?? "Building"}</span></div><p>{entry.entry}</p></div>
            </article>
          ))}
        </div>
        {pageCount > 1 && <nav className={styles.pagination} aria-label="Journal pagination"><button disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span>Page {page} of {pageCount}</span><button disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>Next</button></nav>}
      </div>
    </View>
  );
}
