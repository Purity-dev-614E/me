import React from "react";
import styles from "./view.module.css";

const View = ({ children, id }) => {
  return (
    <section className={styles.shell} id={id}>
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>

      <div className={styles.contentlayer}>
        {children}
      </div>
    </section>
  );
};

export default View;
