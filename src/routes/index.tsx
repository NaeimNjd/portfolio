import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { NetworkGraph } from "@/components/network-graph";
import {
  HomeSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";
import { useSection, stepSection, SECTIONS } from "@/lib/section-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naeim Najafvand · IT Infrastructure Expert · Berlin" },
      {
        name: "description",
        content:
          "Portfolio von Naeim Najafvand Drikvand — IT-Systemadministrator in Berlin mit 10+ Jahren Erfahrung.",
      },
    ],
  }),
  component: Index,
});

const sectionMap = {
  home: HomeSection,
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  contact: ContactSection,
} as const;

function Index() {
  const active = useSection();
  const Active = sectionMap[active];
  const lockRef = useRef(0);

  useEffect(() => {
    const COOLDOWN = 750;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lockRef.current < COOLDOWN) return;
      if (Math.abs(e.deltaY) < 8) return;
      lockRef.current = now;
      stepSection(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); stepSection(1); }
      else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); stepSection(-1); }
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const now = Date.now();
      if (now - lockRef.current < COOLDOWN) return;
      lockRef.current = now;
      touchY = e.touches[0].clientY;
      stepSection(dy > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const idx = SECTIONS.indexOf(active);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* Right: animated network — stays exactly in place */}
      <div className="pointer-events-auto absolute inset-0">
        <NetworkGraph />
      </div>

      {/* Left: scroll-driven content */}
      <div className="pointer-events-none relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-2xl lg:max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="[&_a]:pointer-events-auto [&_button]:pointer-events-auto"
              >
                <Active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Section indicator on the left edge */}
      <div className="pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {SECTIONS.map((s, i) => (
          <span
            key={s}
            className={`h-6 w-[2px] rounded-full transition-all ${
              i === idx ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
