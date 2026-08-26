import React from "react";
import styles from "./other.module.css";
import { otherProjectsData } from "./data";
import { View, Card } from "../../components";
import "@fontsource/crimson-text";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/sora";

const other = () => {
  return (
    <View id="skills">
      <div className={styles.main}>
        <span className={styles.sectionLabel}>
          {otherProjectsData.sectionLabel}
        </span>
        <div className={styles.content}>
          <h2 className={styles.header}>{otherProjectsData.header}</h2>
          <div className={styles.grid}>
            {otherProjectsData.projects.map((project) => (
              <Card
                key={project.id}
                className={project.featured ? styles.featured : styles.card}
              >
                <h2 className={styles.title}>{project.name}</h2>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.stackContainer}>
                  {project.stack.map((stack, i) => (
                    <span className={styles.stack} key={i}>
                      {" "}
                      {stack}{" "}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </View>
  );
};

export default other;
