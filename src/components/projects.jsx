// src/pages/index.jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "../styles/home.css";
import projects from "./projects-data";

gsap.registerPlugin(ScrollTrigger);

// Project Slider
function pad2(n) {
  return String(n).padStart(2, "0");
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;

export default function Projects() {
  const total = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);

  const counterWrapRef = useRef(null);

  // Project Titles
  const titlesShellRef = useRef(null);
  const titleRefs = useRef([]);

  // cached title geometry
  const titleGeomRef = useRef({
    available: 0,
    btnH: 26,
    step: 36,
  });

  const measureTitles = () => {
    const shell = titlesShellRef.current;
    const first = titleRefs.current.find(Boolean);
    if (!shell || !first) return;

    const shellH = shell.getBoundingClientRect().height;
    const btnH = first.getBoundingClientRect().height || 26;

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
    const scroller = track?.parentElement;
    if (!section || !track || !scroller) return;

    const items = itemRefs.current.filter(Boolean);
    if (!items.length) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const setup = () => {
      const itemH = items[0].offsetHeight;
      const styles = getComputedStyle(track);
      const rawGap = styles.rowGap || "0";
      const gap = Number.isFinite(parseFloat(rawGap)) ? parseFloat(rawGap) : 0;
      const step = itemH + gap;

      const viewportH = scroller.getBoundingClientRect().height;

      const startY = (viewportH - itemH) / 2.5;
      const totalTravel = step * (items.length - 0.8);

      measureTitles();

      const setY = titleRefs.current.map((el) =>
        el ? gsap.quickSetter(el, "y", "px") : null
      );
      const setO = titleRefs.current.map((el) =>
        el ? gsap.quickSetter(el, "opacity") : null
      );

      const setCounterY = counterWrapRef.current
        ? gsap.quickSetter(counterWrapRef.current, "y", "px")
        : null;

      let counterOffset = itemH / 2 + 80;

      gsap.set(track, { y: startY });
      if (setCounterY) setCounterY(-counterOffset);

      function initTitles() {
        const titleIndex = 0;
        const clampedActive = 0;

        const { available, step: titleStep } = titleGeomRef.current;
        const yTop = (i) => i * titleStep;
        const yBottom = (i) => available - (total - 1 - i) * titleStep;

        const lead = 0.4;
        const dur = 1 + lead;

        for (let i = 0; i < total; i++) {
          const el = titleRefs.current[i];
          if (!el || !setY[i]) continue;

          const t = clamp((titleIndex - (i - lead)) / dur, 0, 1);
          setY[i](lerp(yBottom(i), yTop(i), t));

          if (setO[i]) {
            const peak = 1 - Math.abs(t - 0.5) * 2;
            setO[i](0.3 + peak * 0.7);
          }

          el.classList.toggle("isActive", i === clampedActive);
        }
      }

      initTitles();

      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalTravel}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const travel = totalTravel * self.progress;

          gsap.set(track, { y: startY - travel });

          const fractionalIndex = step ? travel / step : 0;
          const idx = Math.round(fractionalIndex);
          const clampedActive = clamp(idx, 0, items.length - 1);
          setActiveIndex(clampedActive);

          const titleIndex = self.progress * total;

          const { available, step: titleStep } = titleGeomRef.current;
          const yTop = (i) => i * titleStep;
          const yBottom = (i) => available - (total - 1 - i) * titleStep;

          const lead = 0.4;
          const dur = 1 + lead;

          for (let i = 0; i < total; i++) {
            const el = titleRefs.current[i];
            if (!el || !setY[i]) continue;

            const t = clamp((titleIndex - (i - lead)) / dur, 0, 1);
            setY[i](lerp(yBottom(i), yTop(i), t));

            if (setO[i]) {
              const peak = 1 - Math.abs(t - 0.5) * 2;
              setO[i](0.3 + peak * 0.7);
            }

            el.classList.toggle("isActive", i === clampedActive);
          }

          if (setCounterY) {
            const p = gsap.parseEase("power2.inOut")(self.progress);
            setCounterY(lerp(-counterOffset, counterOffset, p));
          }
        },
      });

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

    return () => {
      cleanup?.();
    };
  }, [total]);

  const jumpToIndex = (i) => {
    const st = ScrollTrigger.getAll().find(
      (t) => t?.vars?.trigger === sectionRef.current
    );
    if (!st || total <= 1) return;

    const progress = i / (total - 1);
    st.scroll(st.start + (st.end - st.start) * progress);
  };

  return (
    <motion.main>

      <section className="gsapProjects" ref={sectionRef}>
        <div className="projectsLeft">
          <div className="counter" ref={counterWrapRef}>
            <span className="counterBig">{pad2(activeIndex + 1)}</span>
            <span className="counterSmall">/{pad2(total)}</span>
          </div>
        </div>

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
                  <Link to={p.route} className="projectLink">
                    <div className="projectMediaWrap">
                      <img
                        src={p.media?.[0]?.src}
                        alt={p.media?.[0]?.alt || p.title}
                        className="projectMedia"
                      />
                    </div>
                    <p className="projectSkills">
                      {p.skills?.join(", ")}
                    </p>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div className="projectsRight">
          <nav className="titlesShell" ref={titlesShellRef}>
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