import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { logoutAdmin } from "../store/authSlice";

export default function NavBar({onNotifyClick}) {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const adminToken =
    useSelector((state) => state.auth.token) ||
    localStorage.getItem("adminToken");

  const isAdmin = Boolean(adminToken);

  return (
    <nav className={styles.navbar}>
      <Link to={isAdmin ? "/admin/dashboard" : "/"} >
         <div className={styles.logo}>Careers<span>Page</span></div>
      </Link>
      {/* Hamburger */}
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : styles.inActive}`} onClick={() => setMenuOpen(!menuOpen)}>
        
        {!isAdmin && (
          <>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <button className={styles.notifyBtn} onClick={onNotifyClick}>Notify Jobs</button>
            </li>
          </>
        )}

        {isAdmin && (
          <>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/companies">Companies</Link></li>
            <li><Link to="/admin/jobs">Jobs</Link></li>
            <li>
              <button
                className={styles.logoutBtn}
                onClick={() => dispatch(logoutAdmin())}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}
