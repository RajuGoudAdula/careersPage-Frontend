import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Organizations.module.css";
import api from "../../api/adminApi";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all organizations
  const fetchOrganizations = async () => {
    try {
      const res = await api.getOrganizations();

      if (res?.data?.success) {
        setOrganizations(res.data.data);
      } else {
        console.log(res?.data?.message);
      }
    } catch (err) {
      console.error("Fetch Organizations Error:", err);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Registered Organizations</h2>
      </div>

      <div className={styles.cards}>
        {organizations.length === 0 ? (
          <p className={styles.noData}>No organizations found.</p>
        ) : (
          organizations.map((org) => (
            <div
              key={org._id}
              className={styles.card}
              onClick={() => navigate(`/admin/organization/${org._id}`)}
            >
              <div className={styles.cardHeader}>
                <img
                  src={
                    org.logo ||
                    "https://via.placeholder.com/60x60?text=ORG"
                  }
                  alt={org.name}
                  className={styles.logo}
                />
                <div>
                  <h3 className={styles.name}>{org.name}</h3>
                  <p className={styles.category}>
                    {org.category?.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className={styles.cardBody}>
                <p>
                  <strong>Website:</strong>{" "}
                  {org.website || "Not Available"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {org.email || "Not Available"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {org.city}, {org.state}
                </p>

                {org.category === "government" && (
                  <>
                    <p>
                      <strong>Ministry:</strong>{" "}
                      {org.governmentDetails?.ministry || "—"}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {org.governmentDetails?.organizationType || "—"}
                    </p>
                  </>
                )}

                {org.category === "it" && (
                  <>
                    <p>
                      <strong>Industry:</strong>{" "}
                      {org.itDetails?.industry || "—"}
                    </p>
                    <p>
                      <strong>Size:</strong>{" "}
                      {org.itDetails?.companySize || "—"}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
