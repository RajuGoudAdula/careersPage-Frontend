import React, { useState, useEffect } from "react";
import styles from "../styles/CompanyFormModal.module.css"; // 👈 same CSS as company modal
import api from "../api/adminApi";

export default function JobFormModal({ close, companyId, fetchJobs, editJob }) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    experience: "",
    salary: "",
    jobType: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    if (editJob) {
      setForm({
        title: editJob.title || "",
        location: editJob.location || "",
        experience: editJob.experience || "",
        salary: editJob.salary || "",
        jobType: editJob.jobType || "",
        description: editJob.description || "",
        link: editJob.link || "",
      });
    }
  }, [editJob]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editJob) {
      await api.editJobOfCompany(companyId, editJob._id, form);
    } else {
      await api.postJobOfCompany(companyId, form);
    }

    fetchJobs();
    close();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {editJob ? "Update Job" : "Create New Job"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Job Title"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            value={form.location}
            placeholder="Job Location"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="experience"
            value={form.experience}
            placeholder="Experience (e.g., 0–2 yrs)"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="salary"
            value={form.salary}
            placeholder="Salary Range"
            onChange={handleChange}
            required
          />

          {/* Job Type Dropdown */}
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <textarea
            name="description"
            value={form.description}
            placeholder="Job Description"
            rows="3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="link"
            value={form.link}
            placeholder="Apply Link / Job URL"
            onChange={handleChange}
            required
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={close}
            >
              Cancel
            </button>

            <button type="submit" className={styles.submitBtn}>
              {editJob ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
