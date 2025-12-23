import React from "react";
import styles from "../styles/PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1>Privacy Policy</h1>
        <p className={styles.update}>Last Updated: January 2025</p>

        <h2>1. Information We Collect</h2>
        <p>
          CareersPage collects information you provide such as name, email, 
          company details, job information, and any data submitted through forms.
        </p>
        <p>
          We also automatically collect device info, IP address, browser type,
          cookies, and usage data for analytical and security purposes.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Display job openings posted by companies</li>
          <li>Maintain & improve our platform</li>
          <li>Provide support and communications</li>
          <li>Monitor security and prevent misuse</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>
          We only share your information with registered companies 
          (if you apply), trusted service providers, or when legally required.
          We do NOT sell your data.
        </p>

        <h2>4. Cookies</h2>
        <p>Cookies help improve experience, performance, and analytics.</p>

        <h2>5. Data Security</h2>
        <p>
          We implement reasonable security measures, but no online service 
          is 100% secure.
        </p>

        <h2>6. Your Rights</h2>
        <p>You may request access, correction, or deletion of your data.</p>

        <h2>7. Children’s Privacy</h2>
        <p>This platform is not intended for users under 16.</p>

        <h2>8. Changes to Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Updates will be posted here.
        </p>

        <h2>9. Contact</h2>
        <p>Email: support@careerspage.com</p>
      </div>
    </div>
  );
}
