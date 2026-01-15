import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoaderOverlay from "./loading-overlay";

export default function Loading({ children }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1200); // loader duration
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && <LoaderOverlay key="loader" />}
      </AnimatePresence>

      {/* Your actual app */}
      {children}
    </>
  );
}
