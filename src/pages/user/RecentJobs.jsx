import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "../../styles/RecentJobs.module.css";
import api from "../../api/userApi";
import JobCard from "../../components/JobCard";

/* ================= CONSTANTS ================= */
const CATEGORIES = ["IT", "Government"];

const IT_EXPERIENCES = ["Fresher", "0-1 years", "1-2 years", "2-5 years"];
const IT_LOCATIONS = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Pune",
  "Mumbai",
  "Delhi / NCR",
  "Remote",
  "Other",
];

const GOV_QUALIFICATIONS = [
  "10th",
  "12th",
  "Diploma",
  "Degree",
  "Postgraduate",
];

const GOV_STATES = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Delhi / NCR",
  "Other",
];

const PAGE_LIMIT = 10;

const RecentJobs = () => {
  /* ================= STATES ================= */
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [autosuggest, setAutosuggest] = useState([]);
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const debounceRef = useRef(null);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = useCallback(
    async (customSearch = search) => {
      if (!category) return;

      setLoading(true);

      try {
        const res = await api.getJobs({
          page,
          limit: PAGE_LIMIT,
          category,
          search: customSearch,
          ...filters,
        });

        setJobs(res?.data?.jobs || []);
        setTotalJobs(res?.data?.total || 0);
      } catch (err) {
        console.error("Fetch Jobs Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [category, search, filters, page]
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  /* ================= SEARCH FOCUS ================= */
  const handleSearchFocus = () => {
    if (!category && categoryRef.current) {
      categoryRef.current.focus();
    }
  };

  /* ================= AUTOSUGGEST ================= */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!category || value.length < 2) {
      setAutosuggest([]);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await api.getJobSuggestions({
          category,
          search: value,
        });

        setAutosuggest(res?.data?.suggestions || []);
      } catch {
        setAutosuggest([]);
      }
    }, 400);
  };

  const handleSelectSuggestion = (title) => {
    setSearch(title);
    setAutosuggest([]);
    setPage(1);
    fetchJobs(title);
  };

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setAutosuggest([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FILTERS ================= */
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setFilters({});
    setSearch("");
    setAutosuggest([]);
    setPage(1);
  };

  const totalPages = Math.ceil(totalJobs / PAGE_LIMIT);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* ================= SEARCH ================= */}
        <div className={styles.searchWrapper} ref={searchRef}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            className={styles.searchInput}
          />

          {autosuggest.length > 0 && (
            <div className={styles.autosuggest}>
              {autosuggest.map((s, index) => (
                <div
                  key={index}
                  className={styles.suggestItem}
                  onClick={() => handleSelectSuggestion(s.label)}
                >
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= CATEGORY ================= */}
        <select
          ref={categoryRef}
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className={styles.categoryDropdown}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* ================= IT FILTERS ================= */}
        {category === "IT" && (
          <>
            <select
              value={filters.experience || ""}
              onChange={(e) =>
                handleFilterChange("experience", e.target.value)
              }
            >
              <option value="">Experience</option>
              {IT_EXPERIENCES.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>

            <select
              value={filters.location || ""}
              onChange={(e) =>
                handleFilterChange("location", e.target.value)
              }
            >
              <option value="">Location</option>
              {IT_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </>
        )}

        {/* ================= GOVERNMENT FILTERS ================= */}
        {category === "Government" && (
          <>
            <select
              value={filters.qualification || ""}
              onChange={(e) =>
                handleFilterChange("qualification", e.target.value)
              }
            >
              <option value="">Qualification</option>
              {GOV_QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>

            <select
              value={filters.state || ""}
              onChange={(e) =>
                handleFilterChange("state", e.target.value)
              }
            >
              <option value="">State</option>
              {GOV_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </>
        )}

        {/* ================= SEARCH BUTTON ================= */}
        <button
          className={styles.searchBtn}
          onClick={() => {
            if (!category) {
              categoryRef.current.focus();
              return;
            }
            setPage(1);
            fetchJobs(search);
          }}
        >
          Search
        </button>
      </div>

      {/* ================= JOB LIST ================= */}
      <div className={styles.jobList}>
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            {"<<"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={i + 1 === page ? styles.activePage : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {">>"}
          </button>
        </div>
      )}

      <p className={styles.jobCount}>
        Showing {(page - 1) * PAGE_LIMIT + 1}–
        {Math.min(page * PAGE_LIMIT, totalJobs)} of {totalJobs} jobs
      </p>
    </div>
  );
};

export default RecentJobs;