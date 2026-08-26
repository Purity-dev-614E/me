import React, { useEffect, useState } from "react";
import { View, Card } from "../../components/index";
import styles from "./now.module.css";
import { RightNowData } from "./data";
import "@fontsource/crimson-text";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/sora";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

const Now = () => {
  const [journalEntries, setJournalEntries] = useState(RightNowData.journalEntries);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase
      .from("journal_entries")
      .select("id, entry_date, body")
      .eq("published", true)
      .order("entry_date", { ascending: false })
      .limit(2)
      .then(({ data, error }) => {
        if (!error && data) {
          setJournalEntries(data.map((entry) => ({
            id: entry.id,
            date: entry.entry_date,
            displayDate: new Intl.DateTimeFormat("en", { day: "numeric", month: "short" }).format(new Date(`${entry.entry_date}T00:00:00`)),
            entry: entry.body,
          })));
        }
      });
  }, []);

  return (
    <View id="rn">
      <div className={styles.now}>
        <span className={styles.sectionLabel}>{RightNowData.sectionLabel}</span>
        <div className={styles.content}>
          <h2 className={styles.heading}>{RightNowData.heading1}</h2>
          <Card>
            <div className={styles.progress}>
              <div className={styles.circle}></div>
              <span className={styles.banner}>
                {RightNowData.currentlyBuildingData[0].status}
              </span>
            </div>
            <h2 className={styles.title}>
              {RightNowData.currentlyBuildingData[0].title}
            </h2>
            <p className={styles.description}>
              {RightNowData.currentlyBuildingData[0].description}
            </p>
          </Card>
          <section className={styles.journalPreview}>
            <div className={styles.journalHeader}>
              <div>
                <p className={styles.kicker}>LATEST LOGS</p>
                <h2 className={styles.heading}>{RightNowData.heading2}</h2>
              </div>
              <span className={styles.journalDot} aria-hidden="true" />
            </div>
            <div className={styles.entryList}>
              {journalEntries.slice(0, 2).map((entry, index) => (
                <article className={styles.entry} key={entry.id ?? entry.date}>
                  <div className={styles.entryMeta}>
                    <span className={styles.entryDate}>{entry.displayDate}</span>
                    <span className={styles.logNumber}>LOG {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className={styles.entryText}>{entry.entry}</p>
                </article>
              ))}
            </div>
            <a className={styles.more} href="#/journal">{RightNowData.closing} <span aria-hidden="true">→</span></a>
          </section>
        </div>
      </div>
    </View>
  );
};

export default Now;
