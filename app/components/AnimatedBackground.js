"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useGlobalParallax } from "../hooks/useSectionParallax";
import ParticleNetwork from "./ParticleNetwork";

export default function AnimatedBackground() {
  const reduce = useReducedMotion();
  const { orb1Y, orb2Y, orbitY, gridY } = useGlobalParallax();

  const drift = reduce
    ? {}
    : {
        animate: {
          x: [0, 24, -14, 0],
          y: [0, -18, 12, 0],
          scale: [1, 1.05, 0.97, 1]
        },
        transition: { duration: 24, repeat: Infinity, ease: "easeInOut" }
      };

  const driftAlt = reduce
    ? {}
    : {
        animate: {
          x: [0, -20, 14, 0],
          y: [0, 16, -12, 0],
          scale: [1, 0.96, 1.04, 1]
        },
        transition: { duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }
      };

  const orbitSpin = reduce
    ? {}
    : {
        animate: { rotate: 360 },
        transition: { duration: 55, repeat: Infinity, ease: "linear" }
      };

  return (
    <div className="bg-canvas" aria-hidden="true">
      <ParticleNetwork />
      <motion.div className="bg-grid" style={{ y: gridY }} />
      <motion.div className="bg-orb bg-orb-1" style={{ y: orb1Y }} {...drift} />
      <motion.div className="bg-orb bg-orb-2" style={{ y: orb2Y }} {...driftAlt} />
      <motion.div
        className="bg-orb bg-orb-3"
        style={{ y: orb1Y }}
        {...(reduce
          ? {}
          : {
              animate: { opacity: [0.3, 0.5, 0.3] },
              transition: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            })}
      />

      <motion.div className="hero-orbit-wrap" style={{ y: orbitY }}>
        <motion.svg viewBox="0 0 300 300" className="hero-orbit hero-orbit-1" {...orbitSpin}>
          <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(61,214,255,0.2)" strokeWidth="1" />
          <circle cx="150" cy="20" r="4" fill="rgba(61,214,255,0.6)" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 300 300"
          className="hero-orbit hero-orbit-2"
          {...(reduce
            ? {}
            : {
                animate: { rotate: -360 },
                transition: { duration: 70, repeat: Infinity, ease: "linear" }
              })}
        >
          <circle cx="150" cy="150" r="95" fill="none" stroke="rgba(109,124,255,0.15)" strokeWidth="0.8" />
          <circle cx="245" cy="150" r="3" fill="rgba(109,124,255,0.5)" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
