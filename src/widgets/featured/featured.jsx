import React from "react";
import { View, Card } from "../../components";
import "@fontsource/crimson-text";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/sora";
import styles from "./featured.module.css";
import { featuredProjectData } from "./data";

const featured = () => {
  return (
    <View>
      <div className={styles.main}>
        <span className={styles.sectionLabel}>
          {featuredProjectData.sectionLabel}
        </span>
        <div className={styles.content}>
          <h2 className={styles.tag}>{featuredProjectData.tag}</h2>
          <h1 className={styles.title}>{featuredProjectData.title}</h1>
          <p className={styles.description}>
            {featuredProjectData.description}
          </p>
          <div className={styles.stats}>
            {featuredProjectData.stats.map((stat, i) => (
              <div className={styles.stat} key={i}>
                <span className={styles.value}>{stat.value}</span>
                <p className={styles.label}>{stat.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.stacks}>
            {featuredProjectData.stack.map((stack, i) => (
              <span className={styles.stack} key={i}>
                {stack}
              </span>
            ))}
          </div>
          <div className={styles.screenshotContainer}>
            {featuredProjectData.screenshots.map((screenshot, i) => {
              const offset =
                i === 0 ? 0 : Math.ceil(i / 2) * (i % 2 === 0 ? -1 : 1);

              return (
                <Card
                  className={styles.card}
                  key={i}
                  style={{
                    "--i": offset,
                    "--z":
                      featuredProjectData.screenshots.length - Math.abs(offset),
                  }}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className={styles.screenshot}
                  />
                  <p>{screenshot.alt}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </View>
  );
};

export default featured;
