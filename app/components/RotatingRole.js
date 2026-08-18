"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TypeWriter from "./TypeWriter";

const roles = [
  "PHP & Laravel Developer",
  "Backend Engineer",
  "Cloud & Deployment Specialist"
];

export default function RotatingRole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typingKey, setTypingKey] = useState(0);

  useEffect(() => {
    if (reduce) return;

    const holdMs = 2800;
    const role = roles[index];
    const typeDuration = role.length * 26 + 500;

    const timer = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % roles.length);
      setTypingKey((prev) => prev + 1);
    }, typeDuration + holdMs);

    return () => window.clearTimeout(timer);
  }, [index, typingKey, reduce]);

  if (reduce) {
    return (
      <span className="typewriter hero-title-accent">
        <span className="typewriter-line">
          <span className="typewriter-text">{roles[0]}</span>
        </span>
      </span>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={typingKey}
        className="rotating-role"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35 }}
      >
        <TypeWriter
          text={roles[index]}
          className="hero-title-accent"
          speed={26}
          delay={120}
        />
      </motion.span>
    </AnimatePresence>
  );
}
