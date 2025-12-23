import React, { useState, useEffect } from "react";
import styles from "../styles/CompanyFormModal.module.css";
import api from "../api/adminApi";

export default function CompanyFormModal({ close, fetchCompanies, editCompany }) {
  const [form, setForm] = useState({
    companyName: "",
    logo: "",
    favicon: "",
    website: "",
    careersPage: "",
    description: "",
    industry: "",
    headquarters: "",
    companySize: "",
    atsUsed: "",
    contactEmail: ""
  });

  const industries = [
    "Information Technology",
    "E-Commerce",
    "FinTech",
    "EdTech",
    "Healthcare",
    "Consulting",
    "Manufacturing",
    "Telecommunications",
    "Other"
  ];

  const companySizes = [
    "1–10 employees",
    "11–50 employees",
    "51–200 employees",
    "201–500 employees",
    "501–1000 employees",
    "1001–5000 employees",
    "5000+ employees"
  ];

  const atsList = [
    "Greenhouse",
    "Lever",
    "Workday",
    "Taleo",
    "BambooHR",
    "Zoho Recruit",
    "Freshteam",
    "Pinpoint",
    "JazzHR",
    "None / Custom ATS"
  ];

  useEffect(() => {
    if (editCompany) setForm(editCompany);
  }, [editCompany]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editCompany) {
      const id = editCompany?._id;
      await api.updateCompany(id, form);
    } else {
      await api.addCompany(form);
    }

    fetchCompanies();
    close();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {editCompany ? "Update Company" : "New Company Registration"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            placeholder="Company Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="logo"
            value={form.logo}
            placeholder="Logo URL"
            onChange={handleChange}
          />

          <input
            type="text"
            name="favicon"
            value={form.favicon}
            placeholder="Favicon URL"
            onChange={handleChange}
          />

          <input
            type="text"
            name="website"
            value={form.website}
            placeholder="Official Website"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="careersPage"
            value={form.careersPage}
            placeholder="Careers Page URL"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={form.description}
            placeholder="Company Description"
            onChange={handleChange}
            rows="3"
            required
          />

          {/* Industry Dropdown */}
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            required
          >
            <option value="">Select Industry</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          <input
            type="text"
            name="headquarters"
            value={form.headquarters}
            placeholder="Headquarters Location"
            onChange={handleChange}
            required
          />

          {/* Company Size Dropdown */}
          <select
            name="companySize"
            value={form.companySize}
            onChange={handleChange}
            required
          >
            <option value="">Select Company Size</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          {/* ATS Dropdown */}
          <select
            name="atsUsed"
            value={form.atsUsed}
            onChange={handleChange}
            required
          >
            <option value="">Select ATS Used</option>
            {atsList.map((ats) => (
              <option key={ats} value={ats}>{ats}</option>
            ))}
          </select>

          <input
            type="email"
            name="contactEmail"
            value={form.contactEmail}
            placeholder="Contact Email"
            onChange={handleChange}
            required
          />

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={close}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editCompany ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
