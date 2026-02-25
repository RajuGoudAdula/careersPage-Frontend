import React, { useState } from "react";
import styles from "../../styles/AddOrganization.module.css";
import api from "../../api/adminApi";

const initialFormState = {
  name: "",
  shortName: "",
  website: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  country: "India",
  address: "",
  description: "",
  logo: "",
  favicon: "",
  ministry: "",
  department: "",
  organizationType: "",
  officialNotificationPage: "",
  officialCareersPage: "",
  industry: "",
  companySize: "",
  headquarters: "",
  isVerified: false,
  status: "active"
};

const AddOrganization = () => {
  const [category, setCategory] = useState("government");
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };



  const generateSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrg = {
      ...formData,
      slug: generateSlug(formData.name),
      category,
      governmentDetails:
        category === "government"
          ? {
              ministry: formData.ministry,
              department: formData.department,
              organizationType: formData.organizationType || null,
              officialNotificationPage:
                formData.officialNotificationPage || null
            }
          : null,
      itDetails:
        category === "it"
          ? {
              industry: formData.industry,
              companySize: formData.companySize,
              headquarters: formData.headquarters,
              officialCareersPage: formData.officialCareersPage
            }
          : null
    };

    console.log("Saved Organization:", newOrg);

    try{

      const response = await api.addOrganization(newOrg);

      console.log(response);

    }catch(error){

    }

    setFormData(initialFormState);
    setCategory("government");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Add Organization</h1>

      <form onSubmit={handleSubmit} className={styles.formCard}>

        {/* BASIC INFO */}
        <h2 className={styles.sectionTitle}>Basic Information</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">
            Organization Name <span>*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Union Public Service Commission"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <small>Enter official registered name.</small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="shortName">Short Name</label>
          <input
            id="shortName"
            type="text"
            name="shortName"
            placeholder="UPSC / TCS"
            value={formData.shortName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="logo">Logo URL</label>
          <input
            id="logo"
            type="url"
            name="logo"
            placeholder="https://cdn.yoursite.com/logo.png"
            value={formData.logo}
            onChange={handleChange}
          />
          <small>Public hosted logo (Cloudinary / S3).</small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="favicon">Favicon URL</label>
          <input
            id="favicon"
            type="url"
            name="favicon"
            placeholder="https://cdn.yoursite.com/favicon.ico"
            value={formData.favicon}
            onChange={handleChange}
          />
          <small>16x16 or 32x32 icon recommended.</small>
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Short summary about organization"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* CONTACT */}
        <h2 className={styles.sectionTitle}>Contact Information</h2>

        <div className={styles.formGroup}>
          <label htmlFor="website">Official Website</label>
          <input
            id="website"
            type="url"
            name="website"
            placeholder="https://example.gov.in"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Official Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="contact@example.gov.in"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+91-XXXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <h2 className={styles.sectionTitle}>Location</h2>

        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="address">Full Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* CATEGORY */}
        <h2 className={styles.sectionTitle}>Organization Category</h2>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="government">Government</option>
            <option value="it">IT Company</option>
          </select>
        </div>

        {category === "government" && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="ministry">Ministry</label>
              <input
                id="ministry"
                type="text"
                name="ministry"
                placeholder="Ministry of Home Affairs"
                value={formData.ministry}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="department">Department</label>
              <input
                id="department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="organizationType">Organization Type</label>

              <select
                id="organizationType"
                name="organizationType"
                value={formData.organizationType || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    governmentDetails: {
                      ...formData.governmentDetails,
                      organizationType: e.target.value
                    }
                  })
                }
              >
                <option value="">Select Type</option>
                <option value="Central">Central</option>
                <option value="State">State</option>
                <option value="PSU">PSU</option>
                <option value="Autonomous">Autonomous</option>
              </select>
            </div>


            <div className={styles.formGroup}>
              <label htmlFor="officialNotificationPage">
                Official Notification Page
              </label>
              <input
                id="officialNotificationPage"
                type="url"
                name="officialNotificationPage"
                placeholder="https://example.gov.in/recruitment"
                value={formData.officialNotificationPage}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {category === "it" && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="industry">Industry</label>
              <input
                id="industry"
                type="text"
                name="industry"
                placeholder="Software / Fintech / SaaS"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="companySize">Company Size</label>
              <input
                id="companySize"
                type="text"
                name="companySize"
                placeholder="5000+ employees"
                value={formData.companySize}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="officialCareersPage">
                Official Careers Page
              </label>
              <input
                id="officialCareersPage"
                type="url"
                name="officialCareersPage"
                placeholder="https://www.google.com/careers"
                value={formData.officialCareersPage}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="headquaters">
              Headquaters
              </label>
              <input
                id="headquaters"
                type="text"
                name="headquaters"
                placeholder=""
                value={formData.headquarters}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* ADMIN */}
        <h2 className={styles.sectionTitle}>Admin Settings</h2>

        <div className={styles.checkboxGroup}>
          <input
            id="isVerified"
            type="checkbox"
            name="isVerified"
            checked={formData.isVerified}
            onChange={handleChange}
          />
          <label htmlFor="isVerified">Mark as Verified</label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Save Organization
        </button>
      </form>
    </div>
  );
};

export default AddOrganization;
