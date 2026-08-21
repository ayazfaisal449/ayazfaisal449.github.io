"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSectionParallax } from "../hooks/useSectionParallax";

const variants = {
  hero: {
    orb1: "rgba(61, 214, 255, 0.16)",
    orb2: "rgba(109, 124, 255, 0.14)",
    ring: "rgba(61, 214, 255, 0.22)",
    grid: 0.05
  },
  about: {
    orb1: "rgba(61, 214, 255, 0.1)",
    orb2: "rgba(140, 100, 255, 0.08)",
    ring: "rgba(61, 214, 255, 0.14)",
    grid: 0.035
  },
  skills: {
    orb1: "rgba(140, 100, 255, 0.12)",
    orb2: "rgba(109, 124, 255, 0.1)",
    ring: "rgba(140, 100, 255, 0.16)",
    grid: 0.04
  },
  experience: {
    orb1: "rgba(109, 124, 255, 0.11)",
    orb2: "rgba(61, 214, 255, 0.09)",
    ring: "rgba(109, 124, 255, 0.15)",
    grid: 0.035
  },
  projects: {
    orb1: "rgba(61, 214, 255, 0.13)",
    orb2: "rgba(109, 124, 255, 0.11)",
    ring: "rgba(61, 214, 255, 0.18)",
    grid: 0.045
  },
  contact: {
    orb1: "rgba(109, 124, 255, 0.12)",
    orb2: "rgba(61, 214, 255, 0.1)",
    ring: "rgba(109, 124, 255, 0.16)",
    grid: 0.04
  },
  github: {
    orb1: "rgba(34, 197, 94, 0.1)",
    orb2: "rgba(109, 124, 255, 0.09)",
    ring: "rgba(34, 197, 94, 0.16)",
    grid: 0.035
  }
};

export default function SectionBackground({ variant = "hero", targetRef }) {
  const reduce = useReducedMotion();
  const v = variants[variant] || variants.hero;
  const { orb1Y, orb2Y, ringsY, gridY } = useSectionParallax(targetRef);

  const spin = reduce
    ? {}
    : {
        animate: { rotate: 360 },
        transition: { duration: 48, repeat: Infinity, ease: "linear" }
      };

  const spinReverse = reduce
    ? {}
    : {
        animate: { rotate: -360 },
        transition: { duration: 62, repeat: Infinity, ease: "linear" }
      };

  const pulse = reduce
    ? {}
    : {
        animate: { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] },
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
      };

  return (
    <div className="section-bg" aria-hidden="true">
      <motion.div className="section-bg-grid" style={{ opacity: v.grid, y: gridY }} />
      <motion.div
        className="section-bg-orb section-bg-orb-1"
        style={{ background: v.orb1, y: orb1Y }}
        {...pulse}
      />
      <motion.div
        className="section-bg-orb section-bg-orb-2"
        style={{ background: v.orb2, y: orb2Y }}
        {...(reduce
          ? {}
          : {
              animate: { x: [0, 20, -10, 0] },
              transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
            })}
      />

      <motion.div className="section-bg-rings" style={{ y: ringsY }}>
        <motion.svg viewBox="0 0 200 200" className="section-ring section-ring-1" {...spin}>
          <circle cx="100" cy="100" r="90" fill="none" stroke={v.ring} strokeWidth="0.8" opacity="0.5" />
          <circle cx="100" cy="10" r="3" fill={v.ring} opacity="0.7" />
        </motion.svg>
        <motion.svg viewBox="0 0 200 200" className="section-ring section-ring-2" {...spinReverse}>
          <circle cx="100" cy="100" r="65" fill="none" stroke={v.ring} strokeWidth="0.6" opacity="0.35" />
          <circle cx="165" cy="100" r="2.5" fill={v.ring} opacity="0.6" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
