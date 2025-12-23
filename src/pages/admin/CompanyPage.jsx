import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/CompanyPage.module.css";
import api from "../../api/adminApi";
import CompanyFormModal from "../../components/CompanyFormModal";
import JobFormModal from "../../components/JobFormModal";

export default function CompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState(null);

  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  // Fetch company
  const fetchCompany = async () => {
    const res = await api.getCompanyDetails(id);
    if (res?.data?.success) {
      setCompany(res.data.data);
    }
  };

  // Fetch jobs (with pagination)
  const fetchJobs = async (pg = 1) => {
    const res = await api.fetchCompanyJobs(id, pg);
    console.log(res);
    if (res?.data?.success) {
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchJobs(page);
  }, []);

  // Delete company
  const deleteCompany = async () => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    await api.deleteCompany(id);
    navigate("/admin/companies");
  };

  // Add New Job
  const openNewJobModal = () => {
    setEditJob(null);
    setJobModalOpen(true);
  };

  // Edit Company Modal
  const openEditCompanyModal = () => {
    setEditCompany(company);
    setModalOpen(true);
  };

  // Edit job
  const handleEditJob = (job) => {
    setEditJob(job);
    setJobModalOpen(true);
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await api.deleteJob(id, jobId);
      if (res?.data?.success) {
        fetchJobs(page); // refresh current page
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      {!company ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Company Header */}
          <div className={styles.header}>
            <div className={styles.left}>
              <img
                src={company.logo || company.careersPage}
                alt={company.companyName}
                className={styles.logo}
              />

              <div>
                <h1>{company.companyName}</h1>
                <p>{company.industry}</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button onClick={openEditCompanyModal} className={styles.update}>
                Update
              </button>
              <button onClick={deleteCompany} className={styles.delete}>
                Delete
              </button>
            </div>
          </div>

          {/* Company Details */}
          <div className={styles.detailsBox}>
            <h3>Company Details</h3>

            <p><strong>Email:</strong> {company.contactEmail}</p>
            <p><strong>Size:</strong> {company.companySize}</p>
            <p><strong>Headquarters:</strong> {company.headquarters}</p>
            <p><strong>ATS Used:</strong> {company.atsUsed}</p>
            <p><strong>Website:</strong> {company.website}</p>
            <p><strong>Careers Page:</strong> {company.careersPage}</p>
            <p><strong>Description:</strong>{company?.description}</p>
          </div>

          {/* Jobs Section */}
          <div className={styles.jobsHeader}>
            <h2>Jobs</h2>
            <button onClick={openNewJobModal} className={styles.newJobBtn}>
              + New Job
            </button>
          </div>

          {/* Jobs List */}
          <div className={styles.jobsList}>
            {jobs.length === 0 ? (
              <p>No jobs found.</p>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p><strong>Location:</strong> {job.location || "N/A"}</p>
                  <p><strong>Type:</strong> {job.jobType || "N/A"}</p>
                  <p><strong>Experience:</strong> {job.experience || "N/A"}</p>

                  <div className={styles.jobActions}>
                    <button
                      className={styles.editJobBtn}
                      onClick={() => handleEditJob(job)}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.deleteJobBtn}
                      onClick={() => handleDeleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => fetchJobs(page - 1)}>
              Prev
            </button>

            <span>{page} / {totalPages}</span>

            <button disabled={page === totalPages} onClick={() => fetchJobs(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}

      {/* Edit Company Modal */}
      {modalOpen && (
        <CompanyFormModal
          close={() => setModalOpen(false)}
          fetchCompanies={fetchCompany}
          editCompany={editCompany}
        />
      )}

      {/* New / Edit Job Modal */}
      {jobModalOpen && (
        <JobFormModal
          close={() => setJobModalOpen(false)}
          fetchJobs={fetchJobs}
          companyId={id}
          editJob={editJob}
        />
      )}
    </div>
  );
}
