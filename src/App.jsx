import React, { useEffect, useState } from "react";
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

export default function App() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [triggerSubmit, setTriggerSubmit] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(() => {
      setAlertOpen(true);
    }, 10000);
  },[]);

  return (
    <>
      <NavBar onNotifyClick={() => setAlertOpen(true)} />

      <JobAlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onSubmit={() => setTriggerSubmit(true)}
      >
        <JobAlertForm
          onSaved={() => setAlertOpen(false)}
          triggerSubmit={triggerSubmit}
          setTriggerSubmit={setTriggerSubmit}
        />
      </JobAlertModal>

      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />   
      </Routes>
      <Footer onNotifyClick={() => setAlertOpen(true)}/>
    </>
  );
}
