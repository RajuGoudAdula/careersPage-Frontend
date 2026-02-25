import React, { useState } from "react";
import styles from "../../styles/GovernmentJobs.module.css";
import { FiArrowRight } from "react-icons/fi";

const jobsData = [
  {
    id: 1,
    title: "UPSC Civil Services 2026",
    department: "Union Public Service Commission",
    location: "India",
    lastDate: "March 30, 2026",
  },
  {
    id: 2,
    title: "Railway Recruitment Board - NTPC",
    department: "Indian Railways",
    location: "All India",
    lastDate: "April 12, 2026",
  },
  {
    id: 3,
    title: "SSC CGL 2026",
    department: "Staff Selection Commission",
    location: "India",
    lastDate: "May 02, 2026",
  },
  {
    id: 4,
    title: "State PSC Officer",
    department: "State Public Service Commission",
    location: "Multiple States",
    lastDate: "June 15, 2026",
  },
];

const GovernmentJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsData.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobsData.length / jobsPerPage);

  return (
    <div className={styles.container}>
      
      {/* HERO SECTION */}
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.content}>
          <h1 className={styles.title}>
            DON’T MISS YOUR GOVERNMENT CAREER.
            <br />
            <span className={styles.highlight}>
              APPLY WITH CONFIDENCE.
            </span>
          </h1>

          <p className={styles.subtitle}>
            Discover verified openings, track every deadline,
            and secure your future.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              Browse Government Jobs
              <FiArrowRight />
            </button>

            <button className={styles.secondaryBtn}>
              Get Job Alerts
            </button>
          </div>
        </div>
      </section>


      {/* JOB LIST SECTION */}
      <section className={styles.jobsSection}>
        <h2 className={styles.sectionTitle}>Recent Openings</h2>

        <div className={styles.jobGrid}>
          {currentJobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div>
                <h3>{job.title}</h3>
                <p className={styles.department}>{job.department}</p>
                <p className={styles.meta}>
                  📍 {job.location} | ⏳ Last Date: {job.lastDate}
                </p>
              </div>

              <div className={styles.cardArrow}>
                <FiArrowRight size={22} />
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? styles.activePage
                  : styles.pageBtn
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GovernmentJobs;
