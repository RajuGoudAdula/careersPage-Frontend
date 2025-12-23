import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchJobsForCompany } from '../store/companySlice'
import styles from '../styles/JobSearchForm.module.css'

export default function JobSearchForm({ company }){
  const dispatch = useDispatch()
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    dispatch(searchJobsForCompany({ companyId: company.id, role, location }))
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {company.searchUrl && <input placeholder="Role (e.g. Frontend)" value={role} onChange={e=>setRole(e.target.value)} />}
      {company.locationUrl && <input placeholder="Location (e.g. Bengaluru)" value={location} onChange={e=>setLocation(e.target.value)} />}
      <button type="submit">Search</button>
    </form>
  )
}