import React from "react";
import { Button, View } from "../../components";
import styles from "./hero.module.css";
import { heroData } from "./data";
import { site } from "../../site";
import "@fontsource/crimson-text";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/sora";

const hero = () => {
  return (
    <div>
      <View>
        <div className={styles.top}>
          <span className={styles.name}>{site.shortName}</span>
          <div className={styles.navigation}>
            {site.nav.map((nav, i) => (
              <a className={styles.nav} key={i} href={nav.href}>
                {nav.label} 
              </a>
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.content}>
            <div className={styles.mid}>
              <h2 className={styles.eyebrow}>{heroData.eyebrow}</h2>
              <h1 className={styles.headline}>{heroData.headline}</h1>
              <p className={styles.subtext}>{heroData.subtext}</p>
            </div>
            <div className={styles.end}>
              <Button> {heroData.primaryCta.label} </Button>
              <a className={styles.button} href={heroData.secondaryLink.href}>
                {heroData.secondaryLink.label}
              </a>
            </div>
          </div>
          <span className={styles.sectionlabel}>{heroData.sectionLabel}</span>
        </div>
      </View>
    </div>
  );
};

export default hero;
