import React, { useEffect, useState } from "react";
import api from "../../api/userApi";
import JobCard from "../../components/JobCard";
import styles from "../../styles/SearchByCompany.module.css";

export default function SearchByCompany({ query }) {
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        setLoading(true);

        const res = await api.searchJobs({
          query,
          mode: "company",
          page,
        });

        setCompany(res.data.company);
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJobs();
  }, [query, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  if (loading) return <div className={styles.loader}>Loading jobs…</div>;
  if (!company) return <p>Company not found</p>;

  return (
    <div className={styles.container}>
      {/* ================= HERO ================= */}
      <section className={styles.companyHero}>
        <div className={styles.heroCard}>
          <div className={styles.logoBox}>
            {company.logo && (
              <img
                src={company.logo}
                alt={company.companyName}
                className={styles.logo}
              />
            )}
          </div>

          <div className={styles.companyMeta}>
            <h1>{company.companyName}</h1>
            <p className={styles.subtitle}>
              {company.industry} <span className={styles.dot}>•</span> <br /> {company.companySize}
            </p>

            <div className={styles.actions}>
              {company.website && (
                <a href={company.website} target="_blank" rel="noreferrer">
                  <GlobeIcon />
                  Visit Website
                </a>
              )}
              {company.careersPage && (
                <a href={company.careersPage} target="_blank" rel="noreferrer">
                  <BriefcaseIcon />
                  View Careers Page
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className={styles.details}>
        <div className={styles.about}>
          <h2>About {company.companyName}</h2>
          <p>{company.description}</p>
        </div>

        <div className={styles.infoCard}>
          <InfoRow icon={<IndustryIcon />} label="Industry" value={company.industry} />
          <InfoRow icon={<AtsIcon />} label="ATS" value={company.atsUsed || "None / Custom ATS"} />
          <InfoRow icon={<UsersIcon />} label="Company Size" value={company.companySize} />
          <InfoRow icon={<MailIcon />} label="Contact" value={company.contactEmail} />
        </div>
      </section>

      {/* ================= JOBS ================= */}
      <section className={styles.jobsHeader}>
        <h2>
          Jobs at {company.companyName} <span>({jobs.length})</span>
        </h2>
      </section>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div className={styles.jobList}>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            ‹
          </button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= INFO ROW ================= */
function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoIcon}>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

/* ================= ICONS (INLINE SVG) ================= */

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M838-65 720-183v89h-80v-226h226v80h-90l118 118-56 57ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 20-2 40t-6 40h-82q5-20 7.5-40t2.5-40q0-20-2.5-40t-7.5-40H654q3 20 4.5 40t1.5 40q0 20-1.5 40t-4.5 40h-80q3-20 4.5-40t1.5-40q0-20-1.5-40t-4.5-40H386q-3 20-4.5 40t-1.5 40q0 20 1.5 40t4.5 40h134v80H404q12 43 31 82.5t45 75.5q20 0 40-2.5t40-4.5v82q-20 2-40 4.5T480-80ZM170-400h136q-3-20-4.5-40t-1.5-40q0-20 1.5-40t4.5-40H170q-5 20-7.5 40t-2.5 40q0 20 2.5 40t7.5 40Zm34-240h118q9-37 22.5-72.5T376-782q-55 18-99 54.5T204-640Zm172 462q-18-34-31.5-69.5T322-320H204q29 51 73 87.5t99 54.5Zm28-462h152q-12-43-31-82.5T480-798q-26 36-45 75.5T404-640Zm234 0h118q-29-51-73-87.5T584-782q18 34 31.5 69.5T638-640Z"/></svg>

);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg>
);

const IndustryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M80-80v-481l280-119v80l200-80v120h320v480H80Zm80-80h640v-320H480v-82l-200 80v-78l-120 53v347Zm280-80h80v-160h-80v160Zm-160 0h80v-160h-80v160Zm320 0h80v-160h-80v160Zm280-320H680l40-320h120l40 320ZM160-160h640-640Z"/></svg>
);

const AtsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm80-160h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160Zm80-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM480-480Z"/></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
);
