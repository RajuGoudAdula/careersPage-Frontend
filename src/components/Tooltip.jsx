import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/Tooltip.module.css";

export default function Tooltip({
  targetRef,
  open,
  onClose,
  data,
  onTooltipMouseEnter,
  onTooltipMouseLeave,
}) {
  const tooltipRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [position, setPosition] = useState("bottom");

  const updatePosition = () => {
    if (!targetRef?.current || !tooltipRef?.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    const newPosition =
      spaceBelow < tooltipRect.height + 20 && spaceAbove > spaceBelow
        ? "top"
        : "bottom";

    setPosition(newPosition);

    const top =
      newPosition === "top"
        ? window.scrollY + targetRect.top - tooltipRect.height - 12
        : window.scrollY + targetRect.bottom + 12;

    const left =
      window.scrollX +
      targetRect.left +
      targetRect.width / 2 -
      tooltipRect.width / 2;

    const safeLeft = Math.max(
      window.scrollX + 12,
      Math.min(left, window.scrollX + window.innerWidth - tooltipRect.width - 12)
    );

    setCoords({ top, left: safeLeft });
  };

  const handleOutside = (e) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(e.target) &&
      targetRef.current &&
      !targetRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("mousedown", handleOutside);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open, data]);

  if (!open) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className={`${styles.tooltip} ${
        position === "top" ? styles.top : styles.bottom
      }`}
      style={{ top: coords.top, left: coords.left }}
      onMouseEnter={onTooltipMouseEnter}
      onMouseLeave={onTooltipMouseLeave}
    >
      <div
        className={`${styles.arrow} ${
          position === "top" ? styles.arrowDown : styles.arrowUp
        }`}
      />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.company}>
          <img src={data.logo} alt="" className={styles.logo} />
          <div>
            <div className={styles.title}>{data.role}</div>
            <div className={styles.companyName}>{data.company}</div>
          </div>
        </div>

        <button className={styles.close} onClick={onClose}>×</button>
      </div>

      {/* Meta */}
      <div className={styles.meta}>
        <span>📍 {data.location}</span>
        <span>🕒 {data.experience}</span>
        <span>💼 {data.type}</span>
      </div>

      {/* Description */}
      <p className={styles.description}>{data.description}</p>

      {/* CTA */}
      <button className={styles.applyBtn}>Apply</button>
    </div>,
    document.body
  );
}
