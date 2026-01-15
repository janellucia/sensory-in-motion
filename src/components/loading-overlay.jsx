import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const overlay = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: {
    opacity: 1,
    transition: { when: "afterChildren" },
  },
};

const center = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.10,
      staggerDirection: -1,
    },
  },
};

const line = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const wipe = {
  initial: { y: "110%" },
  animate: { y: "110%" },
  exit: {
    y: 0,
    transition: { duration: 0.85, ease: [0.2, 0.8, 0.2, 1], when: "afterChildren" },
  },
};

export default function LoaderOverlay() {
  const count = useMotionValue(0);
  const time = useTransform(count, Math.ceil);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.2,
      ease: "linear",
    });
    return () => controls.stop();
  }, []);

  return (
    <motion.div
      className="loader"
      variants={overlay}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
      }}
    >
      {/* Wipe sits above or below depending on your CSS.
          It animates in ONLY on exit, after text is gone. */}
      <motion.div className="loader__wipe" variants={wipe} />

      <motion.div className="loader__center" variants={center}>
        <motion.p className="loader__sub" variants={line}>
          Sensory in Motion<br />
          Selected Studies 16&apos;26
        </motion.p>

        <motion.h1 className="loader__title" variants={line}>
          Creative Motion-Driven Developer<br className="desktop" />
          Specializing in Interaction, Timing,<br className="desktop" />
          & Performance-Driven Websites.
        </motion.h1>

        <motion.p className="loader__sub" variants={line}>
          Loading <motion.span>{time}</motion.span> %
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
