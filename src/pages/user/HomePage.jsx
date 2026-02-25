import React, { useEffect, useState } from "react";
import styles from "../../styles/HomePage.module.css";
import userApi from '../../api/userApi';
import JobCard from '../../components/JobCard';
import {
  FaSearch,
  FaBell,
  FaCheckCircle,
  FaBolt,  
} from "react-icons/fa";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const jobTypeCards = [
  { title: "Government Jobs", description: "Get the latest verified government notifications from official sources.", icon: <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="white" className={styles.svgIcon}><path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"/></svg>,  action: "/government-jobs" ,buttonName: "Govt"},
  { title: "IT Jobs", description: "Explore top IT and tech openings directly from company career pages.", icon: <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="white" className={styles.svgIcon}><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/></svg>,  action: "/it-jobs" ,buttonName: "IT"},
];

const whyCareersPage = [
  { title: "Verified Listings", description: "Every job posting is manually reviewed for authenticity.", icon: <FaCheckCircle />, color: "blue" },
  { title: "Specialized Focus", description: "We specialize in high-impact sectors for relevant matches.", icon: <FaBolt />, color: "yellow" },
  { title: "Instant Notifications", description: "Be the first to apply with smart alerts.", icon: <FaBell />, color: "green" },
];

const HomePage = ({onNotifyClick}) => {

  const [latestJobs,setLatestJobs] = useState([]);

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const res = await userApi.getLatestJobs();
        console.log(res.data);
        setLatestJobs(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchLatestJobs();
  }, []);

  return (
    <main className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Official Government & IT Jobs <br />
            <span className={styles.blue}>All in One Place</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Browse verified openings directly from company careers pages and government notifications. Apply fast, stay updated, and never miss an opportunity.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary} onClick={() => document.getElementById("latest-jobs").scrollIntoView({ behavior: "smooth" })}>
              <FaSearch /> Find Your Future
            </button>
            <button className={styles.btnTonal} onClick={onNotifyClick}>
              <FaBell /> Set Up Alerts
            </button>
          </div>
        </div>
      </section>

      {/* Job Type Cards */}
      <section className={styles.jobCardsSection}>
        <div className={styles.jobCardsGrid}>
          {jobTypeCards.map((card, i) => (
            <Link to={card.action} className={styles.jobCard}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon}>
                  {card.icon}
                   <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </div>

              <p className={styles.description}>{card.description}</p>

              {/* Bottom Right Arrow */}
              <div className={styles.cardArrow}>
                <FiArrowRight className={styles.arrowSvg} />
              </div>

            </Link>
          ))}
        </div>
      </section>


      {/* Latest Jobs Section */}
      <section id="latest-jobs" className={styles.latestJobsSection}>
        <div className={styles.latestJobsHeader}>
          <h2>Recent Opportunities</h2>
          <p>Hand-picked openings updated hourly.</p>
          <Link to="/recent-jobs">View all openings 
            <span className="material-symbols-outlined">
               <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#0071e3"><path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"/></svg>
            </span>
            </Link>
        </div>
        <div className={styles.latestJobsMarquee}>
          <div className={styles.latestJobsTrack}>
            {[...latestJobs, ...latestJobs].map((job, index) => (
              <JobCard key={`${job._id}-${index}`} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Why CareersPage */}
      <section className={styles.whySection}>
        <div className={styles.whyContent}>
          <div className={styles.whyLeft}>
            <h2>Why professionals choose <span className={styles.blue}>CareersPage</span></h2>
            <div className={styles.whyCards}>
              {whyCareersPage.map((item, i) => (
                <div key={i} className={styles.whyCard}>
                  <div className={`${styles.whyIcon} ${styles[item.color]}`}>{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
