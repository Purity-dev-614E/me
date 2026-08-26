import { useEffect, useState } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { View } from "../../components";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import styles from "./admin.module.css";

const today = new Date().toISOString().slice(0, 10);

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ entry_date: today, body: "", category: "Building", published: false });

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase.from("journal_entries").select("*").order("entry_date", { ascending: false })
      .then(({ data, error }) => {
        if (error) setMessage(error.message);
        else setEntries(data ?? []);
      });
  }, [session]);

  const signIn = async (event) => {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Signed in.");
  };

  const addEntry = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from("journal_entries").insert(form).select().single();
    if (error) return setMessage(error.message);
    setEntries((current) => [data, ...current]);
    setForm({ entry_date: today, body: "", category: "Building", published: false });
    setMessage("Entry saved.");
  };

  const togglePublished = async (entry) => {
    const { data, error } = await supabase.from("journal_entries")
      .update({ published: !entry.published }).eq("id", entry.id).select().single();
    if (error) return setMessage(error.message);
    setEntries((current) => current.map((item) => item.id === data.id ? data : item));
  };

  if (!isSupabaseConfigured) {
    return <View><div className={styles.panel}><h1>Admin setup needed</h1><p>Add a valid Supabase Project URL and anonymous key to <code>.env.local</code>, then restart the dev server.</p></div></View>;
  }

  if (!session) {
    return (
      <View><div className={styles.panel}>
        <a className={styles.back} href="#rn"><ArrowLeft size={18} /> Back to site</a>
        <h1>Journal admin</h1><p>Only your Supabase account can sign in here.</p>
        <form className={styles.form} onSubmit={signIn}>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          <button type="submit">Sign in</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div></View>
    );
  }

  return (
    <View><div className={styles.panel}>
      <div className={styles.top}><div><p className={styles.eyebrow}>PRIVATE AREA</p><h1>Journal admin</h1></div><button className={styles.signout} onClick={() => supabase.auth.signOut()}><LogOut size={17} /> Sign out</button></div>
      <form className={styles.form} onSubmit={addEntry}>
        <label>Date<input type="date" value={form.entry_date} onChange={(e) => setForm({ ...form, entry_date: e.target.value })} required /></label>
        <label>Topic<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Building</option><option>LeetCode</option><option>Learning</option><option>Other</option></select></label>
        <label>Journal entry<textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows="5" required /></label>
        <label className={styles.checkbox}><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publish now</label>
        <button type="submit">Save entry</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.entries}>{entries.map((entry) => <article key={entry.id}><div><time>{entry.entry_date} · {entry.category ?? "Building"}</time><p>{entry.body}</p></div><button className={styles.status} onClick={() => togglePublished(entry)}>{entry.published ? "Published" : "Draft"}</button></article>)}</div>
    </div></View>
  );
}
