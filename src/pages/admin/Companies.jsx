import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Companies.module.css";
import CompanyFormModal from "../../components/CompanyFormModal";
import api from "../../api/adminApi";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const navigate = useNavigate();


  // Fetch all companies
  const fetchCompanies = async () => {
    const res = await api.getCompanies();
    console.log(res);
    if(res?.data?.success){
      setCompanies(res?.data?.data);
    }else{
      console.log(res?.data?.message);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Open modal for new company
  const openNewModal = () => {
    setEditCompany(null);
    setModalOpen(true);
  };



  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Registered Companies</h2>
        <button className={styles.newBtn} onClick={openNewModal}>
          + New Company
        </button>
      </div>

      <div className={styles.cards}>
      {companies.length === 0 ? (
        <p className={styles.noData}>No companies found.</p>
      ) : (
        companies.map((c) => (
          <div 
            key={c._id} 
            className={styles.card}
            onClick={() => navigate(`/admin/company/${c._id}`)}
          >
            <div className={styles.cardHeader}>
              {/* Logo or careersPage Image */}
              <img 
                src={c.logo || c.careersPage} 
                alt={c.companyName} 
                className={styles.logo}
              />
              <h3 className={styles.name}>{c.companyName}</h3>
            </div>

            <div className={styles.cardBody}>
              <p><strong>Industry:</strong> {c.industry}</p>
              <p><strong>Email:</strong> {c.contactEmail}</p>
              <p><strong>Size:</strong> {c.companySize}</p>
              <p><strong>HQ:</strong> {c.headquarters}</p>
              <p><strong>ATS Used:</strong> {c.atsUsed}</p>
            </div>
          </div>
        ))
      )}
    </div>


      {modalOpen && (
        <CompanyFormModal
          close={() => setModalOpen(false)}
          fetchCompanies={fetchCompanies}
          editCompany={editCompany}
        />
      )}
    </div>
  );
}
