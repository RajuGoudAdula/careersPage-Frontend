import React from "react";
import styles from "../styles/HeroSection.module.css";
import JobSearchInput from "./JobSearchInput";

export default function HeroSection({scrollToJobs}) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.desktop}>
            JOB PORTALS DON'T RESPOND.<br />
            <span className={styles.highlight}>COMPANIES DO.</span>
          </span>

          <span className={styles.mobile}>
            JOB PORTALS<br />
            DON'T<br />
            RESPOND.<br />
            <span className={styles.highlight}>COMPANIES DO.</span>
          </span>
        </h1>


        <p className={styles.subtitle}>
          With <strong>careerspage</strong>, apply once, reach real company career pages — 
          and get notified instantly.
        </p>

        <JobSearchInput />

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={scrollToJobs}>Start Exploring</button>
        </div>
      </div>
    </section>
  );
}
