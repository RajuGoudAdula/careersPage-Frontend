import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import api from "../../api/userApi";
import CompanyCard from "../../components/CompanyCard";
import HeroSection from "../../components/HeroSection";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobSectionRef = useRef(null);


  const scrollToJobs = () => {
    if (jobSectionRef.current) {
      jobSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await api.getCompaniesForUser(page);
      console.log(res);
      setCompanies(res.data.companies);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  return (
    <div className={styles.container}>
      <HeroSection scrollToJobs={scrollToJobs}/>
        <h2>Explore Companies</h2>
      {/* Company Grid */}
      <div className={styles.grid} ref={jobSectionRef}>
        {companies?.map((c) => (
          <CompanyCard key={c._id} company={c} />
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>{page} / {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
