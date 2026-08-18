"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function TypeWriter({
  text,
  speed = 26,
  delay = 0,
  className = "",
  onComplete,
  showCursor = true
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);
  const [done, setDone] = useState(Boolean(reduce));
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      setDone(true);
      onCompleteRef.current?.();
      return;
    }

    setCount(0);
    setDone(false);

    let timer;
    let index = 0;

    const tick = () => {
      index += 1;
      setCount(index);

      if (index >= text.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }

      timer = window.setTimeout(tick, speed);
    };

    const start = window.setTimeout(tick, delay);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, [text, speed, delay, reduce]);

  const visible = text.slice(0, count);

  return (
    <span className={`typewriter ${className}`}>
      <span className="typewriter-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="typewriter-line">
        <span className="typewriter-text">{visible}</span>
        {showCursor ? (
          <motion.span
            className="type-cursor"
            aria-hidden="true"
            animate={done ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
            transition={
              done
                ? { duration: 0.3 }
                : { duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.51, 1] }
            }
          />
        ) : null}
      </span>
    </span>
  );
}
