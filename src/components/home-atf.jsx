// src/components/home-atf.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import atfImg from "../assets/home/6.jpg";

const textVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function HomeATF() {
  return (
    <section className="homeATF" aria-label="Intro">
      {/* dividers */}
      <div className="homeATF__vline" aria-hidden="true" />
      <div className="homeATF__hline" aria-hidden="true" />

      {/* top-right text region */}
      <div className="homeATF__text">
        <motion.h1
          className="homeATF__copy"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Sensory in Motion is a motion-driven front-end practice, a one-stop
          space from prototype to execution. I design and build interaction-led
          websites where timing feels intentional, transitions stay seamless,
          and performance is never an afterthought—so brands can be more
          confident, more expressive, and stand apart without shouting.
        </motion.h1>
      </div>

      {/* link aligned to divider */}
      <div className="homeATF__meta">
        <Link className="homeATF__about" to="/about">
          Get in touch
        </Link>
      </div>

      {/* bottom-left image zone */}
      <div className="homeATF__imageZone">
        <img className="homeATF__img" src={atfImg} alt="" />
      </div>
    </section>
  );
}
