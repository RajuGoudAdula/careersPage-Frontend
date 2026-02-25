import React from "react";
import { Route, Routes } from "react-router-dom";
import Organizations from "../pages/admin/Organizations.jsx";
import OrganizationPage from '../pages/admin/OrganizationPage.jsx';
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddOrganization from "../pages/admin/AddOrganization";
import AddJob from "../pages/admin/AddJob.jsx";
import Jobs from "../pages/admin/Jobs.jsx";

export default function AdminRoutes (){
    return(
        <>
            <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/organization/:id" element={<OrganizationPage />} />
                <Route path="/add-organization" element={<AddOrganization />} />
                <Route path="/add-job" element={<AddJob />} />
                <Route path="/jobs" element={<Jobs />} />
            </Routes>
        </>
    )
}