"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];
const rotateSpring = { type: "spring", stiffness: 62, damping: 14, mass: 1.05 };
const AUTOPLAY_MS = 4000;

function ProjectFace({ project, position, isActive }) {
  if (!project) return <div className="cube-face-empty" />;

  return (
    <div className={`cube-face-content ${position} ${isActive ? "is-active" : ""}`}>
      <div
        className="cube-face-bg"
        style={{ backgroundImage: `url(${project.image})` }}
        aria-hidden="true"
      />
      <motion.img
        src={project.image}
        alt={project.title}
        className="cube-face-img"
        initial={isActive ? { opacity: 0.88, scale: 0.96 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease }}
      />
      {isActive ? <span className="cube-face-shine" aria-hidden="true" /> : null}
      <div className="cube-face-overlay">
        <span>{project.title}</span>
      </div>
    </div>
  );
}

export default function ProjectsCube({ projects }) {
  const reduce = useReducedMotion();
  const sceneRef = useRef(null);
  const busy = useRef(false);
  const pendingIndexRef = useRef(null);
  const isResettingRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [instantRotate, setInstantRotate] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 110, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 110, damping: 22 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const total = projects.length;

  const frontProject = projects[index];
  const rightProject = projects[(index + 1) % total];
  const topProject = projects[(index + 2) % total];
  const leftProject = projects[(index - 1 + total) % total];
  const backProject = projects[(index + Math.floor(total / 2)) % total];
  const bottomProject = projects[(index + 3) % total];

  const handleMouseMove = useCallback(
    (event) => {
      if (reduce || !sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, reduce]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const finishRotation = useCallback(() => {
    if (pendingIndexRef.current === null || isResettingRef.current) return;

    const newIndex = pendingIndexRef.current;
    pendingIndexRef.current = null;
    isResettingRef.current = true;

    setInstantRotate(true);
    setIndex(newIndex);
    setRotationY(0);
    setIsSpinning(false);
    busy.current = false;

    requestAnimationFrame(() => {
      isResettingRef.current = false;
      setInstantRotate(false);
    });
  }, []);

  const goTo = useCallback(
    (nextIndex) => {
      if (busy.current) return;
      const wrapped = (nextIndex + total) % total;
      if (wrapped === index) return;

      if (reduce) {
        setIndex(wrapped);
        setRotationY(0);
        return;
      }

      let diff = wrapped - index;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      if (Math.abs(diff) !== 1) {
        setIndex(wrapped);
        setRotationY(0);
        setIsSpinning(false);
        pendingIndexRef.current = null;
        busy.current = false;
        return;
      }

      const direction = diff > 0 ? 1 : -1;

      busy.current = true;
      pendingIndexRef.current = wrapped;
      setIsSpinning(true);
      setInstantRotate(false);
      setRotationY((prev) => prev - direction * 90);
    },
    [index, reduce, total]
  );

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!playing || reduce || isSpinning) return undefined;
    const timer = window.setInterval(() => {
      goTo(index + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [playing, reduce, index, total, goTo, isSpinning]);

  return (
    <div className="projects-stage">
      <div className="cube-column">
        <div
          className="cube-scene"
          ref={sceneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cube-ambient-glow" aria-hidden="true" />
          <motion.div
            className="cube-floor-shadow"
            aria-hidden="true"
            animate={
              reduce
                ? { opacity: 0.35, scaleX: 1 }
                : isSpinning
                  ? { opacity: 0.22, scaleX: 0.82 }
                  : { opacity: [0.28, 0.38, 0.28], scaleX: [0.92, 1, 0.92] }
            }
            transition={
              isSpinning
                ? { duration: 0.35, ease }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <motion.div
            className="cube-parallax"
            style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY }}
          >
            <motion.div
              className={`project-cube ${isSpinning ? "is-spinning" : ""}`}
              initial={reduce ? false : { opacity: 0, scale: 0.82, rotateX: 20 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, y: 0 }
                  : {
                      opacity: 1,
                      scale: isSpinning ? 0.93 : 1,
                      rotateX: -20,
                      rotateY: rotationY + 25,
                      y: isSpinning ? 0 : [0, -9, 0]
                    }
              }
              transition={
                reduce
                  ? { duration: 0.3 }
                  : {
                      opacity: { duration: 0.8, ease },
                      scale: { duration: 0.45, ease },
                      rotateX: rotateSpring,
                      rotateY: instantRotate
                        ? { duration: 0 }
                        : {
                            ...rotateSpring,
                            onComplete: finishRotation
                          },
                      y: isSpinning
                        ? { duration: 0.35, ease }
                        : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }
              }
            >
              <div className="cube-face cube-face-front">
                <ProjectFace project={frontProject} position="front" isActive />
              </div>

              <div className="cube-face cube-face-right">
                <ProjectFace project={rightProject} position="right" />
              </div>

              <div className="cube-face cube-face-top">
                <ProjectFace project={topProject} position="top" />
              </div>

              <div className="cube-face cube-face-left">
                <ProjectFace project={leftProject} position="left" />
              </div>

              <div className="cube-face cube-face-back">
                <ProjectFace project={backProject} position="back" />
              </div>

              <div className="cube-face cube-face-bottom">
                <ProjectFace project={bottomProject} position="bottom" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="cube-controls-wrap">
          <div className="cube-controls">
            <motion.button
              type="button"
              className="cube-nav-btn"
              onClick={prev}
              aria-label="Previous project"
              whileHover={reduce ? undefined : { scale: 1.08, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              type="button"
              className={`cube-nav-btn ${playing ? "is-playing" : ""}`}
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause rotation" : "Play rotation"}
              whileHover={reduce ? undefined : { scale: 1.08, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>
            <motion.button
              type="button"
              className="cube-nav-btn"
              onClick={next}
              aria-label="Next project"
              whileHover={reduce ? undefined : { scale: 1.08, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {!reduce ? (
            <div className="cube-autoplay-track" aria-hidden="true">
              <motion.span
                key={`${index}-${playing}-${isSpinning}`}
                className="cube-autoplay-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: playing && !isSpinning ? 1 : 0 }}
                transition={{
                  duration: playing && !isSpinning ? AUTOPLAY_MS / 1000 : 0.25,
                  ease: "linear"
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className={`cube-details ${isSpinning ? "is-syncing" : ""}`}>
        <p className="cube-index">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={frontProject.title}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease }}
          >
            <h3>{frontProject.title}</h3>
            <p className="meta">
              <strong>Role:</strong> {frontProject.role}
            </p>
            <p className="meta">
              <strong>Stack:</strong> {frontProject.stack}
            </p>
            <p>{frontProject.description}</p>
            {frontProject.liveUrl ? (
              <div className="project-links">
                <a href={frontProject.liveUrl} target="_blank" rel="noreferrer" className="text-link">
                  {frontProject.secondaryUrl ? "User App" : "Live Project"} <ArrowUpRight size={15} />
                </a>
                {frontProject.secondaryUrl ? (
                  <a href={frontProject.secondaryUrl} target="_blank" rel="noreferrer" className="text-link">
                    Global/Login <ArrowUpRight size={15} />
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="text-link text-link--muted">Private Project (Demo not public)</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="cube-thumbs" role="tablist" aria-label="Choose a project">
          {projects.map((item, itemIndex) => (
            <motion.button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              className={`cube-thumb ${itemIndex === index ? "is-active" : ""}`}
              onClick={() => goTo(itemIndex)}
              whileHover={reduce ? undefined : { scale: 1.02, x: 2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              layout
            >
              <img src={item.image} alt="" />
              <span>{item.title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
