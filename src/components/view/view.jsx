import React, { useEffect, useRef, useState } from "react";
import styles from "./view.module.css";

const View = ({ children, id }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${styles.shell} ${isVisible ? styles.visible : ""}`}
      id={id}
      ref={sectionRef}
    >
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
