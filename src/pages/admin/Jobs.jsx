import React, { useState, useEffect } from "react";
import JobCard from "../../components/JobCard.jsx";
import adminApi from "../../api/adminApi.js";
import styles from "../../styles/Jobs.module.css";

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const JOBS_PER_PAGE = 9;

  // ✅ Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await adminApi.getJobs({
          page: currentPage,
          limit: JOBS_PER_PAGE,
        });


        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Previous Jobs</h2>

      {/* Loading */}
      {loading && <p className={styles.infoText}>Loading jobs...</p>}

      {/* Error */}
      {error && <p className={styles.errorText}>{error}</p>}

      {/* No Jobs */}
      {!loading && jobs.length === 0 && (
        <p className={styles.noJobs}>No jobs available.</p>
      )}

      {/* Jobs Grid */}
      {!loading && jobs.length > 0 && (
        <>
          <div className={styles.grid}>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${styles.pageNumber} ${
                    currentPage === index + 1 ? styles.active : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={styles.pageBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;