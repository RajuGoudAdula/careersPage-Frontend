import styles from "../styles/SkeletonCompanyCard.module.css";

export default function SkeletonCompanyCard() {
  return (
    <div className={styles.card}>
      <div className={styles.logo} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.subtitle} />
        <div className={styles.meta} />
        <div className={styles.button} />
      </div>
    </div>
  );
}
