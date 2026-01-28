import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import SearchByTitle from "./SearchByTitle";
import SearchByCompany from "./SearchByCompany";

export default function Search() {
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");
  const query = searchParams.get("q");

  if (!query || !mode) {
    return <Navigate to="/" />;
  }

  if (mode === "title") {
    return <SearchByTitle />;
  }

  if (mode === "company") {
    return <SearchByCompany query={query} />;
  }

  return <Navigate to="/" />;
}
