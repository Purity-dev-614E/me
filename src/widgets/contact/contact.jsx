import React from "react";
import styles from "./contact.module.css";
import { Button, View } from "../../components";
import { contactData } from "./data";
import "@fontsource/roboto-mono/400.css";
import { site } from "../../site";
import "@fontsource/crimson-text";

const contact = () => {
  return (
    <View>
      <div className={styles.info}>
        <span className={styles.sectionlabel}>{contactData.sectionLabel}</span>
        <div className={styles.info2}>
          <h1 className={styles.eyebrow}>{contactData.eyebrow}</h1>
          <h1 className={styles.title}>{contactData.headline}</h1>
          <Button link={contactData.callCta.href} className={styles.btn}>
            {contactData.callCta.label}
          </Button>
        </div>
      </div>
      <div className={styles.contact}>
        <p className={styles.find}>{contactData.find}</p>
        <div className={styles.contactinfo}>
          {site.social.map(({ icon: Icon, link, type }, i) => (
            <a
              key={i}
              href={type === "email" ? `mailto:${link}` : link}
              target={type === "email" ? undefined : "_blank"}
              rel={type === "email" ? undefined : "noopener noreferrer"}
            >
              <Icon size={20} />
              <span className={styles.link}>{link}</span>
            </a>
          ))}
        </div>
      {/* <p className={styles.closing}>{contactData.closingLine}</p> */}
      </div>
    </View>
  );
};

export default contact;
