import React from "react";
import Home from "../pages/admin/Home";
import { Route, Routes } from "react-router-dom";
import Companies from "../pages/admin/Companies";
import CompanyPage from '../pages/admin/CompanyPage';

export default function AdminRoutes (){
    return(
        <>
            <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/company/:id" element={<CompanyPage />} />
            </Routes>
        </>
    )
}