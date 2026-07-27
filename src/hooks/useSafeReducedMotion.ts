"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SSR-safe wrapper around framer-motion's useReducedMotion.
 * Returns false on the server and during the first client render so
 * markup matches; the real preference applies after mount.
 */
export function useSafeReducedMotion() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? !!prefersReduced : false;
}
