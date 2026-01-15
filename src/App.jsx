import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";

import Layout from "./components/layout";
import Loading from "./components/loading";

import Home from "./pages/index";
import About from "./pages/about";

function App() {
  // Loading state (✅ hooks must always run in the same order)
  const [loading, setLoading] = useState(true);

  // Cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const CURSOR_SIZE = 22;

  // Loading timer
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Track mouse
  useEffect(() => {
    const onMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Bulletproof hover detection (event delegation)
  useEffect(() => {
    const isHoverTarget = (el) => {
      if (!el || typeof el.closest !== "function") return false;
      return !!el.closest("a, button, [role='button'], [data-cursor='hover']");
    };

    const onOver = (e) => {
      setCursorVariant(isHoverTarget(e.target) ? "hover" : "default");
    };

    const onOut = (e) => {
      if (!isHoverTarget(e.relatedTarget)) setCursorVariant("default");
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
    };
  }, []);

  // Motion variants (position + scale only)
  const variants = useMemo(() => {
    const offset = CURSOR_SIZE / 2;
    return {
      default: {
        x: mousePosition.x - offset,
        y: mousePosition.y - offset,
        scale: 1,
        transition: { type: "spring", stiffness: 1100, damping: 60, mass: 0.16 },
      },
      hover: {
        x: mousePosition.x - offset,
        y: mousePosition.y - offset,
        scale: 2.6,
        transition: { type: "spring", stiffness: 420, damping: 30, mass: 0.45 },
      },
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Custom Cursor */}
          <motion.div
            className={`cursor desktop ${cursorVariant === "hover" ? "is-hover" : ""}`}
            variants={variants}
            animate={cursorVariant}
            initial={false}
            aria-hidden="true"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 99999,
              pointerEvents: "none",
              willChange: "transform",
            }}
          />


          <ReactLenis
            root
            options={{
              prevent: (node) => {
                if (!node) return false;
                let el = node;
                while (el) {
                  if (el.getAttribute && el.getAttribute("data-lenis-prevent") !== null) return true;
                  el = el.parentNode;
                }
                return false;
              },
            }}
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </ReactLenis>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
