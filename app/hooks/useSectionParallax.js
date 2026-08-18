"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";

export function useSectionParallax(targetRef) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const range = reduce ? [0, 0] : undefined;

  const orb1Y = useTransform(scrollYProgress, [0, 1], range ?? [28, -28]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], range ?? [-22, 22]);
  const ringsY = useTransform(scrollYProgress, [0, 1], range ?? [14, -14]);
  const gridY = useTransform(scrollYProgress, [0, 1], range ?? [8, -8]);

  return { orb1Y, orb2Y, ringsY, gridY };
}

export function useGlobalParallax() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const range = reduce ? [0, 0] : undefined;

  const orb1Y = useTransform(scrollY, [0, 900], range ?? [0, 140]);
  const orb2Y = useTransform(scrollY, [0, 900], range ?? [0, 90]);
  const orbitY = useTransform(scrollY, [0, 900], range ?? [0, 70]);
  const gridY = useTransform(scrollY, [0, 900], range ?? [0, 40]);

  return { orb1Y, orb2Y, orbitY, gridY };
}
