"use client";

import { motion, useReducedMotion } from "framer-motion";

const badges = [
  { label: "Laravel", x: "10%", y: "18%" },
  { label: "AWS", x: "88%", y: "22%" },
  { label: "MySQL", x: "14%", y: "68%" },
  { label: "AI APIs", x: "86%", y: "72%" },
  { label: "Netlify", x: "8%", y: "45%" }
];

export default function FloatingBadges() {
  const reduce = useReducedMotion();

  return (
    <div className="floating-badges" aria-hidden="true">
      {badges.map((badge, i) => (
        <motion.span
          key={badge.label}
          className="float-badge"
          style={{ left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: reduce ? 0 : [0, -7, 0]
          }}
          transition={{
            opacity: { delay: 0.5 + i * 0.1, duration: 0.45 },
            scale: { delay: 0.5 + i * 0.1, duration: 0.45 },
            y: reduce
              ? undefined
              : { duration: 4.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }
          }}
        >
          {badge.label}
        </motion.span>
      ))}
    </div>
  );
}
