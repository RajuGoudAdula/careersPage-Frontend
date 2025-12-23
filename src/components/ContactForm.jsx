import React, { useState } from "react";
import styles from "../styles/ContactForm.module.css";
import api from '../api/userApi';
import Toast from "./Toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [toastMessage,setToastMessage] = useState("");
  const [toastType,setToastType] = useState(false);
  const [showToast,setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await api.submitContactForm(form);
      setShowToast(true);
      setToastType(res?.data?.success ? "success" : "error");
      setToastMessage(res?.data?.message);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    }catch(error){
      setShowToast(true);
      setToastType("error");
      setToastMessage(error?.message || "An error occured.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <h2>Contact Us</h2>
      <p>We’re here to help you with careers, companies & opportunities.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={styles.contactInput}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className={styles.contactInput}
            required
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className={styles.contactInput}
          required
        />

        <textarea
          name="message"
          placeholder="Write your message..."
          rows="5"
          value={form.message}
          onChange={handleChange}
          className={styles.contactTextArea}
          required
        ></textarea>

        <button 
          type="submit" 
          className={`${styles.contactButton} ${loading ? styles.loading : ""}`}
          disabled={loading}
        >
          {loading ? <span className={styles.loader}></span> : "Send Message"}
        </button>

      </form>
      {showToast && 
        <Toast
                message={toastMessage}
                type={toastType}
                duration={3000}
                onClose={() => setShowToast(false)}
              />
      }
    </div>
  );
}
