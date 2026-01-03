import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "../styles/JobAlert.module.css";
import api from "../api/userApi";
import { getAlertId } from "../utils/user";
import { useToast } from "../context/ToastContext";

/* ---------------- CONSTANTS ---------------- */

const SKILLS = [
  "React","Node.js","Express","MongoDB","Java","Python",
  "JavaScript","TypeScript","HTML","CSS","Next.js",
  "Redux","AWS","Docker","SQL",
];

const LOCATIONS = [
  "Hyderabad","Bangalore","Chennai","Pune",
  "Mumbai","Delhi / NCR","Remote","Other",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  keywords: [],
  experience: "Fresher",
  location: "",
  otherLocation: "",
  frequency: "daily",
};

/* ---------------- HELPERS ---------------- */

const normalizeKeywords = (keywords = []) =>
  [...new Set(
    keywords.flatMap(k =>
      k.split(",").map(s => s.trim()).filter(Boolean)
    )
  )];

/* ---------------- COMPONENT ---------------- */

const JobAlertForm = forwardRef(function JobAlertForm(
  { onSaved },
  ref
) {
  const { showToast } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [initialForm, setInitialForm] = useState(EMPTY_FORM);
  const [sendingOtp,setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);


  const [isUpdate, setIsUpdate] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* Email + OTP */
  const [verified, setVerified] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [alertId, setAlertId] = useState(getAlertId());

  /* ---------------- DIRTY CHECK ---------------- */

  const checkDirty = useCallback(
    (nextForm) => {
      setIsDirty(JSON.stringify(nextForm) !== JSON.stringify(initialForm));
    },
    [initialForm]
  );

  const updateForm = (next) => {
    setForm(next);
    checkDirty(next);
  };

  /* ---------------- LOAD EXISTING ALERT ---------------- */

  useEffect(() => {
    const id = getAlertId();
    if (!id) return;

    setIsUpdate(true);

    api.getUserAlert(id).then((res) => {
      const a = res?.data?.alert;
      if (!a) return;

      const loaded = {
        name: a.name || "",
        email: a.email || "",
        keywords: normalizeKeywords(a.keywords),
        experience: a.experience || "Fresher",
        location: a.location || "",
        otherLocation: "",
        frequency: a.frequency || "daily",
      };

      setForm(loaded);
      setInitialForm(loaded);
      setVerified(true);
      setEmailEditable(true);
      setIsDirty(false);
    });
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };

    if (name === "email") {
      setVerified(false);
      setOtp("");
      setOtpSent(false);
      setVerificationToken("");
    }

    updateForm(next);
  };

  const addSkill = (skill) => {
    if (form.keywords.includes(skill)) return;
    updateForm({ ...form, keywords: [...form.keywords, skill] });
  };

  const removeSkill = (skill) => {
    updateForm({
      ...form,
      keywords: form.keywords.filter(k => k !== skill),
    });
  };

  /* ---------------- OTP FLOW ---------------- */

  const sendOtp = async () => {
    if (!form.email) {
      showToast("Please enter email", "error");
      return;
    }

    if(sendingOtp) return;

    try {
      setSendingOtp(true);
      await api.sendEmailToServer({ email: form.email });
      setOtpSent(true);
      setEmailEditable(true);
      showToast("OTP sent. It will expire in 5 minutes.", "success");
    } catch {
      showToast("Failed to send OTP", "error");
    }finally{
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      showToast("Enter OTP", "error");
      return;
    }

    if(verifyingOtp) return;

    try {
      setVerifyingOtp(true);
      const res = await api.verifyOtp({ email: form.email, otp });
      setVerificationToken(res.data.verificationToken);
      setVerified(true);
      setOtpSent(false);
      showToast("Email verified", "success");
    } catch {
      showToast("Invalid OTP", "error");
    }finally{
      setVerifyingOtp(false);
    }
  };

  const changeEmail = () => {
    setEmailEditable(false);
    setVerified(false);
    setOtp("");
    setOtpSent(false);
    setVerificationToken("");
    showToast("Verify new email", "default");
  };

  /* ---------------- SUBMIT ---------------- */

  const submitForm = async () => {
    if (!verified) {
      showToast("Verify email first", "error");
      return;
    }

    if (isUpdate && !isDirty) {
      showToast("No changes to update", "default");
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      keywords: normalizeKeywords(form.keywords),
      verificationToken,
      location:
        form.location === "Other" ? form.otherLocation : form.location,
    };

    try {
      const res = isUpdate
        ? await api.updateAlert(getAlertId(), payload)
        : await api.submitJobAlert(payload);

      if (res?.data?.alertId) {
        localStorage.setItem("alert_id", res.data.alertId);
        setAlertId(res.data.alertId);
      }

      setInitialForm(form);
      setIsDirty(false);
      onSaved?.();
      showToast(
        isUpdate ? "Alert Updated Successfully" : "Alert Saved Successfully",
        "success"
      );
    } catch {
      showToast("Failed to save alert", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!alertId || deleting) return;

    if (!window.confirm("Are you sure you want to delete this alert?")) return;

    setDeleting(true);
    try {
      await api.deleteAlert(alertId);

      setForm(EMPTY_FORM);
      setInitialForm(EMPTY_FORM);
      setIsUpdate(false);
      setIsDirty(false);
      setVerified(false);
      setEmailEditable(false);
      setOtp("");
      setOtpSent(false);
      setVerificationToken("");
      localStorage.removeItem("alert_id");
      setAlertId(null);

      showToast("Deleted successfully", "success");
    } catch {
      showToast("Failed to delete alert", "error");
    } finally {
      setDeleting(false);
    }
  };

  /* ---------------- EXPOSE CHILD API ---------------- */

  useImperativeHandle(ref, () => ({
    submit: submitForm,
    isUpdate,
    isDirty,
    saving,
  }));

  /* ---------------- UI ---------------- */

  return (
    <>
      <form className={styles.form}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
        />

        <div className={styles.inputWithButton}>
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly={emailEditable}
            onChange={handleChange}
            placeholder="Email"
          />
          {!verified ? (
            !otpSent && <button type="button" onClick={sendOtp}>
              {sendingOtp ? (
                  <span className={styles.spinner} />
                ) : (
                  "Send OTP"
                )}
            </button>
          ) : (
            <button type="button" onClick={changeEmail}>Change Email</button>
          )}
        </div>

        {otpSent && !verified && (
          <div className={styles.inputWithButton}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength="6"
            />
            <button type="button" onClick={verifyOtp} disabled={verifyingOtp}>
              {verifyingOtp  ? (
                  <span className={styles.spinner} />
                ) : (
                  "Verify"
                )}
            </button>
          </div>
        )}

        <div className={styles.fullRow}>
          <p>Skills</p>
          <div className={styles.tagsContainer}>
            {form.keywords.map(s => (
              <span key={s} className={styles.tag}>
                {s}
                <button type="button" onClick={() => removeSkill(s)}>×</button>
              </span>
            ))}
          </div>

          <div className={styles.skillOptions}>
            {SKILLS.map(s => (
              <button
                key={s}
                type="button"
                disabled={form.keywords.includes(s)}
                onClick={() => addSkill(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <select name="experience" value={form.experience} onChange={handleChange}>
          <option>Fresher</option>
          <option>0-1 years</option>
          <option>1-2 years</option>
          <option>2-5 years</option>
        </select>

        <select name="location" value={form.location} onChange={handleChange}>
          <option value="">Select Location</option>
          {LOCATIONS.map(l => <option key={l}>{l}</option>)}
        </select>

        {form.location === "Other" && (
          <input
            name="otherLocation"
            value={form.otherLocation}
            onChange={handleChange}
            placeholder="Enter location"
          />
        )}

        <select name="frequency" value={form.frequency} onChange={handleChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </form>

      <button
        type="button"
        onClick={handleDelete}
        disabled={!alertId}
        className={styles.deleteBtn}
      >
        Delete
      </button>
    </>
  );
});

export default JobAlertForm;
