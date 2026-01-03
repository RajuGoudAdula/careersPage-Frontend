import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function JobCard({ job, favicon, onClick, expanded }) {
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    console.log(job._id);
  }, []);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#job-${job._id}`;

    // Mobile native share
    if (navigator.share) {
      navigator
        .share({
          title: `Job: ${job.title}`,
          text: `Check out this job at ${job.company?.companyName}`,
          url: shareUrl,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Desktop: show custom share sheet
      setShowShare(true);
    }
  };

  const getJobTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "remote":
        return <svg className={styles.icon} height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q122 0 210-81t100-200q-9 8-20.5 12.5T744-432H600q-29.7 0-50.85-21.15Q528-474.3 528-504v-48H360v-96q0-29.7 21.15-50.85Q402.3-720 432-720h48v-24q0-14 5-26t13-21q-3-1-10-1h-8q-130 0-221 91t-91 221h216q60 0 102 42t42 102v48H384v105q23 8 46.73 11.5Q454.45-168 480-168Z"/></svg>;
      case "full-time":
        return <svg className={styles.icon} height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M168-144q-29.7 0-50.85-21.15Q96-186.3 96-216v-432q0-29.7 21.15-50.85Q138.3-720 168-720h168v-72.21Q336-822 357.18-843q21.17-21 50.91-21h144.17Q582-864 603-842.85q21 21.15 21 50.85v72h168q29.7 0 50.85 21.15Q864-677.7 864-648v432q0 29.7-21.15 50.85Q821.7-144 792-144H168Zm0-72h624v-432H168v432Zm240-504h144v-72H408v72ZM168-216v-432 432Z"/></svg>;
      case "part-time":
        return <svg className={styles.icon} height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M216-600h528v-96H216v96Zm0 0v-96 96Zm0 504q-29.7 0-50.85-21.15Q144-138.3 144-168v-528q0-29 21.5-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29 0 50.5 21.5T816-696v210q-17-7-35.03-11-18.04-4-36.97-6v-25H216v360h250q5 20 13.5 37.5T499-96H216Zm503.77 48Q640-48 584-104.23q-56-56.22-56-136Q528-320 584.23-376q56.22-56 136-56Q800-432 856-375.77q56 56.22 56 136Q912-160 855.77-104q-56.22 56-136 56ZM775-151l34-34-65-65v-86h-48v106l79 79Z"/></svg>;
      case "internship":
        return <svg className={styles.icon} height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M480-144 216-276v-240L48-600l432-216 432 216v312h-72v-276l-96 48v240L480-144Zm0-321 271-135-271-135-271 135 271 135Zm0 240 192-96v-159l-192 96-192-96v159l192 96Zm0-240Zm0 81Zm0 0Z"/></svg>;
      default:
        return <svg viewBox="0 0 24 24" className={styles.icon}><path d="M10 2h4v2h5a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h5V2z" /></svg>;
    }
  };

  return (
    <div
      className={styles.jobCard}
      onClick={onClick}
      role="button"
      tabIndex={0}
      id={`job-${job?._id}`}
    >
      {expanded && (
        <div className={styles.faviconWrapper}>
          <a
            href={job?.company?.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={favicon} alt="Company logo" className={styles.favicon} />
          </a>
        </div>
      )}

      <div className={styles.content}>
        {expanded && (
          <h3 className={styles.companyName}>
            <a
              href={job?.company?.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {job?.company?.companyName}
            </a>

            <button
              className={styles.shareButton}
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              title="Share this job"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M648-96q-50 0-85-35t-35-85q0-9 4-29L295-390q-16 14-36.05 22-20.04 8-42.95 8-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 43 8t36 22l237-145q-2-7-3-13.81-1-6.81-1-15.19 0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-43-8t-36-22L332-509q2 7 3 13.81 1 6.81 1 15.19 0 8.38-1 15.19-1 6.81-3 13.81l237 145q16-14 36.05-22 20.04-8 42.95-8 50 0 85 35t35 85q0 50-35 85t-85 35Zm0-72q20.4 0 34.2-13.8Q696-195.6 696-216q0-20.4-13.8-34.2Q668.4-264 648-264q-20.4 0-34.2 13.8Q600-236.4 600-216q0 20.4 13.8 34.2Q627.6-168 648-168ZM216-432q20.4 0 34.2-13.8Q264-459.6 264-480q0-20.4-13.8-34.2Q236.4-528 216-528q-20.4 0-34.2 13.8Q168-500.4 168-480q0 20.4 13.8 34.2Q195.6-432 216-432Zm432-264q20.4 0 34.2-13.8Q696-723.6 696-744q0-20.4-13.8-34.2Q668.4-792 648-792q-20.4 0-34.2 13.8Q600-764.4 600-744q0 20.4 13.8 34.2Q627.6-696 648-696Zm0 480ZM216-480Zm432-264Z"/></svg>
            </button>
          </h3>
        )}

        <h4 className={styles.title}>
          {job.title}
          {!expanded && (
            <button
              className={styles.shareButton}
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              title="Share this job"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M648-96q-50 0-85-35t-35-85q0-9 4-29L295-390q-16 14-36.05 22-20.04 8-42.95 8-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 43 8t36 22l237-145q-2-7-3-13.81-1-6.81-1-15.19 0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-43-8t-36-22L332-509q2 7 3 13.81 1 6.81 1 15.19 0 8.38-1 15.19-1 6.81-3 13.81l237 145q16-14 36.05-22 20.04-8 42.95-8 50 0 85 35t35 85q0 50-35 85t-85 35Zm0-72q20.4 0 34.2-13.8Q696-195.6 696-216q0-20.4-13.8-34.2Q668.4-264 648-264q-20.4 0-34.2 13.8Q600-236.4 600-216q0 20.4 13.8 34.2Q627.6-168 648-168ZM216-432q20.4 0 34.2-13.8Q264-459.6 264-480q0-20.4-13.8-34.2Q236.4-528 216-528q-20.4 0-34.2 13.8Q168-500.4 168-480q0 20.4 13.8 34.2Q195.6-432 216-432Zm432-264q20.4 0 34.2-13.8Q696-723.6 696-744q0-20.4-13.8-34.2Q668.4-792 648-792q-20.4 0-34.2 13.8Q600-764.4 600-744q0 20.4 13.8 34.2Q627.6-696 648-696Zm0 480ZM216-480Zm432-264Z"/></svg>
            </button>
          )}
        </h4>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg className={styles.icon} height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.03-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
            {job.location}
          </span>

          <span className={styles.metaItem}>
            <svg className={styles.icon} height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="m614-310 51-51-149-149v-210h-72v240l170 170ZM480-96q-79.38 0-149.19-30T208.5-208.5Q156-261 126-330.96t-30-149.5Q96-560 126-630q30-70 82.5-122t122.46-82q69.96-30 149.5-30t149.55 30.24q70 30.24 121.79 82.08 51.78 51.84 81.99 121.92Q864-559.68 864-480q0 79.38-30 149.19T752-208.5Q700-156 629.87-126T480-96Zm0-384Zm.48 312q129.47 0 220.5-91.5Q792-351 792-480.48q0-129.47-91.02-220.5Q609.95-792 480.48-792 351-792 259.5-700.98 168-609.95 168-480.48 168-351 259.5-259.5T480.48-168Z"/></svg>
            {job.experience} {job.experience <= 1 ? "year" : "years"}
          </span>

          <span className={styles.metaItem}>
            {getJobTypeIcon(job.jobType)}
            {job.jobType}
          </span>
        </div>

        <div className={styles.footer}>
          <span className={styles.posted}>
            Posted {job?.postedOn}
          </span>

          <a
            href={job.link}
            target="_blank"
            rel="noreferrer"
            className={styles.apply}
            onClick={(e) => e.stopPropagation()}
          >
            View Job →
          </a>
        </div>
      </div>

      {/* Desktop Share Sheet */}
      {showShare && (
        <div className={styles.shareSheet}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#job-${job._id}`);
              alert("Link copied!");
              setShowShare(false);
            }}
          >
            Copy Link
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#job-${job._id}`)}`}
            target="_blank"
          >
            WhatsApp
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#job-${job._id}`)}`}
            target="_blank"
          >
            Twitter
          </a>

          <a
            href={`mailto:?subject=Check this job&body=${encodeURIComponent(`${window.location.origin}${window.location.pathname}#job-${job._id}`)}`}
            target="_blank"
          >
            Email
          </a>

          <button onClick={() => setShowShare(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
