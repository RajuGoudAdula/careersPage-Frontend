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
import { requestBrowserPermission } from "../utils/browserNotification";

/* ---------------- CONSTANTS ---------------- */

// ================= ROLES =================
const ROLES = [
  { label: "Software Engineer", value: "software-engineer", type: "role" },
  { label: "Backend Developer", value: "backend-developer", type: "role" },
  { label: "Frontend Developer", value: "frontend-developer", type: "role" },
  { label: "Full Stack Developer", value: "full-stack-developer", type: "role" },

  { label: "Mobile App Developer", value: "mobile-app-developer", type: "role" },
  { label: "Android Developer", value: "android-developer", type: "role" },
  { label: "iOS Developer", value: "ios-developer", type: "role" },

  { label: "DevOps Engineer", value: "devops-engineer", type: "role" },
  { label: "Site Reliability Engineer", value: "sre", type: "role" },
  { label: "Cloud Engineer", value: "cloud-engineer", type: "role" },

  { label: "Data Engineer", value: "data-engineer", type: "role" },
  { label: "Data Scientist", value: "data-scientist", type: "role" },
  { label: "Machine Learning Engineer", value: "ml-engineer", type: "role" },

  { label: "AI Engineer", value: "ai-engineer", type: "role" },
  { label: "QA Engineer", value: "qa-engineer", type: "role" },
  { label: "Automation Engineer", value: "automation-engineer", type: "role" },

  { label: "Security Engineer", value: "security-engineer", type: "role" },
  { label: "Blockchain Developer", value: "blockchain-developer", type: "role" },
];

// ================= TECHNOLOGIES =================
const TECHNOLOGIES = [
  // Languages
  { label: "JavaScript", value: "javascript", type: "tech" },
  { label: "TypeScript", value: "typescript", type: "tech" },
  { label: "Python", value: "python", type: "tech" },
  { label: "Java", value: "java", type: "tech" },
  { label: "C++", value: "cpp", type: "tech" },
  { label: "C#", value: "csharp", type: "tech" },
  { label: "Go", value: "golang", type: "tech" },
  { label: "Rust", value: "rust", type: "tech" },

  // Frontend
  { label: "React", value: "react", type: "tech" },
  { label: "Next.js", value: "nextjs", type: "tech" },
  { label: "Angular", value: "angular", type: "tech" },
  { label: "Vue.js", value: "vuejs", type: "tech" },
  { label: "HTML", value: "html", type: "tech" },
  { label: "CSS", value: "css", type: "tech" },
  { label: "Tailwind CSS", value: "tailwind", type: "tech" },

  // Backend
  { label: "Node.js", value: "nodejs", type: "tech" },
  { label: "Express.js", value: "expressjs", type: "tech" },
  { label: "NestJS", value: "nestjs", type: "tech" },
  { label: "Spring Boot", value: "spring-boot", type: "tech" },
  { label: "Django", value: "django", type: "tech" },
  { label: "Flask", value: "flask", type: "tech" },

  // Databases
  { label: "MongoDB", value: "mongodb", type: "tech" },
  { label: "PostgreSQL", value: "postgresql", type: "tech" },
  { label: "MySQL", value: "mysql", type: "tech" },
  { label: "Redis", value: "redis", type: "tech" },

  // Cloud & DevOps
  { label: "AWS", value: "aws", type: "tech" },
  { label: "Azure", value: "azure", type: "tech" },
  { label: "Google Cloud", value: "gcp", type: "tech" },
  { label: "Docker", value: "docker", type: "tech" },
  { label: "Kubernetes", value: "kubernetes", type: "tech" },
  { label: "Terraform", value: "terraform", type: "tech" },

  // Data & AI
  { label: "TensorFlow", value: "tensorflow", type: "tech" },
  { label: "PyTorch", value: "pytorch", type: "tech" },
  { label: "Pandas", value: "pandas", type: "tech" },
  { label: "NumPy", value: "numpy", type: "tech" },

  // Testing & Tools
  { label: "Jest", value: "jest", type: "tech" },
  { label: "Cypress", value: "cypress", type: "tech" },
  { label: "Git", value: "git", type: "tech" },
];

// ================= AREAS =================
const AREAS = [
  { label: "Backend", value: "backend", type: "area" },
  { label: "Frontend", value: "frontend", type: "area" },
  { label: "Full Stack", value: "full-stack", type: "area" },

  { label: "Web Development", value: "web-development", type: "area" },
  { label: "Mobile Development", value: "mobile-development", type: "area" },

  { label: "Cloud Computing", value: "cloud", type: "area" },
  { label: "DevOps", value: "devops", type: "area" },

  { label: "Data Engineering", value: "data-engineering", type: "area" },
  { label: "Machine Learning", value: "machine-learning", type: "area" },
  { label: "Artificial Intelligence", value: "artificial-intelligence", type: "area" },

  { label: "Cyber Security", value: "cyber-security", type: "area" },
  { label: "Blockchain", value: "blockchain", type: "area" },

  { label: "Testing & QA", value: "testing-qa", type: "area" },
  { label: "System Design", value: "system-design", type: "area" },
];

const OPTIONS = [
  ...ROLES,
  ...TECHNOLOGIES,
  ...AREAS,
];


const LIMITS = {
  role: 1,
  area: 2,
  tech: 6,
};


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

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);



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
        keywords: a.keywords,
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

  const countByType = (type) =>
    form.keywords.filter(k => k.type === type).length;
  

  const addSkill = (item) => {
    const alreadySelected = form.keywords.some(
      k => k.value === item.value
    );
  
    if (alreadySelected) {
      showToast(`"${item.label}" is already selected`, "error");
      return;
    }

    const currentCount = countByType(item.type);
  
    if (currentCount >= LIMITS[item.type]) {
      showToast(
        `You can select only ${LIMITS[item.type]} ${item.type}`,
        "error"
      );
      return;
    }
  
    setIsDirty(true);

    setForm(prev => ({
      ...prev,
      keywords: [...prev.keywords, item]
    }));
  
    setSearch("");
  };
  
  
  const removeSkill = (value) => {
    setForm(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k.value !== value)
    }));

    setIsDirty(true);
  };


  const filteredOptions = OPTIONS
  .filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )
  .reduce((acc, curr) => {
    const group = acc.find(g => g.type === curr.type);
    if (group) {
      group.items.push(curr);
    } else {
      acc.push({
        type: curr.type,
        label:
          curr.type === "role"
            ? "Roles"
            : curr.type === "tech"
            ? "Technologies"
            : "Areas",
        items: [curr],
      });
    }
    return acc;
  }, []);

  

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
      keywords: form.keywords,
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

      if(!isUpdate){
        await requestBrowserPermission(res?.data?.alertId,showToast);
      }

    } catch(error) {
      console.log(error);
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

        {/* Input + selected chips */}
        <div className={styles.multiInput}>
          {form.keywords.map((item,index) => (
            <span key={index} className={`${styles.tag} ${styles[item.type]}`}>
              {item.label}
              <button
                type="button"
                onClick={() => removeSkill(item.value)}
                key={item.value}
              >
                ×
              </button>
            </span>
          ))}

          <input
            type="text"
            placeholder="Search roles, technologies or areas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
        </div>

        {/* Dropdown */}
        {open && filteredOptions.length > 0 && (
          <div className={styles.dropdown}>
            {filteredOptions.map(group => (
              <div key={group.type} className={styles.group}>
                <span className={styles.groupLabel}>{group.label}</span>

                {group.items.map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => addSkill(item)}
                    className={`${styles.option} ${styles[item.type]}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
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
