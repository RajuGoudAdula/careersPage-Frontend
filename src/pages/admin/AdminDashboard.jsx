import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/AdminDashboard.module.css";

/* ✅ Correct hi2 icons */
import {
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineBuildingOffice2,
  HiOutlineAcademicCap,
  HiOutlineCodeBracket,
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
  HiOutlinePlus,
  HiOutlineCog6Tooth,
  HiOutlinePlay,
  HiOutlineUserCircle,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineArrowPath
} from "react-icons/hi2";

import {
  MdOutlineWorkOutline,
  MdOutlineBusinessCenter,
  MdOutlineNotificationsActive,
  MdOutlineDashboard
} from "react-icons/md";

import { FiSettings, FiMoreVertical } from "react-icons/fi";

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("week");

  const navigate = useNavigate();


  const stats = {
    totalJobs: 1284,
    activeJobs: 847,
    expiredJobs: 437,
    organizations: 56,
    govtJobs: 234,
    itJobs: 512,
    totalUsers: 3456,
    totalAlerts: 89
  };

  /* ================= STAT CARD ================= */
  const StatCard = ({
    icon: Icon,
    number,
    label,
    trend,
    trendValue,
    color = "#6C63FF"
  }) => (
    <div className={styles.statCard}>
      <div
        className={styles.statIconWrapper}
        style={{ background: `${color}15` }}
      >
        <Icon className={styles.statIcon} style={{ color }} />
        <div className={styles.statHeader}>
          <span className={styles.statLabel}>{label}</span>

          {trend && (
            <div
              className={`${styles.trendBadge} ${
                trend === "up" ? styles.trendUp : styles.trendDown
              }`}
            >
              {trend === "up" ? (
                <HiOutlineArrowTrendingUp />
              ) : (
                <HiOutlineArrowTrendingDown />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.statContent}>

        <div className={styles.statNumber}>
          {number.toLocaleString()}
        </div>
      </div>
    </div>
  );

  /* ================= QUICK ACTION BUTTON ================= */
  const QuickActionButton = ({
    icon: Icon,
    label,
    description,
    onClick,
    color = "#6C63FF"
  }) => (
    <button className={styles.quickActionBtn} onClick={onClick}>
      <div
        className={styles.quickActionIconWrapper}
        style={{ background: `${color}20` }}
      >
        <Icon className={styles.quickActionIcon} style={{ color }} />
      </div>

      <div className={styles.quickActionContent}>
        <span className={styles.quickActionLabel}>{label}</span>
        <span className={styles.quickActionDesc}>{description}</span>
      </div>

      <HiOutlinePlay className={styles.quickActionArrow} />
    </button>
  );

  return (
    <div className={styles.dashboard}>

      {/* ================= HEADER ================= */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>
            Dashboard Overview
          </h1>
          <p className={styles.dashboardSubtitle}>
            Welcome back! Here’s what’s happening today.
          </p>
        </div>

        <div className={styles.headerActions}>
          <select
            className={styles.timeFilter}
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          <button className={styles.exportBtn}>
            <HiOutlineFunnel />
            <span>Filter</span>
          </button>

          <button className={styles.refreshBtn}>
            <HiOutlineArrowPath />
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className={styles.mainContent}>
        {/* Row 1 */}
        <div className={styles.cardGrid}>
          <StatCard
            icon={HiOutlineChartBar}
            number={stats.totalJobs}
            label="Total Jobs"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            icon={HiOutlineCheckCircle}
            number={stats.activeJobs}
            label="Active Jobs"
            trend="up"
            trendValue="8%"
          />
          <StatCard
            icon={HiOutlineClock}
            number={stats.expiredJobs}
            label="Expired Jobs"
            trend="down"
            trendValue="3%"
            color="#EF4444"
          />
          <StatCard
            icon={HiOutlineBuildingOffice2}
            number={stats.organizations}
            label="Organizations"
            trend="up"
            trendValue="+2"
          />
        </div>

        {/* Row 2 */}
        <div className={styles.cardGrid}>
          <StatCard
            icon={HiOutlineAcademicCap}
            number={stats.govtJobs}
            label="Govt Jobs"
            trend="up"
            trendValue="5%"
          />
          <StatCard
            icon={HiOutlineCodeBracket}
            number={stats.itJobs}
            label="IT Jobs"
            trend="up"
            trendValue="15%"
          />
          <StatCard
            icon={HiOutlineUsers}
            number={stats.totalUsers}
            label="Total Users"
            trend="up"
            trendValue="+124"
          />
          <StatCard
            icon={HiOutlineBell}
            number={stats.totalAlerts}
            label="Total Alerts"
            trend="up"
            trendValue="+7"
          />
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className={styles.quickActionsSection}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>

          <div className={styles.actionsGrid}>
            <QuickActionButton
              icon={HiOutlinePlus}
              label="Add Job"
              description="Create new job posting"
              onClick={() => navigate("/admin/add-job")}
            />

            <QuickActionButton
              icon={HiOutlineBuildingOffice2}
              label="Add Organization"
              description="Register new company"
              onClick={() => navigate("/admin/add-organization")}
              color="#10B981"
            />


            <QuickActionButton
              icon={HiOutlineUsers}
              label="Manage Users"
              description="View & manage accounts"
              onClick={() => console.log("Users")}
              color="#8B5CF6"
            />

            <QuickActionButton
              icon={MdOutlineNotificationsActive}
              label="Manage Alerts"
              description="Configure alert engine"
              onClick={() => console.log("Alerts")}
              color="#F59E0B"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
