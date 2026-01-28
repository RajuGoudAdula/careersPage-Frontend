import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/JobDetails.module.css";
import api from "../api/userApi";

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJobTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "remote":
        return (
          <svg className={styles.jobTypeIcon} viewBox="0 -960 960 960" fill="currentColor">
            <path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q122 0 210-81t100-200q-9 8-20.5 12.5T744-432H600q-29.7 0-50.85-21.15Q528-474.3 528-504v-48H360v-96q0-29.7 21.15-50.85Q402.3-720 432-720h48v-24q0-14 5-26t13-21q-3-1-10-1h-8q-130 0-221 91t-91 221h216q60 0 102 42t42 102v48H384v105q23 8 46.73 11.5Q454.45-168 480-168Z"/>
          </svg>
        );
      case "full-time":
        return (
          <svg className={styles.jobTypeIcon} viewBox="0 -960 960 960" fill="currentColor">
            <path d="M168-144q-29.7 0-50.85-21.15Q96-186.3 96-216v-432q0-29.7 21.15-50.85Q138.3-720 168-720h168v-72.21Q336-822 357.18-843q21.17-21 50.91-21h144.17Q582-864 603-842.85q21 21.15 21 50.85v72h168q29.7 0 50.85 21.15Q864-677.7 864-648v432q0 29.7-21.15 50.85Q821.7-144 792-144H168Zm0-72h624v-432H168v432Zm240-504h144v-72H408v72ZM168-216v-432 432Z"/>
          </svg>
        );
      case "part-time":
        return (
          <svg className={styles.jobTypeIcon} viewBox="0 -960 960 960" fill="currentColor">
            <path d="M216-600h528v-96H216v96Zm0 0v-96 96Zm0 504q-29.7 0-50.85-21.15Q144-138.3 144-168v-528q0-29 21.5-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29 0 50.5 21.5T816-696v210q-17-7-35.03-11-18.04-4-36.97-6v-25H216v360h250q5 20 13.5 37.5T499-96H216Zm503.77 48Q640-48 584-104.23q-56-56.22-56-136Q528-320 584.23-376q56.22-56 136-56Q800-432 856-375.77q56 56.22 56 136Q912-160 855.77-104q-56.22 56-136 56ZM775-151l34-34-65-65v-86h-48v106l79 79Z"/>
          </svg>
        );
      case "internship":
        return (
          <svg className={styles.jobTypeIcon} viewBox="0 -960 960 960" fill="currentColor">
            <path d="M480-144 216-276v-240L48-600l432-216 432 216v312h-72v-276l-96 48v240L480-144Zm0-321 271-135-271-135-271 135 271 135Zm0 240 192-96v-159l-192 96-192-96v159l192 96Zm0-240Zm0 81Zm0 0Z"/>
          </svg>
        );
      default:
        return (
          <svg className={styles.jobTypeIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 2h4v2h5a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h5V2z"/>
          </svg>
        );
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.getJobDetails(jobId);
        setJob(response?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        {/* Hero Skeleton */}
        <header className={styles.skeletonHero}>
          <div className={styles.skeletonCompanyLogo}></div>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonMetaContainer}>
            <div className={styles.skeletonMeta}></div>
            <div className={styles.skeletonMeta}></div>
          </div>
          <div className={styles.skeletonButton}></div>
        </header>

        {/* Main Content Skeleton */}
        <main className={styles.skeletonMain}>
          <div className={styles.skeletonGrid}>
            <div className={styles.skeletonDescription}>
              <div className={styles.skeletonHeading}></div>
              <div className={styles.skeletonDivider}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonTextShort}></div>
            </div>
            <div className={styles.skeletonOverview}>
              <div className={styles.skeletonHeading}></div>
              <div className={styles.skeletonOverviewRow}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonValue}></div>
              </div>
              <div className={styles.skeletonOverviewRow}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonValue}></div>
              </div>
              <div className={styles.skeletonOverviewRow}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonValue}></div>
              </div>
              <div className={styles.skeletonOverviewRow}>
                <div className={styles.skeletonLabel}></div>
                <div className={styles.skeletonValue}></div>
              </div>
              <div className={styles.skeletonButton}></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className={styles.errorContainer}>
        <h1>Job Not Found</h1>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <a href="/" className={styles.backButton}>Back to Jobs</a>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.companyInfo}>
            <div className={styles.logoContainer}>
              <img 
                src={job?.company?.logo} 
                alt={job?.company?.companyName} 
                className={styles.companyLogo}
              />
            </div>
            <div className={styles.jobHeader}>
              <h1 className={styles.jobTitle}>{job.title}</h1>
              <div className={styles.companyName}>{job?.company?.companyName}</div>
            </div>
          </div>

          <div className={styles.jobMeta}>
            <div className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 -960 960 960">
                <path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.03-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/>
              </svg>
              <span>{job.location}</span>
            </div>
            
            <div className={`${styles.metaItem} ${styles.jobTypeBadge}`}>
              {getJobTypeIcon(job.jobType)}
              <span>{job.jobType}</span>
            </div>
          </div>

          <a 
            href={job?.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.primaryButton}
          >
            Apply Now
            <svg className={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        {/* Wave Divider */}
        <div className={styles.waveDivider}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,80L48,74.7C96,69,192,59,288,53.3C384,48,480,48,576,53.3C672,59,768,69,864,69.3C960,69,1056,59,1152,48C1248,37,1344,27,1392,21.3L1440,16L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="currentColor"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentGrid}>
          {/* Left Column - Job Description */}
          <section className={styles.descriptionSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Job Description</h2>
              <div className={styles.sectionDivider}></div>
            </div>
            
            <div className={styles.descriptionContent}>
              <p className={styles.descriptionText}>{job?.description}</p>
              
              {job?.requirements && (
                <div className={styles.requirementsSection}>
                  <h3 className={styles.subsectionTitle}>Requirements</h3>
                  <ul className={styles.requirementsList}>
                    {job.requirements.map((req, index) => (
                      <li key={index} className={styles.requirementItem}>
                        <svg className={styles.bulletIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Right Column - Job Overview */}
          <aside className={styles.overviewSection}>
            <div className={styles.overviewCard}>
              <h2 className={styles.overviewTitle}>Job Overview</h2>
              
              <div className={styles.overviewDetails}>
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>
                    <svg className={styles.overviewIcon} viewBox="0 -960 960 960">
                      <path d="M549-120 280-400v-80h140q53 0 91.5-34.5T558-600H240v-80h306q-17-35-50.5-57.5T420-760H240v-80h480v80H590q14 17 25 37t17 43h88v80h-81q-8 85-70 142.5T420-400h-29l269 280H549Z"/>
                    </svg>
                    Salary
                  </div>
                  <div className={styles.overviewValue}>
                    <span className={styles.salaryAmount}>{job.salary}</span> LPA
                  </div>
                </div>
                
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>
                    <svg className={styles.overviewIcon} viewBox="0 -960 960 960">
                      <path d="M240-120q-33 0-56.5-23.5T160-200v-440q0-33 23.5-56.5T240-720h80v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h80q33 0 56.5 23.5T800-640v440q0 33-23.5 56.5T720-120H240Zm0-80h480v-440H240v440Zm160-520h160v-80H400v80ZM240-200v-440 440Z"/>
                    </svg>
                    Experience
                  </div>
                  <div className={styles.overviewValue}>
                    {job.experience} {job.experience === "1" ? "year" : "years"}
                  </div>
                </div>
                
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>
                    <svg className={styles.overviewIcon} viewBox="0 -960 960 960">
                      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                    </svg>
                    Job Type
                  </div>
                  <div className={styles.overviewValue}>
                    <span className={styles.jobTypeTag}>{job.jobType}</span>
                  </div>
                </div>
                
                <div className={styles.overviewItem}>
                  <div className={styles.overviewLabel}>
                    <svg className={styles.overviewIcon} viewBox="0 -960 960 960">
                      <path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.03-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/>
                    </svg>
                    Location
                  </div>
                  <div className={styles.overviewValue}>
                    {job.location}
                  </div>
                </div>
              </div>
              
              <a 
                href={job?.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.applyButton}
              >
                Apply for this Position
                <svg className={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className={styles.overviewFooter}>
                <div className={styles.postedDate}>
                  <svg className={styles.footerIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                  Posted a month ago
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}