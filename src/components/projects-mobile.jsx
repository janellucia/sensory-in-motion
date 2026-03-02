// src/pages/projects-mobile.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/home-mobile.css";
import projects from "./projects-data";

function pad2(n) {
  return String(n).padStart(2, "0");
}

export default function ProjectsMobile() {
  const total = projects.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef([]);

  // stable list of elements (for observer)
  const items = useMemo(() => projects, []);

  useEffect(() => {
    const els = itemRefs.current.filter(Boolean);
    if (!els.length) return;

    // Pick the "active" card when it's near the center/top band of viewport
    const obs = new IntersectionObserver(
      (entries) => {
        // choose the entry with the highest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (!visible) return;

        const idx = Number(visible.target.getAttribute("data-index"));
        if (Number.isFinite(idx)) setActiveIndex(idx);
      },
      {
        root: null,
        // This makes "active" change when a card moves into the middle band
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="projectsMobile" aria-label="Projects">
      {/* Sticky counter bar */}
      <div className="projectsMobileCounterBar">
        <div className="projectsMobileCounter">
          <span className="projectsMobileCounterBig">{pad2(activeIndex + 1)}</span>
          <span className="projectsMobileCounterSmall">/{pad2(total)}</span>
        </div>
      </div>

      {/* List */}
      <div className="projectsMobileList">
        {items.map((p, i) => (
          <article
            key={p.id}
            className="projectsMobileItem"
            ref={(el) => (itemRefs.current[i] = el)}
            data-index={i}
          >
            <Link to={p.route} className="projectsMobileLink" aria-label={p.title}>
              {/* 100% width image */}
              <div className="projectsMobileMediaWrap">
                <img
                  src={p.media?.[0]?.src}
                  alt={p.media?.[0]?.alt || p.title}
                  className="projectsMobileMedia"
                  loading="lazy"
                />
              </div>

              {/* Meta row: title left, skills bottom-right */}
              <div className="projectsMobileMeta">
                <h3 className="projectsMobileTitle">{p.title}</h3>
                <p className="projectsMobileSkills">{p.skills?.join(", ")}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}