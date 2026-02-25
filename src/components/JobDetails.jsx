import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/JobDetails.module.css";
import api from "../api/userApi";

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const status = getDeadlineStatus(job?.applicationEndDate);


  /* ================================
     Format Date (DD MMM YYYY)
  ================================== */
  const formatDate = (date) => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ================================
     Time Ago Function
  ================================== */
  const timeAgo = (date) => {
    if (!date) return "";

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value > 0) {
        return `${value} ${key}${value > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  /* ================================
     Fetch Job
  ================================== */
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.getJobDetails(jobId);
        console.log(response);
        setJob(response?.data?.job);
      } catch (err) {
        console.error(err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);


  /* ================================
     Memoized Status Class
  ================================== */
  const statusClass = useMemo(() => {
    if (job?.status === "active") return styles.activeStatus;
    return styles.expiredStatus;
  }, [job]);

  /* ================================
     Loading Skeleton
  ================================== */
  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loader}>Loading job details...</div>
      </div>
    );
  }

  /* ================================
     Error State
  ================================== */
  if (error || !job) {
    return (
      <div className={styles.errorContainer}>
        <h1>Job Not Found</h1>
        <p>{error || "The job has been removed or does not exist."}</p>
        <Link to="/" className={styles.backButton}>
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* ================= HERO SECTION ================= */}
      <header className={styles.hero}>
        <div className={styles.heroLeft}>
          <img
            src={
              job?.organization?.logo ||
              "https://via.placeholder.com/100x100?text=Logo"
            }
            alt={job?.organization?.name}
            className={styles.companyLogo}
          />

          <div>
            <h1 className={styles.jobTitle}>{job?.title}</h1>

            <p className={styles.companyName}>
            <a
                href={job?.organization?.website}
                target="_blank"
                rel="noopener noreferrer"
              >
              {job?.organization?.name}
              </a>
            </p>

            <div className={styles.metaRow}>
              <span className={styles.categoryBadge}>
                {job?.organization?.category?.toUpperCase()}
              </span>

              {/* {job?.isFeatured && (
                <span className={styles.featuredBadge}>
                  ⭐ FEATURED
                </span>
              )} */}

              <span className={styles.postedTime}>
                Posted {timeAgo(job?.postedDate)}
              </span>
            </div>
          </div>
        </div>

        {job?.status === "active" ? (
          <a
            href={job?.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            Apply Now
          </a>
        ) : (
          <button className={styles.expiredButton} disabled>
            Expired
          </button>
        )}
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className={styles.contentGrid}>
        
        {/* LEFT SECTION */}
        <section className={styles.leftSection}>
          <h2>Job Description</h2>
          <p>{job?.shortDescription || "No description provided."}</p>

          {job?.qualificationText && (
            <>
              <h3>Qualification</h3>
              <p>{job?.qualificationText}</p>
            </>
          )}

          {job?.experienceText && (
            <>
              <h3>Experience</h3>
              <p>{job?.experienceText}</p>
            </>
          )}

          {job?.notificationPDF && (
            <a
              href={job?.notificationPDF}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pdfButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M340-460h280v-64H340v64Zm0 120h280v-64H340v64Zm0 120h174v-64H340v64ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v168-168 624-624Z"/></svg>
              View Official Notification
            </a>
          )}
        </section>

        {/* RIGHT SECTION */}
        <aside className={styles.rightSection}>
          <div className={styles.overviewCard}>
            <h3>Job Overview</h3>

            <OverviewItem label="Location">
              {job?.location?.city}, {job?.location?.state}
            </OverviewItem>

            <OverviewItem label="Salary">
              {job?.salaryText || "Not disclosed"}
            </OverviewItem>

            <OverviewItem label="Employment Type">
              {job?.employmentType || "Not specified"}
            </OverviewItem>

            <OverviewItem label="Last Date">
              <span className={`${styles.deadline} ${styles[status]}`}>
                {formatDate(job?.applicationEndDate)}
              </span>
            </OverviewItem>

            <OverviewItem label="Status">
              <span className={statusClass}>
                {job?.status}
              </span>
            </OverviewItem>

            <OverviewItem label="Source">
              {job?.source || "Official Website"}
            </OverviewItem>

            <OverviewItem label="Views">
              {job?.views || 0}
            </OverviewItem>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* ================================
   Reusable Overview Item Component
================================== */
function OverviewItem({ label, children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
      <span style={{ fontWeight: 700 }}>{label}:</span>
      <span>{children}</span>
    </div>
  );
}

const getDeadlineStatus = (date) => {
  if (!date) return "unknown";

  const today = new Date();
  const endDate = new Date(date);

  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "expired";
  if (diffDays <= 3) return "urgent";
  if (diffDays <= 10) return "closing";
  return "open";
};