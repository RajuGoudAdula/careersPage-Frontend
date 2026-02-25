import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import styles from "../../styles/AddJob.module.css";

const AddJob = () => {
  const [organizations, setOrganizations] = useState([]);
  const [id,setId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const initialFormState = {
    title: "",
    organization: "",
    employmentType: "full-time",
    experienceText: "",
    qualificationText: "",
    salaryText: "",
    shortDescription: "",
    applicationEndDate: "",
    applicationLink: "",
    notificationPDF: "",
    source: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    status: "active",
    isFeatured: false,
    location: {
      state: "",
      city: ""
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  /* ================= FETCH ORGANIZATIONS ================= */
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await adminApi.getOrganizations();
        setOrganizations(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrganizations();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "organization") {
      const org = organizations.find((o) => o._id === value);
      setSelectedCategory(org?.category || "");
      setId(value);
    }

    if (name === "state" || name === "city") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
      });
    }
  };

  /* ================= SLUG ================= */
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      ...formData,
      slug: generateSlug(formData.title),
      tags:
        selectedCategory === "it"
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
    };
  
    try {
      const res = await adminApi.postJobOfOrganization(id, payload);
  
      if (res?.data?.success) {
        alert("Job Added Successfully!");
  
        setFormData(initialFormState);
        setSelectedCategory("");
        setId("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Job</h2>

      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Organization */}
        <div className={styles.field}>
          <label>Organization *</label>
          <select
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          >
            <option value="">Select Organization</option>
            {organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name} ({org.category})
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className={styles.field}>
          <label>Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* LOCATION */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.location.state}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.location.city}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* IT Fields */}
        {selectedCategory === "it" && (
          <>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Employment Type *</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  required
                >
                  <option value="full-time">Full-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Experience *</label>
                <input
                  type="text"
                  name="experienceText"
                  value={formData.experienceText}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Government Fields */}
        {selectedCategory === "government" && (
          <>
            <div className={styles.field}>
              <label>Qualification *</label>
              <input
                type="text"
                name="qualificationText"
                value={formData.qualificationText}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Application End Date *</label>
                <input
                  type="date"
                  name="applicationEndDate"
                  value={formData.applicationEndDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Notification PDF *</label>
                <input
                  type="url"
                  name="notificationPDF"
                  value={formData.notificationPDF}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Common Fields */}
        <div className={styles.field}>
          <label>Salary</label>
          <input
            type="text"
            name="salaryText"
            value={formData.salaryText}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Short Description *</label>
          <textarea
            name="shortDescription"
            rows="4"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Application Link *</label>
          <input
            type="url"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            required
          />
        </div>

        {/* SEO */}
        <div className={styles.field}>
          <label>Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Meta Description</label>
          <textarea
            name="metaDescription"
            rows="3"
            value={formData.metaDescription}
            onChange={handleChange}
          />
        </div>

        {/* Status + Featured */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <span>Mark as Featured</span>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;