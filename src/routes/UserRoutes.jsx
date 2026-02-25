// src/routes/UserRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ITHome from "../pages/user/ITHome";
import ContactForm from "../components/ContactForm";
import Search from "../pages/user/Search";
import HomePage from "../pages/user/HomePage";
import GovernmentJobs from "../pages/user/GovernmentJobs";
import RecentJobs from "../pages/user/RecentJobs";

export default function UserRoutes({onNotifyClick}) {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onNotifyClick = {onNotifyClick}/>} />
        <Route path="/it-jobs" element={<ITHome />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/search" element={<Search />} />
        <Route path="/government-jobs" element={<GovernmentJobs />} />
        <Route path='/recent-jobs' element={<RecentJobs />} />
      </Routes>
    </>
  );
}
