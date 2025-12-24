import styles from "../styles/SkeletonJobCard.module.css";

export default function SkeletonJobCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.logo} />
        <div className={styles.titleBlock}>
          <div className={styles.title} />
          <div className={styles.subtitle} />
        </div>
      </div>

      <div className={styles.meta} />
      <div className={styles.button} />
    </div>
  );
}
