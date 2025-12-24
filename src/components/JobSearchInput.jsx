import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/userApi";
import styles from "../styles/JobSearch.module.css";

const MODES = [
  { label: "Job Title", value: "title" },
  { label: "Company", value: "company" },
];

export default function JobSearchInput() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("title");
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchedRef = useRef(false);
  const navigate = useNavigate();

  /* ------------------ Fetch Data ------------------ */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.getInputData(mode);
      setData(res.data || []);
      setFiltered(res.data || []);
      fetchedRef.current = true;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ On Focus ------------------ */
  const handleFocus = () => {
    setOpen(true);
    if (!fetchedRef.current) fetchData();
  };

  /* ------------------ Input Change ------------------ */
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    setFiltered(
      data.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  /* ------------------ Mode Change ------------------ */
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setQuery("");
    setData([]);
    setFiltered([]);
    fetchedRef.current = false;
    setOpen(false);
  };

  /* ------------------ Select Suggestion ------------------ */
  const handleSelect = (value) => {
    setQuery(value);
    setOpen(false);
    navigate(`/search?mode=${mode}&q=${encodeURIComponent(value)}`);
  };

  /* ------------------ Search ------------------ */
  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?mode=${mode}&q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* ------------------ Outside Click ------------------ */
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <section className={styles.hero}>
      <div
        className={styles.searchWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.inputContainer}>
          {/* Search Icon */}
          <svg className={styles.searchIcon} viewBox="0 0 24 24">
            <path d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
          </svg>

          {/* Input */}
          <input
            type="text"
            placeholder={`Search by ${
              MODES.find((m) => m.value === mode).label.toLowerCase()
            }`}
            value={query}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />

          {/* Right Controls */}
          <div className={styles.rightControls}>
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
              className={styles.modeSelect}
            >
              {MODES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <span className={styles.divider} />

            <button
              className={styles.searchButton}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {open && (
          <ul className={styles.dropdown}>
            {/* Skeletons while loading */}
            {loading && 
              [...Array(5)].map((_, i) => (
                <li key={i} className={styles.skeletonItem}>
                  <span className={styles.skeletonLine} />
                </li>
              ))}

            {!loading && filtered.length === 0 && (
              <li className={styles.empty}>No results</li>
            )}

            {!loading &&
              filtered.map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={styles.option}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
