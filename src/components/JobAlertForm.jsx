import React, { useState, useEffect } from "react";
import styles from "../styles/JobAlert.module.css"; // Same modal grid styling
import { getAlertId } from "../utils/user";
import api from '../api/userApi';
import Toast from "./Toast";

const SKILLS = [
  "React","Node.js","Express","MongoDB","Java","Python","JavaScript",
  "TypeScript","HTML","CSS","Tailwind","Next.js","Redux","AWS","Docker",
  "SQL","PostgreSQL","DevOps","UI/UX"
];

const LOCATIONS = [
  "Hyderabad", "Bangalore", "Chennai", "Pune", "Mumbai",
  "Delhi / NCR", "Remote", "Other"
];

export default function JobAlertForm({ onSaved, triggerSubmit,setTriggerSubmit }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    keywords: [],
    experience: "Fresher",
    location: "",
    otherLocation: "",
    frequency: "daily",
  });

  const [saving, setSaving] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp,setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("default");
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);



  useEffect(()  => {
    const alertId =  getAlertId();
     api.getUserAlert(alertId).then(res => {
      if (res.data?.alert) {
        const a = res?.data?.alert;
        setForm({
          name: a.name || "",
          email: a.email || "",
          keywords: a.keywords ? a.keywords.split(",").map(s => s.trim()) : [],
          experience: a.experience || "Fresher",
          location: a.location || "",
          otherLocation: "",
          frequency: a.frequency || "daily",
        });
      }
    });
  }, []);

  useEffect(() => {
    if (triggerSubmit){
      handleSubmit();
      setTriggerSubmit(false);
    };
  }, [triggerSubmit]);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;

    setSaving(true);

    const finalLocation =
      form.location === "Other" ? form.otherLocation : form.location;

    try {
      const res = await api.submitJobAlert({
        ...form,
        location: finalLocation,
        keywords: form.keywords.join(", "),
      });
      
      setShowToast(true);
      setToastMessage(res?.data?.message);
      setToastType("success");

      if (res?.data?.alertId) {
        localStorage.setItem("alert_id", res.data.alertId);
      }
      onSaved();

    } catch (err) {
      setShowToast(true);
      setToastMessage(err?.response?.data?.message || "Failed to save alert");
      setToastType("error");
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (skill) => {
    setForm(prev =>
      prev.keywords.includes(skill) ? prev :
        { ...prev, keywords: [...prev.keywords, skill] }
    );
  };

  const removeSkill = (skill) =>
    setForm(prev => ({
      ...prev,
      keywords: prev.keywords.filter(s => s !== skill),
    }));


    const sendOtpToServer = async () => {
      setLoading(true);
      try {
        const res = await api.sendEmailToServer({ email: form.email });
        setOtpSent(true);
        setShowToast(true);
        setToastMessage("OTP sent!");
        setToastType("success");
      } catch (err) {
        setShowToast(true);
        setToastMessage("Error occured!");
        setToastType("error");
      } finally{
        setLoading(false);
      }
    };

    const verifyOtpFromServer = async () => {
      setVerifyLoading(true);
      try {
        console.log({ email: form.email, otp});
        await api.verifyOtp({ email: form.email, otp});
        setVerified(true);
        setShowToast(true);
        setToastMessage("OTP Verified Successfully!");
        setToastType("success");
        setVerified(true);
      } catch (err) {
        setShowToast(true);
        setToastMessage("Incorrect OTP");
        setToastType("error");
      } finally{
        setVerifyLoading(false);
      }
    };
    

  return (
    <>
    <form className={styles.form}>


      {/* Name */}
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      {/* Email */}
      <div className={styles.inputWithButton}>
        <input
          name="email"
          type="email"
          placeholder="Email (for notifications)"
          value={form.email}
          required
          onChange={handleChange}
        />

      {!otpSent && (
        <button
          type="button"
          className={styles.otpBtn}
          onClick={sendOtpToServer}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.loader}></span>
          ) : (
            "Send OTP"
          )}
        </button>
      )}

      </div>

      {otpSent && !verified && (
        <div className={styles.inputWithButton}>
          <input
            name="otp"
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="button"
            className={styles.verifyBtn}
            onClick={verifyOtpFromServer}
            disabled={verifyLoading}
          >
            {verifyLoading ? <span className={styles.loader}></span> : "Verify"}
          </button>

        </div>
      )}



      {/* Skills */}
      <div className={styles.fullRow}>
        <p>Skills / Keywords</p>

        <div className={styles.tagsContainer}>
          {form.keywords.map((skill) => (
            <span key={skill} className={styles.tag}>
              {skill}
              <button type="button" className={styles.tagRemove} onClick={() => removeSkill(skill)}>✕</button>
            </span>
          ))}
        </div>

        <div className={styles.skillOptions}>
          {SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              className={`${styles.skillBtn} ${form.keywords.includes(skill) ? styles.selected : ""}`}
              onClick={() => addSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <select name="experience" value={form.experience} onChange={handleChange}>
        <option>Fresher</option>
        <option>0-1 years</option>
        <option>1-2 years</option>
        <option>2-5 years</option>
      </select>

      {/* Location */}
      <select name="location" value={form.location} onChange={handleChange}>
        <option value="">Select Location</option>
        {LOCATIONS.map(loc => <option key={loc}>{loc}</option>)}
      </select>

      {form.location === "Other" && (
        <input
          name="otherLocation"
          placeholder="Enter Location"
          value={form.otherLocation}
          onChange={handleChange}
        />
      )}

      {/* Frequency */}
      <select name="frequency" value={form.frequency} onChange={handleChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
    </form>
    {showToast && 
    <Toast
        message={toastMessage}
        type={toastType}
        duration={3000}
        onClose={() => setShowToast(false)}
      />
    }
    </>
  );
}
