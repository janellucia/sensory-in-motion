import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

const wrap = {
  initial: { opacity: 1 },
  exit: {
    opacity: 1,
    transition: { when: "afterChildren" }
  }
};

const text = {
  initial: { y: 0, opacity: 1 },
  exit: {
    y: 70,
    opacity: 0,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
  }
};

const wipe = {
  initial: { y: 0 },
  exit: {
    y: "110%",
    transition: { when: "afterChildren" }
  }
};

export default function LoaderOverlay() {
  const count = useMotionValue(0);
  const time = useTransform(count, Math.ceil);

  useEffect(() => {
    const animation = animate(count, 100, {
      duration: 2,
      ease: "linear",
    });
    return animation.stop;
  }, []);

  return (
    <motion.div
      className="loader"
      variants={wrap}
      initial="initial"
      animate="initial"
      exit="exit"
    >
      <motion.div className="loader__wipe" variants={wipe} />

      <motion.div className="loader__center">
        <motion.p className="loader__sub" variants={text}>
          Sensory in Motion<br />
          Selected Studies 16'26
        </motion.p>
        <motion.h1 className="loader__title" variants={text}>
          Creative Motion-Driven Developer<br />
          Specializing in Interaction, Timing,<br />
          & Performance-Driven Websites.
        </motion.h1>
        <motion.p className="loader__sub" variants={text}>
          Loading <motion.span>{time}</motion.span> %
        </motion.p>
      </motion.div>

    </motion.div>
  );
}
