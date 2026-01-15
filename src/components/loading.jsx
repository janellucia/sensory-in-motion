import { AnimatePresence } from "framer-motion";
import LoaderOverlay from "./loading-overlay";

export default function Loading({ isLoading, children }) {
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoaderOverlay key="loader" />}
      </AnimatePresence>

      {/* App is ALWAYS rendered underneath (no blank gap) */}
      {children}
    </>
  );
}
