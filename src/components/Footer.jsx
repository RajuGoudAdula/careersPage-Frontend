import React from "react";
import styles from "../styles/Footer.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer({onNotifyClick}) {

    const adminToken =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("adminToken");

  const isAdmin = Boolean(adminToken);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        <div className={styles.section}>
        <Link to={isAdmin ? "/admin/dashboard" : "/"} >
            <div className={styles.logo}>Careers<span>Page</span></div>
        </Link>
          <p>Apply once, reach real company career pages and get notified instantly.</p>
        </div>

        <div className={styles.section}>
          <h5>Discover</h5>
          <ul>
            <li>Browse Companies</li>
            <li onClick={onNotifyClick}>Create Job Alerts</li>
            <li>Blogs</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h5>Support</h5>
          <ul>
            <li>Help Center</li>
            <li>FAQ</li>
            <li>
                <Link to="/contact">
                  Contact Support
                </Link>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h5>Legal</h5>
          <ul>
            <li>
              <Link to="privacy-policy">
                 Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="terms-and-conditions">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} CareersPage • Empowering Opportunities.
      </div>
    </footer>
  );
}
