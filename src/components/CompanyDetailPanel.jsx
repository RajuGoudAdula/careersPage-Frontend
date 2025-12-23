// File: src/components/CompanyDetailPanel.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePanel, fetchCompanyDetails } from '../store/companySlice'
import JobSearchForm from './JobSearchForm'
import JobCard from './JobCard'
import styles from '../styles/CompanyPanel.module.css'

export default function CompanyDetailPanel(){
  const dispatch = useDispatch()
  const open = useSelector(s => s.companies.panelOpen)
  const company = useSelector(s => s.companies.active)
  const loading = useSelector(s => s.companies.loadingDetails)
  const jobs = useSelector(s => s.companies.jobs)

  useEffect(()=>{
    if(company) dispatch(fetchCompanyDetails(company.id))
  },[company, dispatch])

  if(!open) return <div className={styles.closed}>Select a company</div>

  return (
    <div className={styles.panel}>
      <button className={styles.close} onClick={() => dispatch(closePanel())}>×</button>
      <header className={styles.header}>
        <img src={company.logo} alt="logo" className={styles.logo} />
        <div>
          <h2>{company.name}</h2>
          <p>{company.description}</p>
        </div>
      </header>

      {/* If company provides search & location URLs, show search form */}
      {company.searchUrl || company.locationUrl ? (
        <JobSearchForm company={company} />
      ) : (
        <div className={styles.notice}>No search/location URLs — fetching & analyzing HTML automatically.</div>
      )}

      <section className={styles.jobsSection}>
        {loading ? <div>Loading jobs…</div> : (
          jobs.length ? jobs.map(j => <JobCard key={j.id||j._uid} job={j} />) : <div>No jobs found</div>
        )}
      </section>
    </div>
  )
}