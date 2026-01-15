// src/pages/index.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "../styles/home.css";
import projects from "./index-data";

gsap.registerPlugin(ScrollTrigger);

// 🩵 ATF Entrance Animation
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] },
  },
};

// 🩵 Project Slider
function pad2(n) {
  return String(n).padStart(2, "0");
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;

export default function Home() {
  const total = projects.length;

  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);

  const counterWrapRef = useRef(null);

  // 🩵 Project Titles
  const titlesShellRef = useRef(null);
  const titleRefs = useRef([]);

  // cached title geometry
  const titleGeomRef = useRef({
    available: 0, // shellH - btnH
    btnH: 26,
    step: 36, // btnH + gap
  });

  const measureTitles = () => {
    const shell = titlesShellRef.current;
    const first = titleRefs.current.find(Boolean);
    if (!shell || !first) return;

    const shellH = shell.getBoundingClientRect().height;
    const btnH = first.getBoundingClientRect().height || 26;

    // MUST match CSS gap below
    const gap = 10;
    const step = btnH + gap;

    const available = Math.max(0, shellH - btnH);
    titleGeomRef.current = { available, btnH, step };
  };

  useLayoutEffect(() => {
    requestAnimationFrame(measureTitles);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const scroller = track?.parentElement; // .projectsCenter
    if (!section || !track || !scroller) return;

    const items = itemRefs.current.filter(Boolean);
    if (!items.length) return;

    // (hot reload / route changes)
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const setup = () => {
      // Slides measurements
      const itemH = items[0].offsetHeight;
      const styles = getComputedStyle(track);
      const rawGap = styles.rowGap || "0";
      const gap = Number.isFinite(parseFloat(rawGap)) ? parseFloat(rawGap) : 0;
      const step = itemH + gap;

      const viewportH = scroller.getBoundingClientRect().height;

      // Center first item at start
      const startY = (viewportH - itemH) / 2;
      const totalTravel = step * (items.length - 1);

      measureTitles();

      // fast setters for titles
      const setY = titleRefs.current.map((el) => (el ? gsap.quickSetter(el, "y", "px") : null));
      const setO = titleRefs.current.map((el) => (el ? gsap.quickSetter(el, "opacity") : null));

      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalTravel}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const travel = totalTravel * self.progress;

          // Move the slides track (images)
          gsap.set(track, { y: startY - travel });

          // Same index driver as images
          const fractionalIndex = step ? travel / step : 0;

          // Active for image emphasis + counter
          const idx = Math.round(fractionalIndex);
          const clampedActive = clamp(idx, 0, items.length - 1);
          setActiveIndex(clampedActive);

          // 🩵 TITLE BEHAVIOR
          const { available, step: titleStep } = titleGeomRef.current;

          // positions for stacks
          const yTop = (i) => i * titleStep;
          const yBottom = (i) => available - (total - 1 - i) * titleStep;

          // overlap tuning:
          const lead = 0.4;
          const dur = 1 + lead; // 1.5 steps

          for (let i = 0; i < total; i++) {
            const el = titleRefs.current[i];
            if (!el || !setY[i]) continue;

            // Each title gets own progress, so multiple titles transitioning at once
            const t = clamp((fractionalIndex - (i - lead)) / dur, 0, 1);

            const y = lerp(yBottom(i), yTop(i), t);
            setY[i](y);

            // Opacity
            if (setO[i]) {
              // peak around t=0.5, never disappears
              const peak = 1 - Math.abs(t - 0.5) * 2; // 0..1
              const opacity = 0.3 + peak * 0.7;       // 0.3..1
              setO[i](opacity);
            }

            el.classList.toggle("isActive", i === clampedActive);
          }


          // 🩵 Counter drift
          if (counterWrapRef.current) {
            gsap.set(counterWrapRef.current, { y: self.progress * 70 });
          }
        },
        onRefresh: () => {
          measureTitles();
        },
      });

      // 🩵 Snap to each item
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalTravel}`,
        snap: {
          snapTo: (value) => {
            const travel = totalTravel * value;
            const idx = Math.round(travel / step);
            return (idx * step) / totalTravel;
          },
          delay: 0.04,
          duration: { min: 0.25, max: 0.6 },
          ease: "easeInOut",
        },
      });

      return () => {
        pin.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    const cleanup = setup();

    const onResize = () => {
      measureTitles();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cleanup?.();
    };
  }, []);

  const jumpToIndex = (i) => {
    const st = ScrollTrigger.getAll().find((t) => t?.vars?.trigger === sectionRef.current);
    if (!st || total <= 1) return;

    const progress = i / (total - 1);
    st.scroll(st.start + (st.end - st.start) * progress);
  };

  return (
    <motion.main>
      {/* ATF */}
      <motion.section className="home-atf">
        <motion.h1 variants={containerVariants} initial="hidden" animate="visible">
          Creative Motion-driven developer<br />
          specializing in interaction, timing,<br />
          & performance-driven websites.
        </motion.h1>
        <div className="home-atf-image"></div>
      </motion.section>

      {/* PROJECTS */}
      <section className="gsapProjects" ref={sectionRef}>
        {/* LEFT: Counter */}
        <div className="projectsLeft">
          <div className="counter" ref={counterWrapRef}>
            <span className="counterBig">{pad2(activeIndex + 1)}</span>
            <span className="counterSmall">/{pad2(total)}</span>
          </div>
        </div>

        {/* CENTER: Projects */}
        <div className="projectsCenter">
          <div className="projectsTrack" ref={trackRef}>
            {projects.map((p, i) => {
              const isActive = i === activeIndex;

              return (
                <article
                  key={p.id}
                  className={`projectItem ${isActive ? "isActive" : ""}`}
                  ref={(el) => (itemRefs.current[i] = el)}
                >
                  <Link to={p.route} className="projectLink" aria-label={p.title}>
                    <div className="projectMediaWrap">
                      <img
                        src={p.media?.[0]?.src}
                        alt={p.media?.[0]?.alt || p.title}
                        className="projectMedia"
                        loading="lazy"
                      />
                    </div>

                    <p className="projectSkills">{p.skills?.join(", ")}</p>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Titles */}
        <div className="projectsRight">
          <nav className="titlesShell" ref={titlesShellRef} aria-label="Projects">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="navItem"
                ref={(el) => (titleRefs.current[i] = el)}
                onClick={() => jumpToIndex(i)}
              >
                {p.title}
              </button>
            ))}
          </nav>
        </div>
      </section>
    </motion.main>
  );
}
