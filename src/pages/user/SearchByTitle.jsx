import React, { useEffect, useState } from "react";
import api from "../../api/userApi";
import JobCard from "../../components/JobCard";
import styles from "../../styles/SearchByTitle.module.css";

export default function SearchByTitle({ query }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await api.searchJobs({
          query,
          mode: "title",
          page,
        });
        console.log(res?.data)
        setJobs(res?.data?.jobs || []);
        setTotalPages(res?.data?.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [query, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  if (loading) {
    return <div className={styles.loader}>Loading jobs…</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className={styles.emptyState}>
        No jobs found for <strong>“{query}”</strong>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Jobs for <span>{query}</span>
      </h2>

      <div className={styles.jobList}>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} favicon={job?.company?.favicon} expanded={true}/>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹
          </button>

          <span>
            Page <strong>{page}</strong> of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
