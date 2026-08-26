import React from "react";
import { View, Card } from "../../components/index";
import styles from "./now.module.css";
import { RightNowData } from "./data";
import "@fontsource/crimson-text";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/sora";

const now = () => {
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
          <h2 className={styles.heading}>{RightNowData.heading2}</h2>
          {RightNowData.journalEntries.map((entry, i) => (
            <div className={styles.entry} key={entry.date}>
              <span className={styles.entryDate}>{entry.displayDate}</span>
              <p className={styles.entryText}>{entry.entry}</p>
            </div>
          ))}
        </div>
      </div>
      <a className={styles.more}>{RightNowData.closing}</a>
    </View>
  );
};

export default now;
