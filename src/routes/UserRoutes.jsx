// src/routes/UserRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import ContactForm from "../components/ContactForm";
import Search from "../pages/user/Search";

export default function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}
