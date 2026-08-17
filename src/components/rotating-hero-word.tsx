"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type RotatingHeroWordProps = {
  words: string[];
  intervalMs?: number;
  transitionMs?: number;
};

export function RotatingHeroWord({ words, intervalMs = 3200, transitionMs = 450 }: RotatingHeroWordProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const transitionRef = useRef<number | null>(null);
  const longestWordLength = Math.max(...words.map((word) => word.length + 1));

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    if (transitionRef.current !== null) window.clearTimeout(transitionRef.current);
    intervalRef.current = null;
    transitionRef.current = null;
  }, []);

  const advance = useCallback(() => {
    setActiveIndex((currentIndex) => {
      setLeavingIndex(currentIndex);
      return (currentIndex + 1) % words.length;
    });
    if (transitionRef.current !== null) window.clearTimeout(transitionRef.current);
    transitionRef.current = window.setTimeout(() => setLeavingIndex(null), transitionMs);
  }, [transitionMs, words.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;

    const startRotation = () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      if (!document.hidden) intervalRef.current = window.setInterval(advance, intervalMs);
    };

    startRotation();
    document.addEventListener("visibilitychange", startRotation);
    return () => {
      document.removeEventListener("visibilitychange", startRotation);
      clearTimers();
    };
  }, [advance, clearTimers, intervalMs, reducedMotion, words.length]);

  return <span
    className="rotating-hero-word"
    data-active-word={words[activeIndex]}
    data-rotating-hero-word
    style={{ "--rotating-word-width": `${longestWordLength}ch`, "--rotating-word-transition": `${transitionMs}ms` } as CSSProperties}
  >
    {words.map((word, index) => <span className={index === activeIndex ? "is-active" : index === leavingIndex ? "is-leaving" : ""} key={word}>{word}.</span>)}
  </span>;
}
