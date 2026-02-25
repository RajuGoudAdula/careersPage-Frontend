import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/OrganizationPage.module.css";
import api from "../../api/adminApi";
import OrganizationFormModal from "../../components/OrganizationFormModal";
import JobFormModal from "../../components/JobFormModal";

export default function OrganizationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editOrganization, setEditOrganization] = useState(null);

  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  /* ================= FETCH ORGANIZATION ================= */

  const fetchOrganization = async () => {
    const res = await api.getOrganizationDetails(id);
    if (res?.data?.success) {
      setOrganization(res.data.data);
    }
  };

  /* ================= FETCH JOBS ================= */

  const fetchJobs = async (pg = 1) => {
    const res = await api.fetchOrganizationJobs(id, pg);

    if (res?.data?.success) {
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    }
  };

  useEffect(() => {
    fetchOrganization();
    fetchJobs(page);
  }, []);

  /* ================= DELETE ORGANIZATION ================= */

  const deleteOrganization = async () => {
    if (!window.confirm("Are you sure you want to delete this organization?"))
      return;

    await api.deleteOrganization(id);
    navigate("/admin/organizations");
  };

  /* ================= JOB ACTIONS ================= */

  const openNewJobModal = () => {
    setEditJob(null);
    setJobModalOpen(true);
  };

  const openEditOrganizationModal = () => {
    setEditOrganization(organization);
    setModalOpen(true);
  };

  const handleEditJob = (job) => {
    setEditJob(job);
    setJobModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    const res = await api.deleteJob(id, jobId);
    if (res?.data?.success) {
      fetchJobs(page);
    }
  };

  return (
    <div className={styles.container}>
      {!organization ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* ================= HEADER ================= */}
          <div className={styles.header}>
            <div className={styles.left}>
              <img
                src={
                  organization.logo ||
                  "https://via.placeholder.com/80x80?text=ORG"
                }
                alt={organization.name}
                className={styles.logo}
              />

              <div>
                <h1>{organization.name}</h1>
                <p>{organization.category?.toUpperCase()}</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                onClick={openEditOrganizationModal}
                className={styles.update}
              >
                Update
              </button>
              <button
                onClick={deleteOrganization}
                className={styles.delete}
              >
                Delete
              </button>
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className={styles.detailsBox}>
            <h3>Organization Details</h3>

            <p><strong>Email:</strong> {organization.email}</p>
            <p><strong>Phone:</strong> {organization.phone}</p>
            <p><strong>Website:</strong> {organization.website}</p>
            <p><strong>Location:</strong> {organization.city}, {organization.state}</p>
            <p><strong>Status:</strong> {organization.status}</p>
            <p><strong>Verified:</strong> {organization.isVerified ? "Yes" : "No"}</p>
            <p><strong>Description:</strong> {organization.description}</p>

            {/* GOVERNMENT DETAILS */}
            {organization.category === "government" && (
              <>
                <p><strong>Ministry:</strong> {organization.governmentDetails?.ministry}</p>
                <p><strong>Department:</strong> {organization.governmentDetails?.department}</p>
                <p><strong>Type:</strong> {organization.governmentDetails?.organizationType}</p>
                <p><strong>Notification Page:</strong> {organization.governmentDetails?.officialNotificationPage}</p>
              </>
            )}

            {/* IT DETAILS */}
            {organization.category === "it" && (
              <>
                <p><strong>Industry:</strong> {organization.itDetails?.industry}</p>
                <p><strong>Company Size:</strong> {organization.itDetails?.companySize}</p>
                <p><strong>Headquarters:</strong> {organization.itDetails?.headquarters}</p>
                <p><strong>Founded:</strong> {organization.itDetails?.foundedYear}</p>
              </>
            )}
          </div>

          {/* ================= JOBS SECTION ================= */}
          <div className={styles.jobsHeader}>
            <h2>Jobs</h2>
            <button
              onClick={openNewJobModal}
              className={styles.newJobBtn}
            >
              New Job
            </button>
          </div>

          <div className={styles.jobsList}>
            {jobs.length === 0 ? (
              <p>No jobs found.</p>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p><strong>Location:</strong> {job.location?.state || "N/A"}</p>
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

          {/* ================= PAGINATION ================= */}
          <div className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() => fetchJobs(page - 1)}
            >
              Prev
            </button>

            <span>{page} / {totalPages}</span>

            <button
              disabled={page === totalPages}
              onClick={() => fetchJobs(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ================= MODALS ================= */}

      {modalOpen && (
        <OrganizationFormModal
          close={() => setModalOpen(false)}
          fetchOrganization={fetchOrganization}
          editOrganization={editOrganization}
        />
      )}

      {jobModalOpen && (
        <JobFormModal
          close={() => setJobModalOpen(false)}
          fetchJobs={fetchJobs}
          organizationId={id}
          editJob={editJob}
        />
      )}
    </div>
  );
}
