import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/AdminLogin.module.css";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, admin, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    }
  };

  // If admin already logged in, redirect automatically
  useEffect(() => {
    if (token && admin) {
      navigate("/admin/dashboard");
    }
  }, [token, admin, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
