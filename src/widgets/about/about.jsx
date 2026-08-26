import React from "react";
import styles from "./about.module.css";
import { View } from "../../components/index";
import { aboutData } from "./data";
import "@fontsource/crimson-text";
import "@fontsource/roboto-mono/400.css";

const about = () => {
  return (
    <View id="about">
      <div className={styles.about}>
        <span className={styles.sectionlabel}>{aboutData.sectionLabel}</span>
        <div className={styles.content}>
          <h1 className={styles.header}>{aboutData.eyebrow}</h1>
          <h1 className={styles.headline}>{aboutData.headline}</h1>
          <p className={styles.bio}>{aboutData.bio}</p>
          <p className={styles.toolbox}>TOOLBOX</p>
          <div className={styles.tools}>
            {" "}
            {aboutData.toolbox.map((tool, i) => (
              <p className={styles.tool} key={i}>
                {tool}
              </p>
            ))}
          </div>
          <div className={styles.experience}>
            <span className={styles.experienceLabel}>EXPERIENCE SNAPSHOT</span>
            <div><strong>{aboutData.experience.role}</strong><span>{aboutData.experience.org} · {aboutData.experience.year}</span></div>
            <p>{aboutData.experience.blurb}</p>
          </div>
        </div>
      </div>
    </View>
  );
};

export default about;
