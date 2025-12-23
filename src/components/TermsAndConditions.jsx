import React from "react";
import styles from "../styles/TermsAndConditions.module.css";

export default function TermsAndConditions() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1>Terms & Conditions</h1>
        <p className={styles.update}>Last Updated: January 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using CareersPage, you agree to these Terms and Conditions.
          If you do not agree, please stop using the platform.
        </p>

        <h2>2. Use of Platform</h2>
        <p>
          You agree not to misuse the platform, submit fake information,
          or engage in any harmful activities.
        </p>

        <h2>3. Job Posting Responsibility</h2>
        <p>
          Companies are solely responsible for the accuracy and authenticity 
          of job postings. CareersPage is not responsible for hiring outcomes.
        </p>

        <h2>4. User Responsibilities</h2>
        <ul>
          <li>Apply only to real job openings</li>
          <li>Do not impersonate others</li>
          <li>Do not misuse company data</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          Content, design, and branding belong to CareersPage and may not be used
          without permission.
        </p>

        <h2>6. Prohibited Actions</h2>
        <ul>
          <li>Posting false job openings</li>
          <li>Scraping data</li>
          <li>Uploading malware</li>
          <li>Hacking or disrupting services</li>
        </ul>

        <h2>7. Limitation of Liability</h2>
        <p>
          CareersPage is not liable for incorrect job data, interactions 
          with companies, or external website content.
        </p>

        <h2>8. Account Termination</h2>
        <p>
          We may remove accounts violating policies or engaging in fraudulent activity.
        </p>

        <h2>9. Third-Party Links</h2>
        <p>
          We are not responsible for content on external links.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>Updates may occur anytime and will be posted here.</p>

        <h2>11. Contact</h2>
        <p>Email: support@careerspage.com</p>
      </div>
    </div>
  );
}
