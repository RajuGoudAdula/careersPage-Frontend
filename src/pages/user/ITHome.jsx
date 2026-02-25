import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import api from "../../api/userApi";
import CompanyCard from "../../components/CompanyCard";
import HeroSection from "../../components/HeroSection";
import SkeletonCompanyCard from "../../components/SkeletonCompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const jobSectionRef = useRef(null);

  const scrollToJobs = () => {
    if (jobSectionRef.current) {
      jobSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.getCompaniesForUser(page);
      setCompanies(res.data.companies);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  return (
    <div className={styles.container}>
      <HeroSection scrollToJobs={scrollToJobs} />

      <h2>Explore Companies</h2>

      {/* Company Grid */}
      <div className={styles.grid} ref={jobSectionRef}>
        {loading
          ? [...Array(8)].map((_, i) => (
              <SkeletonCompanyCard key={i} />
            ))
          : companies?.map((c) => (
              <CompanyCard key={c._id} company={c} />
            ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>{page} / {totalPages}</span>

        <button
          disabled={page === totalPages || loading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
