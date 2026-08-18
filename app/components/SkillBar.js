"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SkillBar({ label, percent }) {
  const reduce = useReducedMotion();

  return (
    <motion.div 
      className="skill-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="skill-head">
        <span>{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {percent}%
        </motion.span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: reduce ? `${percent}%` : "0%" }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2 
          }}
        />
      </div>
    </motion.div>
  );
}
