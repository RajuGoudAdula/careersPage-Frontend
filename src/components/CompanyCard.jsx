import React, { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import JobCard from "./JobCard";
import api from "../api/userApi";
import { Link } from "react-router-dom";

export default function CompanyCard({ company }) {
  const [expanded, setExpanded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const imgRef = useRef(null);

  const fetchJobs = async (pageNumber = 1) => {
    try {
      const res = await api.getCompanyJobs(company?._id, pageNumber);

      setJobs(res?.data?.jobs || []);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = () => {
    if (!expanded) {
      setPage(1);
      fetchJobs(1);
    }
    setExpanded((prev) => !prev);
  };

  const handlePageChange = (newPage, e) => {
    e.stopPropagation(); // 👈 prevent collapsing card
    setPage(newPage);
    fetchJobs(newPage);
  };

  return (
    <div
      className={`${styles.companyCard} ${expanded ? styles.expanded : ""}`}
      onClick={handleCardClick}
      title={company.companyName}
    >
      {/* Logo + Company Name */}
      <div style={{ padding: "3px" }}>
        <img
          ref={imgRef}
          src={company.logo}
          alt={company.companyName}
          className={`${styles.logo} ${expanded ? styles.logoSmall : ""}`}
        />

        {expanded && (
          <h2 className={styles.companyName}>
            <a
              href={company?.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {company.companyName}
            </a>
          </h2>
        )}
        {expanded && (
          <span className={styles.expandeIcon}>
               <Link to={`/search?mode=company&q=${company?.companyName}`} onClick={(e) => e.stopPropagation()}> 
                 <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#434343"><path d="M240-240v-240h72v168h168v72H240Zm408-240v-168H480v-72h240v240h-72Z"/>
                  </svg>
               </Link>
          </span>
        )}
      </div>

      {/* Jobs Section */}
      {expanded && (
        <div className={styles.jobsContainer}>
          {jobs.length === 0 ? (
            <p className={styles.noJobs}>No jobs found</p>
          ) : (
            <>
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  favicon={company?.favicon}
                />
              ))}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    disabled={page === 1}
                    onClick={(e) => handlePageChange(page - 1, e)}
                  >
                    ‹
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={(e) => handlePageChange(page + 1, e)}
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
