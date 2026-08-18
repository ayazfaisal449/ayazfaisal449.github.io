// Professional easing curves
export const ease = [0.22, 1, 0.36, 1]; // easeOutExpo
export const spring = { type: "spring", stiffness: 100, damping: 15 };
export const smoothSpring = { type: "spring", stiffness: 80, damping: 20 };

// Enhanced fade animations
export const fadeUp = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease }
  }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease }
  }
};

// Stagger configurations — parent stays visible so tall sections never get stuck at opacity 0
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

export const fastStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

// "some" = trigger as soon as any part of the section is on screen
export const viewport = { once: true, amount: "some", margin: "0px 0px -40px 0px" };
