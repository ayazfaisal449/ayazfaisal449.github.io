"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SectionBackground from "./SectionBackground";
import { fadeUp, stagger, viewport } from "../lib/motion";

export default function MotionSection({
  id,
  className = "",
  children,
  bgVariant
}) {
  const sectionRef = useRef(null);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`section-wrap ${className}`}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {bgVariant ? <SectionBackground variant={bgVariant} targetRef={sectionRef} /> : null}
      <div className="section-inner">{children}</div>
    </motion.section>
  );
}

export function MotionItem({ children, className = "" }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
