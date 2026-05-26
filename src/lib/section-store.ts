import { useSyncExternalStore } from "react";

export const SECTIONS = ["home", "about", "skills", "experience", "contact"] as const;
export type Section = (typeof SECTIONS)[number];

let current: Section = "home";
const listeners = new Set<() => void>();

export const setSection = (s: Section) => {
  if (s === current) return;
  current = s;
  listeners.forEach((l) => l());
};

export const stepSection = (dir: 1 | -1) => {
  const i = SECTIONS.indexOf(current);
  const next = Math.max(0, Math.min(SECTIONS.length - 1, i + dir));
  setSection(SECTIONS[next]);
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useSection = () => useSyncExternalStore(subscribe, () => current, () => current);
