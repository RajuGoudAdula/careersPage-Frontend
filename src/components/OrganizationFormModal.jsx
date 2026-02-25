import React, { useState, useEffect } from "react";
import styles from "../styles/OrganizationFormModal.module.css";
import api from "../api/adminApi";

export default function OrganizationFormModal({
  close,
  fetchOrganization,
  editOrganization
}) {
  const initialState = {
    name: "",
    shortName: "",
    category: "government",
    logo: "",
    favicon: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "India",
    address: "",
    governmentDetails: {
      ministry: "",
      department: "",
      organizationType: "",
      officialNotificationPage: ""
    },
    itDetails: {
      industry: "",
      companySize: "",
      headquarters: "",
      officialCareersPage: ""
    },
    isVerified: false,
    status: "active"
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editOrganization) {
      setForm(editOrganization);
    }
  }, [editOrganization]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleNestedChange = (section, field, value) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [field]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editOrganization) {
      await api.updateOrganization(editOrganization._id, form);
    } else {
      await api.addOrganization(form);
    }

    fetchOrganization();
    close();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>{editOrganization ? "Update Organization" : "Add Organization"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* ================= BASIC INFO ================= */}
          <h3>Basic Information</h3>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Organization Name"
            required
          />

          <input
            name="shortName"
            value={form.shortName}
            onChange={handleChange}
            placeholder="Short Name"
          />

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="government">Government</option>
            <option value="it">IT Organization</option>
          </select>

          <input
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="Logo URL"
          />

          <input
            name="favicon"
            value={form.favicon}
            onChange={handleChange}
            placeholder="Favicon URL"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          {/* ================= CONTACT ================= */}
          <h3>Contact Information</h3>

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          {/* ================= LOCATION ================= */}
          <h3>Location</h3>

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
          />

          {/* ================= GOVERNMENT ================= */}
          {form.category === "government" && (
            <>
              <h3>Government Details</h3>

              <input
                value={form?.governmentDetails?.ministry}
                onChange={(e) =>
                  handleNestedChange("governmentDetails", "ministry", e.target.value)
                }
                placeholder="Ministry"
              />

              <input
                value={form?.governmentDetails?.department}
                onChange={(e) =>
                  handleNestedChange("governmentDetails", "department", e.target.value)
                }
                placeholder="Department"
              />

              <select
                value={form?.governmentDetails?.organizationType}
                onChange={(e) =>
                  handleNestedChange(
                    "governmentDetails",
                    "organizationType",
                    e.target.value
                  )
                }
              >
                <option value="">Select Type</option>
                <option value="Central">Central</option>
                <option value="State">State</option>
                <option value="PSU">PSU</option>
                <option value="Autonomous">Autonomous</option>
              </select>

              <input
                value={form?.governmentDetails?.officialNotificationPage}
                onChange={(e) =>
                  handleNestedChange(
                    "governmentDetails",
                    "officialNotificationPage",
                    e.target.value
                  )
                }
                placeholder="Official Notification Page"
              />
            </>
          )}

          {/* ================= IT DETAILS ================= */}
          {form.category === "it" && (
            <>
              <h3>IT Organization Details</h3>

              <input
                value={form?.itDetails?.industry}
                onChange={(e) =>
                  handleNestedChange("itDetails", "industry", e.target.value)
                }
                placeholder="Industry"
              />

              <input
                value={form?.itDetails?.companySize}
                onChange={(e) =>
                  handleNestedChange("itDetails", "companySize", e.target.value)
                }
                placeholder="Company Size"
              />

              <input
                value={form?.itDetails?.headquarters}
                onChange={(e) =>
                  handleNestedChange("itDetails", "headquarters", e.target.value)
                }
                placeholder="Headquarters"
              />

              <input
                value={form?.itDetails?.officialCareersPage}
                onChange={(e) =>
                  handleNestedChange(
                    "itDetails",
                    "officialCareersPage",
                    e.target.value
                  )
                }
                placeholder="Official Careers Page"
              />
            </>
          )}

          {/* ================= ADMIN ================= */}
          <h3>Admin Settings</h3>

          <label>
            <input
              type="checkbox"
              name="isVerified"
              checked={form.isVerified}
              onChange={handleChange}
            />
            Verified
          </label>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className={styles.actions}>
            <button type="button" onClick={close}>
              Cancel
            </button>
            <button type="submit">
              {editOrganization ? "Update" : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
