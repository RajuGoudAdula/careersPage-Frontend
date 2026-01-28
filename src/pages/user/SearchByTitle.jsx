import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/userApi";
import JobCard from "../../components/JobCard";
import styles from "../../styles/SearchByTitle.module.css";

export default function SearchByTitle() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ---------------- ENSURE PAGE PARAM EXISTS ---------------- */
  useEffect(() => {
    if (!searchParams.get("page")) {
      const params = new URLSearchParams(searchParams);
      params.set("page", 1);
      setSearchParams(params, { replace: true });
    }
  }, []);

  /* ---------------- FETCH JOBS ---------------- */
  useEffect(() => {
    if (!query) return;

    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await api.searchJobs({
          query,
          mode: "title",
          page,
        });

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

  

  /* ---------------- UPDATE PAGE IN URL ---------------- */
  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return <div className={styles.loader}>Loading jobs…</div>;
  }

  if (!jobs.length) {
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
          <JobCard
            key={job._id}
            job={job}
            favicon={job?.company?.favicon}
            expanded
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => updatePage(page - 1)}
          >
            ‹
          </button>

          <span>
            Page <strong>{page}</strong> of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => updatePage(page + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
