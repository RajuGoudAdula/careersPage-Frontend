import React, { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import JobAlertModal from "./components/JobAlertModal";
import JobAlertForm from "./components/JobAlertForm";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import "./App.css";
import { getAlertId } from "./utils/user";
import JobDetails from "./components/JobDetails";

export default function App() {
  const [alertOpen, setAlertOpen] = useState(false);

  // 🔑 ref to access child methods & state
  const jobAlertFormRef = useRef(null);

  // Modal submit button → child submitForm()
  const handleSubmit = () => {
    jobAlertFormRef.current?.submit();
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      if(!getAlertId()){
        setAlertOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <NavBar onNotifyClick={() => setAlertOpen(true)} />

      <JobAlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        isUpdate={jobAlertFormRef.current?.isUpdate}
        isDirty={jobAlertFormRef.current?.isDirty}
        saving={jobAlertFormRef.current?.saving}
        alertType = {jobAlertFormRef.current?.alertType}
        onSubmit={handleSubmit}
      >
        <JobAlertForm
          ref={jobAlertFormRef}
          onSaved={() => setAlertOpen(false)}
        />
      </JobAlertModal>

      <Routes>
        <Route path="/*" element={<UserRoutes onNotifyClick={() => setAlertOpen(true)} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>

      <Footer onNotifyClick={() => setAlertOpen(true)} />
    </>
  );
}
